from typing import Sequence

from autogen_agentchat.agents import BaseChatAgent
from autogen_agentchat.base import Response
from autogen_agentchat.messages import BaseChatMessage, TextMessage
from autogen_core import CancellationToken
from config.development import TAVILY_KEY
from tavily import TavilyClient


class WebSearchAgent(BaseChatAgent):
    def __init__(self, name: str):
        super().__init__(
            name,
            "Tavily Search Agent for external topics",
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
            max_results=2,
            include_raw_content=True,
        )

        web_content = "\n".join(item["content"] for item in response["results"])

        final_prompt = f"""
        {prompt}
        
        --- WEB SEARCH RESULTS ---
        {web_content}
        """
        return Response(
            chat_message=TextMessage(
                content=final_prompt + "web_search:done",
                source=self.name,
            )
        )

    async def on_reset(self, cancellation_token: CancellationToken) -> None:
        pass
