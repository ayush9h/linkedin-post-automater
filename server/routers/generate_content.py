from autogen_agentchat.messages import TextMessage
from fastapi import APIRouter
from schemas.content import ContentRequest, ContentResponse
from services.generate_post import flow

router = APIRouter()


@router.post(
    "/generate-content",
    response_model=ContentResponse,
    status_code=200,
    response_description="Response containing the post content",
)
async def generate_post_content(request: ContentRequest):
    result = await flow.run(
        task=TextMessage(content=request.query, source="user"),
    )
    response = result.messages[-1].content  # type: ignore

    return {"content": response}  # type : ignore
