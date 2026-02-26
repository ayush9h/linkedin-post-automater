import json
from datetime import datetime, timezone

import dramatiq
import redis
from config.development import REDIS_URL
from cron import cron
from dramatiq.brokers.redis import RedisBroker
from services.post_linkedin import post_to_linkedin

r = redis.Redis.from_url(url=str(REDIS_URL))


redis_broker = RedisBroker(
    url=REDIS_URL,
)
dramatiq.set_broker(redis_broker)


@dramatiq.actor()
def publish_linkedin_post(
    content: str,
    access_token: str,
    user_urn: str,
):
    """
    Publishes post to Linkedin

    Args:
        content (str): String content of the post.
        access_token (Str): Access token for upload to linkedin
        user_urn (str): Author of the post

    Returns:
        Response: Status of the linkedin post.
    """

    try:
        response = post_to_linkedin(
            content=content,
            user_urn=user_urn,
            access_token=access_token,
            image_bytes=None,
        )
        return {
            "data": "Linkedin post successful",
            "status": "success",
        }
    except Exception as e:
        return {
            "data": f"Error occurred due to {e}",
            "status": "failed",
        }


@cron("* * * * *")
@dramatiq.actor
def check_scheduled_posts():
    """
    Cron function
    - runs every minute to check the jobs scheduled for the current time
    - sends the  data to the publish_linkedin_post actor

    Args:
     - None
    """

    now = int(datetime.now(timezone.utc).timestamp())

    due_posts = r.zrangebyscore("linkedin_scheduled_posts", 0, now)

    for post in due_posts:  # type: ignore
        data: dict = json.loads(post)

        publish_linkedin_post.send(
            data["content"],
            data["access_token"],
            data["user_urn"],
        )

        r.zrem("linkedin_scheduled_posts", post)
