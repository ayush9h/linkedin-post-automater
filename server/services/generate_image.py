import io

import google.generativeai as genai
from agents.prompt_improver_agent import prompt_improver_agent
from autogen_agentchat.messages import TextMessage
from autogen_core import CancellationToken
from config.development import GEMINI_API_KEY
from PIL import Image

genai.configure(api_key=GEMINI_API_KEY)


async def generate_image(user_input: str) -> bytes:
    result = await prompt_improver_agent.on_messages(
        [TextMessage(content=user_input, source="user")],
        cancellation_token=CancellationToken(),
    )

    improved_prompt = str(result.chat_message.content)
    model = genai.GenerativeModel("gemini-2.5-flash-image-preview")

    response = model.generate_content(
        improved_prompt,
        generation_config={"response_modalities": ["IMAGE"]},
    )

    for candidate in response.candidates:
        for part in candidate.content.parts:
            if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                image_bytes = part.inline_data.data
                try:
                    Image.open(io.BytesIO(image_bytes))
                except Exception as e:
                    raise ValueError("Gemini returned invalid image data")
                return image_bytes
