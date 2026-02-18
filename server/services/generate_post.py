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


builder = DiGraphBuilder()

builder.add_node(prompt_improvisation_agent)
builder.add_node(web_search_agent)
builder.add_node(content_generation_agent)

builder.set_entry_point(prompt_improvisation_agent)

builder.add_edge(
    prompt_improvisation_agent,
    web_search_agent,
    condition=lambda msg: "web_search:true" in msg.to_model_text().lower(),
)

builder.add_edge(
    prompt_improvisation_agent,
    content_generation_agent,
    condition=lambda msg: "web_search:true" not in msg.to_model_text().lower(),
)

builder.add_edge(
    web_search_agent,
    content_generation_agent,
    condition=lambda msg: "web_search:done" in msg.to_model_text().lower(),
    activation_group="final",
    activation_condition="any",
)

graph = builder.build()

flow = GraphFlow(
    participants=builder.get_participants(),
    graph=graph,
)
