import requests
from config.development import LINKEDIN_API_URL, PERSON_URN_KEY, get_headers

ASSETS_REGISTER_UPLOAD_URL = f"{LINKEDIN_API_URL}/assets?action=registerUpload" 
POST_URL = f"{LINKEDIN_API_URL}/ugcPosts" 

def upload_image(image_path):
    HEADERS = get_headers() 
    data = {
        "registerUploadRequest": {
            "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
            "owner": PERSON_URN_KEY,
            "serviceRelationships": [{"relationshipType": "OWNER", "identifier": "urn:li:userGeneratedContent"}],
        }
    }
    res_data = requests.post(
        ASSETS_REGISTER_UPLOAD_URL, json=data, headers=HEADERS
    ).json()
    upload_url = res_data["value"]["uploadMechanism"]["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]["uploadUrl"]
    image_asset = res_data["value"]["asset"]

    with open(image_path, "rb") as image_file:
        requests.post(upload_url, data=image_file.read(), headers=HEADERS)

    return image_asset

def post_to_linkedin(content, image_path):
    HEADERS = get_headers(content_type="application/octet-stream")
    image_asset = upload_image(image_path)
    post_data = {
        "author": PERSON_URN_KEY,
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": content},
                "shareMediaCategory": "IMAGE",
                "media": [{"status": "READY", "description": {"text": content}, "media": image_asset, "title": {"text": "LinkedIn Post"}}],
            },
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
    }
    response = requests.post(POST_URL, json=post_data, headers=HEADERS)
    response.raise_for_status()
