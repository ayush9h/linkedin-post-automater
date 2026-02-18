from pydantic import BaseModel


class ContentRequest(BaseModel):
    query: str
    is_web_search: bool


class ContentResponse(BaseModel):
    content: str
