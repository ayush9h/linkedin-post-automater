from celery import Celery
from config.development import REDIS_URL


def make_celery():
    return Celery(
        "linkedin_tasks",
        broker=REDIS_URL,
        backend=REDIS_URL,
    )


celery = make_celery()
import tasks.task
