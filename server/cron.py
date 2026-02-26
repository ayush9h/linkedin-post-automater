from apscheduler.triggers.cron import CronTrigger

JOBS = []


def cron(crontab: str):
    trigger = CronTrigger.from_crontab(crontab)

    def decorator(actor):
        module_path = actor.fn.__module__
        func_name = actor.fn.__name__
        JOBS.append((trigger, module_path, func_name))
        return actor

    return decorator
