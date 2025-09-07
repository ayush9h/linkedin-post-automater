import requests
from celery_app import celery
from fastapi import APIRouter
from models.schedule import ScheduleRequest
from redbeat import RedBeatSchedulerEntry

router = APIRouter()


@router.post("/post-linkedin", status_code=200)
async def schedule_post(request: ScheduleRequest):
    profile_resp = requests.get(
        "https://api.linkedin.com/v2/userinfo",
        headers={"Authorization": f"Bearer {request.access_token}"},
    )
    profile_data = profile_resp.json()
    user_urn = f"urn:li:person:{profile_data['sub']}"

    schedule = 10

    entry = RedBeatSchedulerEntry(
        name=f"linkedin-post-every-{schedule}-secs",
        task="publish_linkedin_post",
        schedule=schedule,
        args=[request.content, request.image_base64, user_urn, request.access_token],
        app=celery,
    )
    entry.save()

    return {"status": "success"}
