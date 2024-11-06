from linkedin_api import Linkedin
from autogen import AssistantAgent
from config import development

llm_config = {
    "model": "gemma-7b-it",
    "api_key": development.GROQ_API_KEY,
    "api_type": "groq"
}

api = Linkedin(development.EMAIL, development.PASSWORD)


def get_comments(post_url):
    post_comments = api.get_post_comments(
        post_url, comment_count=10)

    comments = [comment['comment']['values'][0]['value']
                for comment in post_comments if 'comment' in comment]

    return comments


post_summary_agent = AssistantAgent(
    name="Post Summary Agent",
    system_message='''
    You are a sentiment analysis expert, specializing in interpreting social media comments. You will receive a list of comments from a LinkedIn post. Your task is to thoroughly analyze these comments, detecting sentiments (positive, negative, neutral). You should assess the overall mood of the conversation and provide a sentiment breakdown, highlighting the ratio of positive to negative comments. 
    ''',
    llm_config=llm_config,
)


def post_summary(post_url):

    comments = get_comments(post_url)

    support_request = {
        "role": "user",
        "content": "\n".join(comments),
    }

    reply = post_summary_agent.generate_reply(messages=[support_request])

    return reply
