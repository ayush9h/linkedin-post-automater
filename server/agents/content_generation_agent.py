from typing import Sequence

from autogen_agentchat.agents import BaseChatAgent
from autogen_agentchat.base import Response
from autogen_agentchat.messages import BaseChatMessage, TextMessage
from autogen_core import CancellationToken
from autogen_core.models import SystemMessage, UserMessage
from autogen_ext.models.openai import OpenAIChatCompletionClient
from config.model import model_client
from prompts.content_sys_message import CONTENT_GENERATOR_MESSAGE


class ContentGenerationAgent(BaseChatAgent):
    def __init__(self, name: str, model_client: OpenAIChatCompletionClient):
        super().__init__(
            name,
            "Content generation agent for Linkedin Posts",
        )
        self.model_client = model_client

    @property
    def produced_message_types(self) -> Sequence[type[BaseChatMessage]]:
        return (TextMessage,)

    async def on_messages(
        self,
        messages: Sequence[BaseChatMessage],
        cancellation_token: CancellationToken,
    ) -> Response:

        prompt = messages[-1].content  # type: ignore

        result = await self.model_client.create(
            messages=[
                SystemMessage(content=CONTENT_GENERATOR_MESSAGE),
                UserMessage(content=prompt, source="user"),
            ]
        )
        text: str = str(result.content)

        response = TextMessage(content=text, source=self.name)
        return Response(chat_message=response)

    async def on_reset(self, cancellation_token: CancellationToken) -> None:
        pass


async def exec_content_generation_agent(prompt: str):
    agent = ContentGenerationAgent(
        "ContentGenerator",
        model_client,
    )

    user_msg = TextMessage(
        content=prompt,
        source="user",
    )

    response = await agent.on_messages(
        [user_msg],
        CancellationToken(),
    )
    return response.chat_message.content  # type:ignore
