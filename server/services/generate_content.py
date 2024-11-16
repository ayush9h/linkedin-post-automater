from autogen import AssistantAgent, ConversableAgent, initiate_chats
from config import development


llm_config = {
    "model": "gemma-7b-it",
    "api_key": development.GROQ_API_KEY,
    "api_type": "groq",
}


CRITIC_SYSTEM_MESSAGE = """You need to improve the post content you saw.
How to create content that is better in terms of clarity, engagement, and professionalism.
Reply with the following format:

CRITICS: the content needs to improve...
PROMPT: here is the updated content!

If you have no critique or a prompt, just say TERMINATE
"""


def _is_termination_message(msg):
    if isinstance(msg.get("content"), str):
        return msg["content"].rstrip().endswith("TERMINATE")
    elif isinstance(msg.get("content"), list):
        for content in msg["content"]:
            if isinstance(content, dict) and "text" in content:
                return content["text"].rstrip().endswith("TERMINATE")
    return False


"""
Critic Agent
"""
critic_agent = ConversableAgent(
    name="Critic Agent",
    llm_config=llm_config,
    system_message=CRITIC_SYSTEM_MESSAGE,
    max_consecutive_auto_reply=2,
    human_input_mode="NEVER",
    is_termination_msg=lambda msg: _is_termination_message(msg),
)


"""
Content Generation Agent
"""
content_generation_assistant = AssistantAgent(
    name="LinkedIn Content Agent",
    system_message="""You are a professional assistant specialized in writing LinkedIn posts, NOT giving suggestions. 
    Your task is to directly generate the LinkedIn post content based on the user's input. 
    Ensure the posts are well-written, concise, engaging, and tailored to a professional audience. 
    Avoid offering advice or suggestions. Just provide the actual post content ready for the user to publish.""",
    llm_config=llm_config,
    max_consecutive_auto_reply=2,
    human_input_mode="NEVER",
)


def generate_content(user_input):
    support_request = {
        "content": user_input,
        "role": "user",
    }

    chats = [
        {
            "sender": content_generation_assistant,
            "recipient": critic_agent,
            "message": support_request["content"],
            "max_turns": 2,
            "clear_history": True,
        }
    ]

    chat_results = initiate_chats(chats)
    return chat_results
