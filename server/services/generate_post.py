from agents import *
from autogen_agentchat.teams import DiGraphBuilder, GraphFlow
from config.model import model_client

content_generation_agent = ContentGenerationAgent(
    name="ContentGenerationAgent",
    model_client=model_client,
)

prompt_improvisation_agent = PromptImprovisationAgent(
    name="PromptImprovisationAgent",
    model_client=model_client,
)

builder: DiGraphBuilder = DiGraphBuilder()
builder.add_node(content_generation_agent).add_node(prompt_improvisation_agent)
builder.add_edge(prompt_improvisation_agent, content_generation_agent)

graph = builder.build()
flow: GraphFlow = GraphFlow(
    [content_generation_agent, prompt_improvisation_agent],
    graph=graph,
)
