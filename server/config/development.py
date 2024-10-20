import os
import dotenv

dotenv.load_dotenv('./.env')

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
PERSON_URN_KEY = os.getenv('PERSON_URN_KEY')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')
EMAIL = os.getenv('EMAIL')
PASSWORD = os.getenv('PASSWORD')

HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"

headers = {
    "Authorization": f"Bearer{ACCESS_TOKEN}",
    "Content-Type": "application/json"
}
