from celery_app import celery
from services.post_linkedin import post_to_linkedin


@celery.task(name="publish_linkedin_post")
def publish_linkedin_post(content, image_path):
    """
    Runs the celery worker
    """
    try:
        response = post_to_linkedin(content, image_path)
        return {
            "status": "success",
            "linkedin_response": response,
        }
    except Exception as e:
        return {
            "status": "error",
            "error": f"Error occured due to {e}",
        }
