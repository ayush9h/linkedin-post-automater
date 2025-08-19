from autogen_agentchat.agents import AssistantAgent
from config.development import model_client

content_generation_agent = AssistantAgent(
    name="LinkedInContentAgent",
    system_message="""You are linkedin post generator, which crafts posts for the user based on the content. You do not give suggestions, you just generate posts which can be directly copied and posted to LinkedIn. 
    Give around 50 words of content only.
    """,
    model_client=model_client,
)
