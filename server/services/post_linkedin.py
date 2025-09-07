import requests
from config.development import LINKEDIN_API_URL, get_headers

ASSETS_REGISTER_UPLOAD_URL = f"{LINKEDIN_API_URL}/assets?action=registerUpload" 
POST_URL = f"{LINKEDIN_API_URL}/ugcPosts" 


def upload_image(
    image_path,
    user_urn,
    access_token,
):
    if not image_path:
        return None

    HEADERS = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/octet-stream",
    }
    data = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": user_urn,
            "serviceRelationships": [
                {
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent",
                }
            ],
        }
    }

    res = requests.post(ASSETS_REGISTER_UPLOAD_URL, json=data, headers=HEADERS)
    res.raise_for_status()
    res_data = res.json()

    upload_url = res_data["value"]["uploadMechanism"]["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]["uploadUrl"]
    image_asset = res_data["value"]["asset"]

    with open(image_path, "rb") as image_file:
        requests.post(upload_url, data=image_file.read(), headers=HEADERS)

    return image_asset


def post_to_linkedin(
    content,
    user_urn,
    access_token,
    image_path=None,
):
    image_asset = upload_image(
        image_path=image_path,
        user_urn=user_urn,
        access_token=access_token,
    )

    HEADERS = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/octet-stream",
    }

    post_data = {
        "author": user_urn,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": content},
                "shareMediaCategory": "NONE",
            },
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
    }

    if image_asset:
        post_data["specificContent"]["com.linkedin.ugc.ShareContent"]["media"] = [
            {
                "status": "READY",
                "description": {"text": content},
                "media": image_asset,
                "title": {"text": "LinkedIn Post"},
            }
        ]

    response = requests.post(POST_URL, json=post_data, headers=HEADERS)
    return response.json()
