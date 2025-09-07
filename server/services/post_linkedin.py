import requests
from config.development import LINKEDIN_API_URL

ASSETS_REGISTER_UPLOAD_URL = f"{LINKEDIN_API_URL}/assets?action=registerUpload" 
POST_URL = f"{LINKEDIN_API_URL}/ugcPosts" 


def upload_image(
    image_bytes,
    user_urn,
    access_token,
):
    if not image_bytes:
        return None

    HEADERS = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
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

    headers_octet = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/octet-stream",
    }

    upload_res = requests.put(upload_url, data=image_bytes, headers=headers_octet)
    upload_res.raise_for_status()

    return image_asset


def post_to_linkedin(
    content,
    user_urn,
    access_token,
    image_bytes=None,
):
    image_asset = (
        upload_image(
            image_bytes=image_bytes,
            user_urn=user_urn,
            access_token=access_token,
        )
        if image_bytes
        else None
    )

    HEADERS = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
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
        post_data["specificContent"]["com.linkedin.ugc.ShareContent"][
            "shareMediaCategory"
        ] = "IMAGE"
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
