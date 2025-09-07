from pydantic import BaseModel


class ContentRequest(BaseModel):
    query: str


class ContentResponse(BaseModel):
    content: str
