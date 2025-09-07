import io

from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from models.image import ImageRequest
from services.generate_image import generate_image

router = APIRouter()


@router.post(
    "/generate-image",
    status_code=200,
    response_description="Generated image as PNG",
)
async def generate_post_image(request: ImageRequest):
    image_bytes = await generate_image(user_input=request.query)
    return StreamingResponse(
        io.BytesIO(image_bytes),
        media_type="image/png",
    )
