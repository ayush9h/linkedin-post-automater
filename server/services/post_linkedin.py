from config import development
import requests


def upload_image(image_path):
    url = "https://api.linkedin.com/v2/assets?action=registerUpload"

    headers = {
        "Authorization": f"Bearer {development.ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }

    data = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": development.PERSON_URN_KEY,
            "serviceRelationships": [{
                "relationshipType": "OWNER",
                "identifier": "urn:li:userGeneratedContent"
            }]
        }
    }

    res_data = requests.post(url, json=data, headers=headers).json()

    upload_url = res_data["value"]["uploadMechanism"]["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]["uploadUrl"]
    image_asset = res_data["value"]["asset"]

    with open(image_path, "rb") as image_file:
        image_data = image_file.read()

    headers = {
        "Authorization": f"Bearer {development.ACCESS_TOKEN}"
    }

    res = requests.post(upload_url, data=image_data, headers=headers)

    print(res.status_code)

    return image_asset


def post_to_linkedin(generated_content, image_path):
    url = "https://api.linkedin.com/v2/ugcPosts"

    headers = {
        "Authorization": f"Bearer {development.ACCESS_TOKEN}",
        "Content-Type": "application/json",
    }

    image_asset = upload_image(image_path)

    post_data = {
        "author": development.PERSON_URN_KEY,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": generated_content
                },
                "shareMediaCategory": "IMAGE",
                "media": [
                    {
                        "status": "READY",
                        "description": {"text": generated_content},
                        "media": image_asset,
                        "title": {
                            "text": "LinkedIn Post"
                        }
                    }
                ]
            }
        },
        "visibility": {
            "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
        }
    }

    try:
        response = requests.post(url, json=post_data, headers=headers)
        response.raise_for_status()

        print(f"Successfully posted on LinkedIn: {response.status_code}")

    except requests.exceptions.RequestException as e:
        print(f"Error posting on LinkedIn: {e}")
