from fastapi import APIRouter
from models.content import ContentRequest, ContentResponse
from services.generate_content import generate_content

router = APIRouter()


@router.post(
    "/generate-content",
    response_model=ContentResponse,
    status_code=200,
    response_description="Response containing the post content",
)
async def generate_post_content(request: ContentRequest):
    result = await generate_content(user_input=request.query)
    messages = result.messages

    response = messages[len(messages) - 1].content
    return {
        "content": response,
    }
