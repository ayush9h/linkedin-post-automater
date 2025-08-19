from autogen_agentchat.agents import AssistantAgent
from config.development import model_client

post_summary_agent = AssistantAgent(
    name="PostSummaryAgent",
    system_message="""
    You are a sentiment analysis expert specializing in interpreting social media comments.
    Analyze LinkedIn comments for sentiments (positive, negative, neutral) and assess the mood.
    Provide a sentiment breakdown with the ratio of positive to negative comments.
    """,
    model_client=model_client,
)
