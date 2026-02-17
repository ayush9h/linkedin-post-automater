from pydantic import BaseModel


class ImageRequest(BaseModel):
    query: str
