import io
import logging

import requests
from agents.prompt_improver_agent import prompt_improver_agent
from autogen_agentchat.messages import TextMessage
from autogen_core import CancellationToken
from config.development import HUGGINGFACE_API_URL, headers
from PIL import Image, UnidentifiedImageError


def query(payload):
    response = requests.post(HUGGINGFACE_API_URL, headers=headers, json=payload)
    if response.status_code != 200:
        raise Exception(f"Request failed: {response.status_code}, {response.text}")
    return response.content


async def generate_image(user_input):

    result = await prompt_improver_agent.on_messages(
        [TextMessage(content=user_input, source="user")],
        cancellation_token=CancellationToken(),
    )

    image_bytes = query({"inputs": str(result.chat_message.content)})

    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.save("generated_image.png")
        logging.info("Generated image saved.")
    except UnidentifiedImageError:
        logging.exception(
            "The response is not a valid image. Here's the content of the response:"
        )
        logging.info(image_bytes.decode("utf-8"))
