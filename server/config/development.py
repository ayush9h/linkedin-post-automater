import os

import dotenv

dotenv.load_dotenv('./.env')


GROQ_API_KEY = os.getenv('GROQ_API_KEY')
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
REDIS_URL = os.getenv("REDIS_URL")
PORT = os.getenv("PORT")
LINKEDIN_API_URL = "https://api.linkedin.com/v2"
ORIGINS = os.getenv("ORIGINS")
