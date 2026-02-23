import json
import uuid
from datetime import timezone

import redis
from config.development import REDIS_URL
from fastapi import APIRouter
from schemas.schedule import ScheduleRequest

r = redis.Redis.from_url(url=str(REDIS_URL))


router = APIRouter()


def put_post_in_redis(content, access_token, schedule_times):
    for scheduled_time in schedule_times:

        if scheduled_time.tzinfo is None:
            scheduled_time = scheduled_time.replace(tzinfo=timezone.utc)

        timestamp = int(scheduled_time.timestamp())

        payload = json.dumps(
            {
                "id": str(uuid.uuid4()),
                "content": content,
                "access_token": access_token,
                "scheduled_time": scheduled_time.isoformat(),
            }
        )

        r.zadd("linkedin_scheduled_posts", {payload: timestamp})


@router.post("/post-linkedin", status_code=200)
async def schedule_post(request: ScheduleRequest):
    try:
        put_post_in_redis(request.content, request.access_token, request.schedule_times)
        return {
            "message": "Your post has been scheduled successfully",
            "status": "success",
        }

    except Exception as e:
        return {
            "message": f"Error occurred due to {e}",
            "status": "failed",
        }
