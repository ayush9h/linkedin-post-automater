from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from services.generate_content import generate_content
from services.generate_image import generate_image
from services.post_linkedin import post_to_linkedin
from services.post_analysis import post_summary


app = Flask(__name__)

CORS(app)


@app.route('/api/v1/generate-content', methods=['POST'])
def generate_content_route():
    content = None

    request_data = request.get_json()
    user_input = request_data.get('query')

    response = generate_content(user_input)

    if response:
        content = response[0].chat_history[2]['content']
        return jsonify({"content": content})


@app.route('/api/v1/generate-image', methods=['POST'])
def generate_image_route():

    request_data = request.get_json()
    user_image = request_data.get('query')

    try:
        generate_image(user_image)
        return send_file('generated_image.png', mimetype='image/png')
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/v1/post-linkedin', methods=['POST'])
def post_linkedin_route():
    try:
        request_data = request.get_json()
        generated_content = request_data.get('generated_content')
        image_path = request_data.get('image_path')

        linkedin_asset = post_to_linkedin(generated_content, image_path)

        return jsonify({"status": "success", "linkedinpost": linkedin_asset}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/v1/post-analysis', methods=['GET'])
def get_comments_route():
    try:
        post_url = request.args.get('post_url')

        analysis = post_summary(str(post_url))

        return jsonify({
            "status": "success",
            "analysis": analysis["content"]
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
