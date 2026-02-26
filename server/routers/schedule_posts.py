import json
import uuid
from datetime import datetime, timezone

import redis
import requests
from config.development import REDIS_URL
from fastapi import APIRouter
from schemas.schedule import ScheduleRequest

r = redis.Redis.from_url(url=str(REDIS_URL))


router = APIRouter()


def put_post_in_redis(
    content: str,
    access_token: str,
    schedule_times: list[datetime],
    user_urn: str,
):
    """
    Stores the scheduled posts in Redis

    Args:
        content (str): post content
        access_token (str): access token for linkedin upload
        schedule_times (list): list of scheduled times
        user_urn (str): Author of the post

    """
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
                "user_urn": user_urn,
            }
        )

        r.zadd("linkedin_scheduled_posts", {payload: timestamp})


@router.post("/post-linkedin", status_code=200)
async def schedule_post(request: ScheduleRequest):
    """
    Schedules the user post

    Args:
        request (ScheduleRequest): Pydantic Schema for user request

    Returns:
        Dict: Message with status
              - success: {
                    "message": "Your post has been scheduled successfully",
                    "status": "success",
                }
              - error:{
                    "message": f"Error occurred due to {e}",
                    "status": "failed",
                }
    """

    profile_resp = requests.get(
        "https://api.linkedin.com/v2/userinfo",
        headers={"Authorization": f"Bearer {request.access_token}"},
    )
    profile_data = profile_resp.json()
    user_urn = f"urn:li:person:{profile_data['sub']}"

    try:
        put_post_in_redis(
            content=request.content,
            access_token=request.access_token,
            schedule_times=request.schedule_times,
            user_urn=user_urn,
        )
        return {
            "message": "Your post has been scheduled successfully",
            "status": "success",
        }

    except Exception as e:
        return {
            "message": f"Error occurred due to {e}",
            "status": "failed",
        }
