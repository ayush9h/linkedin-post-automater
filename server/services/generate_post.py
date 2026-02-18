from agents import *
from autogen_agentchat.messages import BaseChatMessage
from autogen_agentchat.teams import DiGraphBuilder, GraphFlow
from config.model import model_client

content_generation_agent = ContentGenerationAgent(
    name="ContentGenerationAgent",
    model_client=model_client,
)

web_search_agent = WebSearchAgent(name="WebSearchAgent")

prompt_improvisation_agent = PromptImprovisationAgent(
    name="PromptImprovisationAgent",
    model_client=model_client,
)


def wants_web_search(msg: BaseChatMessage) -> bool:
    """
    Checks whether the current request has web_search enabled or not

    :param msg: Current user message
    :type msg: BaseChatMessage
    :return: True if web_search enabled else false
    :rtype: bool
    """
    content = msg.content.lower()  # type: ignore
    return "web_search:true" in content


# ==================== Graphflow =============================
builder: DiGraphBuilder = DiGraphBuilder()
builder.add_node(content_generation_agent).add_node(
    prompt_improvisation_agent
).add_node(web_search_agent)

builder.add_edge(
    prompt_improvisation_agent,
    web_search_agent,
    condition=wants_web_search,
)

builder.add_edge(prompt_improvisation_agent, content_generation_agent)
builder.add_edge(web_search_agent, content_generation_agent)

graph = builder.build()
flow: GraphFlow = GraphFlow(
    [content_generation_agent, prompt_improvisation_agent],
    graph=graph,
)
