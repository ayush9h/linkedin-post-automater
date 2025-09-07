from typing import Optional

from pydantic import BaseModel


class ScheduleRequest(BaseModel):
    content: str
    image_base64: Optional[str] = None
    access_token: str
    delay: int = 0
