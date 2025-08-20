import asyncio
import logging
from datetime import datetime, timedelta

from celery.result import AsyncResult
from celery_app import celery
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS
from services.generate_content import generate_content
from services.generate_image import generate_image
from tasks.task import publish_linkedin_post

app = Flask(__name__)

CORS(app)


@app.route('/api/v1/generate-content', methods=['POST'])
def generate_content_route():
    request_data = request.get_json()
    user_input = request_data.get('query')

    response = asyncio.run(generate_content(user_input))
    messages = response.messages
    response = messages[len(messages) - 1].content
    return jsonify(
        {
            "content": response,
        }
    )


@app.route('/api/v1/generate-image', methods=['POST'])
def generate_image_route():

    request_data = request.get_json()
    user_image = request_data.get('query')

    try:
        asyncio.run(generate_image(user_image))
        return send_file('generated_image.png', mimetype='image/png')
    except Exception as e:
        logging.warning(f"Error occurred due to {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500


@app.route('/api/v1/post-linkedin', methods=['POST'])
def post_linkedin_route():
    try:
        request_data = request.get_json()
        generated_content = request_data.get('generated_content')
        image_path = request_data.get('image_path')
        delay = request_data.get("delay", 0)

        if delay > 0:
            eta = datetime.now() + timedelta(minutes=delay)
            job = publish_linkedin_post.apply_async(
                args=[generated_content, image_path], eta=eta
            )
        else:
            job = publish_linkedin_post.apply_async(
                args=[generated_content, image_path]
            )
        return (
            jsonify(
                {"status": "success", "job_id": job.id},
            ),
            202,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/v1/task-status/<task_id>", methods=["GET"])
def check_task_status(task_id):
    """
    Check the status of a Celery task
    """
    result = AsyncResult(task_id, app=celery)

    status = result.status
    response = {"task_id": task_id, "status": status}

    if result.successful():
        response["result"] = result.result

        result.forget()
    elif result.failed():
        response["error"] = str(result.result)
        result.forget()

    return jsonify(response), 200


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5005)
