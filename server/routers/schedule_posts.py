import base64
from datetime import datetime, timedelta

import requests
from fastapi import APIRouter
from models.schedule import ScheduleRequest
from tasks.task import publish_linkedin_post

router = APIRouter()


@router.post(
    "/post-linkedin",
    status_code=200,
    response_description="Response containing the post content",
)
async def schedule_post(request: ScheduleRequest):
    profile_resp = requests.get(
        "https://api.linkedin.com/v2/userinfo",
        headers={"Authorization": f"Bearer {request.access_token}"},
    )
    profile_data = profile_resp.json()
    user_urn = f"urn:li:person:{profile_data['sub']}"

    image_bytes = None
    if request.image_base64:
        image_bytes = base64.b64decode(request.image_base64)

    if request.delay > 0:
        eta = datetime.now() + timedelta(minutes=request.delay)
        job = publish_linkedin_post.apply_async(
            args=[request.content, image_bytes, user_urn, request.access_token],
            eta=eta,
        )
    else:
        job = publish_linkedin_post.apply_async(
            args=[request.content, image_bytes, user_urn, request.access_token]
        )

    return {"status": "success", "job_id": job.id}
