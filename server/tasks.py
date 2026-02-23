import json
from datetime import datetime, timezone

import dramatiq
import redis
from config.development import REDIS_URL
from cron import cron
from dramatiq.brokers.redis import RedisBroker

r = redis.Redis.from_url(url=str(REDIS_URL))


redis_broker = RedisBroker(
    url=REDIS_URL,
)
dramatiq.set_broker(redis_broker)


@dramatiq.actor()
def publish_linkedin_post(content, access_token):
    print(f"Posting to LinkedIn: {content}")


@cron("* * * * *")
@dramatiq.actor
def check_scheduled_posts():
    now = int(datetime.now(timezone.utc).timestamp())
    print("Checking scheduled posts at:", now)

    due_posts = r.zrangebyscore("linkedin_scheduled_posts", 0, now)

    for post in due_posts:  # type: ignore
        data = json.loads(post)

        publish_linkedin_post.send(
            data["content"],
            data["access_token"],
        )

        r.zrem("linkedin_scheduled_posts", post)
