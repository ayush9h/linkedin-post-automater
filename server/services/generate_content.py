from agents.content_generation_agent import content_generation_agent
from agents.critic_agent import critic_agent
from autogen_agentchat.conditions import MaxMessageTermination
from autogen_agentchat.teams import RoundRobinGroupChat

max_msg_termination = MaxMessageTermination(max_messages=3)

async def generate_content(user_input: str):
    team = RoundRobinGroupChat(
        [content_generation_agent, critic_agent],
        termination_condition=max_msg_termination,
    )
    result = await team.run(task=user_input)
    return result
