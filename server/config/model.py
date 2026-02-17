from autogen_core.models import ModelFamily, ModelInfo
from autogen_ext.models.openai import OpenAIChatCompletionClient
from config.development import GROQ_API_KEY

model_client: OpenAIChatCompletionClient = OpenAIChatCompletionClient(
    model="openai/gpt-oss-20b",
    base_url="https://api.groq.com/openai/v1",
    api_key=GROQ_API_KEY,  # type: ignore
    model_info=ModelInfo(
        family=ModelFamily.UNKNOWN,
        vision=False,
        function_calling=True,
        json_output=False,
        structured_output=True,
    ),  # type: ignore
)
