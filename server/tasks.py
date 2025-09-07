import base64

from celery_app import celery
from services.post_linkedin import post_to_linkedin


@celery.task(name="publish_linkedin_post")
def publish_linkedin_post(content, image_base64, user_urn, access_token):
    """
    Runs the celery worker
    """

    image_bytes = None
    if image_base64:
        image_bytes = base64.b64decode(image_base64)

    try:
        response = post_to_linkedin(
            content,
            user_urn,
            access_token,
            image_bytes,
        )
        return {
            "status": "success",
            "linkedin_response": response,
        }
    except Exception as e:
        return {
            "status": "error",
            "error": f"Error occured due to {e}",
        }
