# LinkedIn Post Automation

## Overview

LinkedIn Post Automation is an application designed to automate the process of creating, and posting content on LinkedIn. Leveraging AI-powered tools for content generation, and image generation, this project enables users to optimize their LinkedIn posts for maximum engagement and professionalism.


## Architecture
<img width="1919" height="461" alt="image" src="https://github.com/user-attachments/assets/9eedb1a7-3417-4acc-aac7-51df6eb488a2" />


## Features

1. **AI-Powered Content Generation**: Automatically generate professional LinkedIn posts tailored to your input.
2. **Custom Image Creation**: Generate high-quality, AI-designed images based on user prompts.
3. **Automated Posting**: Schedule and post content directly to LinkedIn for multiple days.


## Tech Stack

### **Frontend**
- **Framework**: NextJs
- **Styling**: Tailwind CSS
- **Libraries**:
  - `react-markdown`: For rendering Markdown content.
  - `@lucide-react`: For icons.

### **Backend**
- **Framework**: FastAPI, Redis, Celery
- **Languages**: Python
- **APIs and Libraries**:
  - `linkedin-api`: For LinkedIn API interactions.
  - `requests`: For HTTP requests.


### **AI Models and Services**
- **LLM Provider**: Groq and Gemini
- **Models**: GPT-oss and Gemini-flash-preview models
- **Agents**: Autogen agents for text and image generation.

### **Deployment**
- **Frontend**: Deployed on Vercel.
- **Backend**: Hosted on Render.
- **Database**: Redis for storing the scheduled posts.


## Setup Guide

### Prerequisites
- Node.js (>= 16.x)
- Python (>= 3.8)
- Redis Insights

### **Frontend**
1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### **Backend**
1. Create a virtual environment and activate it:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Create a `.env` file and add the following keys:
   ```env
    GROQ_API_KEY=<Your-api-key>
    REDIS_URL=<Your-redis-url>
    PORT=5000
    GEMINI_API_KEY=<Your-gemini-key>
    ORIGINS=<Your-frontend-endpoint>
   ```
4. Run the main server:
   ```bash
   python main.py
   ```
5. Run the Celery Worker and Redbeat Scheduler in separate terminals:
    ```bash
    celery -A celery_app.celery beat --loglevel=info --scheduler redbeat.RedBeatScheduler

    celery -A celery_app worker --loglevel=info --pool=solo
    ```

## API Endpoints

### **1. Content Generation**
- **URL**: `/api/v1/generate-content`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "query": "Write a LinkedIn post about AI automation."
  }
  ```
- **Response**:
  ```json
  {
    "content": "<Generated LinkedIn post>"
  }
  ```

### **2. Image Generation**
- **URL**: `/api/v1/generate-image`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "query": "Professional AI-powered image with technology theme"
  }
  ```
- **Response**: Returns image in bytes.

### **3. Post to LinkedIn**
- **URL**: `/api/v1/post-linkedin`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "generated_content": "<LinkedIn post content>",
    "image_path": bytes
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "linkedinpost": "<LinkedIn asset>"
  }
  ```


## Project Flow

The **LinkedIn Post Automation** system automates the entire process of content creation, image generation, and posting to LinkedIn. Here’s how it works:

### 1. **User Input and Content Generation**
   - **Frontend**: The user provides a **LinkedIn post topic** (text-based prompt) on the NextJs interface. 
   - **System Response**:
     - The frontend sends a request to the backend to generate the **LinkedIn post content** and **custom image**. 
     - The backend calls the **AI model APIs (GROQ, Gemini)** to generate the content based on the input topic.
     - Similarly, the backend generates a **custom image** using AI models.
     - The frontend receives the **generated content** (text) and **image** (as PNG).


<img width="1541" height="853" alt="image" src="https://github.com/user-attachments/assets/036e2de9-836c-4846-813b-2155f2ff5b0e" />

### 2. **Combining Content and Image**
   - **Frontend**: The user can review the generated LinkedIn post and image.
   - **System Response**:
     - The frontend then sends the **final content** (post text) and **image file** (PNG) to the backend for posting to LinkedIn.


<img width="1511" height="829" alt="image" src="https://github.com/user-attachments/assets/36c79180-5e14-41a5-9333-9d894d8e2f29" />


### 3. **Posting to LinkedIn**
   - **Backend Process**:
     - The backend uses the **LinkedIn API** to upload the image and post the content.
     - The process includes two main steps:
       - **Image Upload**:
         - The backend uploads the image to LinkedIn using the `POST /assets` endpoint of the LinkedIn API. This creates a new image asset on LinkedIn.
         - The API responds with an **asset ID** (a unique identifier for the image).
       - **Post Creation**:
         - The backend then uses the **LinkedIn API's "Share on LinkedIn" endpoint** to create a post. The request includes the **post content** and the **image asset ID**.
         - The backend successfully creates the post and returns a **confirmation message** with the LinkedIn post details (URL, post ID).


<img width="1409" height="825" alt="image" src="https://github.com/user-attachments/assets/6d9ebb8a-dffe-4fed-830a-5dad08a592de" />

   - **System Response**: The frontend shows a success notification, confirming that the post has been successfully uploaded to LinkedIn.



<img width="1071" height="705" alt="image" src="https://github.com/user-attachments/assets/638ec888-146d-483c-9eaa-429bb13c7e48" />



### Summary of Flow:

1. **Frontend**: User inputs a post topic and image description → Sends request to backend.
2. **Backend**:
   - Generates post content (AI-powered).
   - Generates a custom image (AI-powered).
3. **Image Upload**: Backend uploads the generated image to LinkedIn via the `POST /assets` endpoint and receives an image asset ID.
4. **Post Creation**: Backend creates a LinkedIn post using the content and image asset ID → Post is uploaded to LinkedIn.


## Usage

1. **Generate Content**:
   - Provide a topic or prompt via the frontend.
   - AI generates professional LinkedIn post content.

2. **Generate Image**:
   - Input a description for the desired image.
   - AI returns a customized, professional-grade image.

3. **Post to LinkedIn**:
   - Combine generated content and image.
   - Post directly to your LinkedIn account.



## Contribution
Feel free to contribute by:
- Reporting issues
- Suggesting features
- Submitting pull requests


## License
This project is licensed under the MIT License.
