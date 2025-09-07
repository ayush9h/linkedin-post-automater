import os

import dotenv
from autogen_core.models import ModelFamily
from autogen_ext.models.openai import OpenAIChatCompletionClient

dotenv.load_dotenv('./.env')


GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = os.getenv("REDIS_URL")
PORT = os.getenv("PORT")
LINKEDIN_API_URL = "https://api.linkedin.com/v2"


model_client = OpenAIChatCompletionClient(
    model="openai/gpt-oss-20b",
    base_url="https://api.groq.com/openai/v1",
    api_key=GROQ_API_KEY,
    model_info={
        "vision": False,
        "function_calling": False,
        "json_output": False,
        "family": ModelFamily.is_openai,
    },
)
