from PIL import Image, UnidentifiedImageError
import io
import requests
from autogen import AssistantAgent, ConversableAgent
from config import development

headers = {
    "Authorization": f"Bearer {development.HUGGINGFACE_API_KEY}"
}

llm_config = {
    "model": "gemma-7b-it",
    "api_key": development.GROQ_API_KEY,
    "api_type": "groq"
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


'''
Critic Agent
'''
critic_agent = ConversableAgent(
    name="Critic Agent",
    llm_config=llm_config,
    system_message=CRITIC_SYSTEM_MESSAGE,
    max_consecutive_auto_reply=2,
    human_input_mode="NEVER",
    is_termination_msg=lambda msg: _is_termination_message(msg),
)


# Prompt Improver Agent
prompt_improver_agent = AssistantAgent(
    name="Prompt Improver Agent",
    system_message='''
    You are a professional assistant specialized in generating prompts for image creation, not giving suggestions. 
    Your task is to directly generate detailed, descriptive prompts for image generation based on the user's input. 
    Ensure that the prompts include vivid descriptions, context, and any necessary visual details to guide the creation of high-quality images. Give only one option, no multiple options.
    Avoid offering advice or feedback—just provide the final, ready-to-use image prompts.
    ''',
    llm_config=llm_config,
    max_consecutive_auto_reply=1,
    human_input_mode="NEVER"
)


def query(payload):
    response = requests.post(
        development.HUGGINGFACE_API_URL,
        headers=headers,
        json=payload
    )
    if response.status_code != 200:
        raise Exception(
            f"Request failed: {response.status_code}, {response.text}"
        )
    return response.content


def generate_image(user_input):

    support_request_first = {
        "content": user_input,
        "role": "user",
    }

    updated_query = prompt_improver_agent.generate_reply(
        messages=[support_request_first])

    final_prompt = updated_query['content']

    print(final_prompt)

    support_request_second = {
        "content": final_prompt,
        "role": "user",
    }

    updated_query_second = critic_agent.generate_reply(
        messages=[support_request_second])

    final_prompt_second = updated_query_second['content']

    print(final_prompt_second)

    image_bytes = query({
        "inputs": str(final_prompt_second),
    })

    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.save("generated_image.png")
    except UnidentifiedImageError:
        print("The response is not a valid image. Here's the content of the response:")
        print(image_bytes.decode("utf-8"))
