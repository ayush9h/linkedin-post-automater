from typing import Sequence

from autogen_agentchat.agents import BaseChatAgent
from autogen_agentchat.base import Response
from autogen_agentchat.messages import BaseChatMessage, TextMessage
from autogen_core import CancellationToken
from autogen_core.models import UserMessage
from config.development import TAVILY_KEY
from tavily import TavilyClient


class WebSearchAgent(BaseChatAgent):
    def __init__(self, name: str):
        super().__init__(
            name,
            "Content generation agent for Linkedin Posts",
        )

    @property
    def produced_message_types(self) -> Sequence[type[BaseChatMessage]]:
        return (TextMessage,)

    async def on_messages(
        self,
        messages: Sequence[BaseChatMessage],
        cancellation_token: CancellationToken,
    ) -> Response:

        prompt = messages[-1].content  # type: ignore
        client = TavilyClient(api_key=TAVILY_KEY)

        response = client.search(
            query=prompt,
            search_depth="basic",
            topic="general",
            max_results=3,
        )
        web_content = "\n".join(item["content"] for item in response["results"])

        response = TextMessage(content=web_content, source=self.name)
        return Response(chat_message=response)

    async def on_reset(self, cancellation_token: CancellationToken) -> None:
        pass
