from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class ScheduleRequest(BaseModel):
    content: str
    access_token: str
    schedule_times: List[datetime]
