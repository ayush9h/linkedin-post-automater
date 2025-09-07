from celery import Celery
from config.development import REDIS_URL


def make_celery():
    return Celery(
        "linkedin_tasks",
        broker=REDIS_URL,
        backend=REDIS_URL,
        beat_scheduler="redbeat.RedBeatScheduler",
    )


celery = make_celery()
import tasks
