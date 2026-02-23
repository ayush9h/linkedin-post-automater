import importlib

import cron
import tasks
from apscheduler.schedulers.asyncio import AsyncIOScheduler

scheduler = AsyncIOScheduler()


def start_scheduler():
    for trigger, module_path, func_name in cron.JOBS:
        module = importlib.import_module(module_path)
        actor = getattr(module, func_name)

        scheduler.add_job(
            actor.send,
            trigger=trigger,
            name=f"{module_path}.{func_name}",
        )

    scheduler.start()
