# LinkedIn Post Automation

> [!IMPORTANT]  
> Use with caution, LinkedIn account linked with the application.

## Overview

LinkedIn Post Automation is a comprehensive application designed to automate the process of creating, enhancing, and posting content on LinkedIn. Leveraging AI-powered tools for content generation, image creation, and sentiment analysis, this project enables users to optimize their LinkedIn posts for maximum engagement and professionalism.

---




## Features

1. **AI-Powered Content Generation**: Automatically generate professional LinkedIn posts tailored to your input.
2. **Custom Image Creation**: Generate high-quality, AI-designed images based on user prompts.
3. **Automated Posting**: Schedule and post content directly to LinkedIn for multiple days.
4. **Post Sentiment Analysis**: Analyze LinkedIn post comments to determine sentiment and conversation tone.

---

## Tech Stack

### **Frontend**
- **Framework**: React
- **Styling**: Tailwind CSS
- **Libraries**:
  - `react-markdown`: For rendering Markdown content.
  - `@fortawesome/react-fontawesome`: For icons.

### **Backend**
- **Framework**: Flask
- **Languages**: Python
- **APIs and Libraries**:
  - `linkedin-api`: For LinkedIn API interactions.
  - `requests`: For HTTP requests.
  - `Pillow`: For image processing.

### **AI Models and Services**
- **LLM Provider**: GROQ API and Hugging Face API
- **Models**: Gemma2-9B-IT, Black Forest Labs Flux
- **Agents**: Autogen agents for text and image generation.

### **Deployment**
- **Frontend**: Deployed on Vercel.
- **Backend**: Hosted on Render.
- **Database**: Not applicable; ephemeral data.

---

## Setup Guide

### Prerequisites
- Node.js (>= 16.x)
- Python (>= 3.8)
- Pipenv or virtualenv
- Docker (optional for containerized deployment)

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
   GROQ_API_KEY=<your_api_key>
   PERSON_URN_KEY=<your_linkedIn_urn>
   ACCESS_TOKEN=<your_access_token>
   HUGGINGFACE_API_KEY=<your_huggingface_api_key>
   EMAIL=<linkedin_account_email>
   PASSWORD=<linkedin_account_password>
   ```
4. Run the server:
   ```bash
   flask run
   ```

---

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
- **Response**: Returns a `.png` image.

### **3. Post to LinkedIn**
- **URL**: `/api/v1/post-linkedin`
- **Method**: `POST`
- **Payload**:
  ```json
  {
    "generated_content": "<LinkedIn post content>",
    "image_path": "generated_image.png"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "linkedinpost": "<LinkedIn asset>"
  }
  ```

### **4. Sentiment Analysis**
- **URL**: `/api/v1/post-analysis`
- **Method**: `GET`
- **Query Params**:
  ```json
  {
    "post_url": "<LinkedIn post URL>"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "analysis": "Sentiment breakdown and insights."
  }
  ```

---

## Project Flow

The **LinkedIn Post Automation** system automates the entire process of content creation, image generation, and posting to LinkedIn. Here’s how it works:

### 1. **User Input and Content Generation**
   - **Frontend**: The user provides a **LinkedIn post topic** (text-based prompt) and an **image description** on the React frontend interface.
   - **System Response**:
     - The frontend sends a request to the backend to generate the **LinkedIn post content** and **custom image**. 
     - The backend calls the **AI model APIs (GROQ, Hugging Face)** to generate the content based on the input topic.
     - Similarly, the backend generates a **custom image** using AI models.
     - The frontend receives the **generated content** (text) and **image** (as PNG).

### 2. **Combining Content and Image**
   - **Frontend**: The user can review the generated LinkedIn post and image. Optionally, they can edit the text or adjust the image description.
   - **System Response**:
     - The frontend then sends the **final content** (post text) and **image file** (PNG) to the backend for posting to LinkedIn.

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
   
   - **System Response**: The frontend shows a success notification, confirming that the post has been successfully uploaded to LinkedIn.

### 4. **Sentiment Analysis**
   - **User Action**: After the post is live on LinkedIn, the user may want to analyze the comments and reactions to the post.
   - **System Response**:
     - The user provides the **LinkedIn post URL** to the frontend, which sends it to the backend for sentiment analysis.
     - The backend uses sentiment analysis models to evaluate the **comments** on the LinkedIn post.
     - The backend responds with a detailed **sentiment breakdown**, identifying the **positive**, **negative**, and **neutral** tones of the post’s engagement.

---

### Summary of Flow:

1. **Frontend**: User inputs a post topic and image description → Sends request to backend.
2. **Backend**:
   - Generates post content (AI-powered).
   - Generates a custom image (AI-powered).
3. **Image Upload**: Backend uploads the generated image to LinkedIn via the `POST /assets` endpoint and receives an image asset ID.
4. **Post Creation**: Backend creates a LinkedIn post using the content and image asset ID → Post is uploaded to LinkedIn.
5. **Sentiment Analysis**: User can analyze post comments via the sentiment analysis endpoint for detailed insights.

---

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

4. **Analyze Posts**:
   - Enter a LinkedIn post URL.
   - Get a sentiment analysis breakdown of the comments.

---

## Contribution
Feel free to contribute by:
- Reporting issues
- Suggesting features
- Submitting pull requests

---

## License
This project is licensed under the MIT License.
