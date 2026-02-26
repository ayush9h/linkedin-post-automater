# LinkedIn Post Automation

## Overview

LinkedIn Post Automation is an application designed to automate the process of creating, and posting content on LinkedIn. Leveraging AI-powered tools for content generation, this project enables users to optimize their LinkedIn posts for maximum engagement and professionalism.


## Architecture
<img width="1919" height="461" alt="image" src="https://github.com/user-attachments/assets/9eedb1a7-3417-4acc-aac7-51df6eb488a2" />


## Features

1. **AI-Powered Content Generation**: Automatically generate professional LinkedIn posts tailored to your input.
2. **Automated Posting**: Schedule and post content directly to LinkedIn for multiple days.


## Tech Stack

### **Frontend**
- **Framework**: NextJs
- **Styling**: Tailwind CSS

### **Backend**
- **Framework**: FastAPI, Redis, Dramatiq
- **Languages**: Python


## Project Flow

The **LinkedIn Post Automation** system automates the entire process of content creation, and posting to LinkedIn. Here’s how it works:

### 1. **User Input and Content Generation**
   - **Frontend**: The user provides a **LinkedIn post topic** (text-based prompt) on the NextJs interface. 
   - **System Response**:
     - The frontend sends a request to the backend to generate the **LinkedIn post content** and **custom image**. 
     - The backend calls the **AI model APIs (GROQ, Gemini)** to generate the content based on the input topic.
     - Similarly, the backend generates a **custom image** using AI models.
     - The frontend receives the **generated content** (text) and **image** (as PNG).


<!-- <img width="1541" height="853" alt="image" src="https://github.com/user-attachments/assets/036e2de9-836c-4846-813b-2155f2ff5b0e" /> -->

### 2. **Posting to LinkedIn**
   - **Backend Process**:
     - The backend uses the **LinkedIn API** to upload the image and post the content.
     - The process includes two main steps:
       - **Image Upload**:
         - The backend uploads the image to LinkedIn using the `POST /assets` endpoint of the LinkedIn API. This creates a new image asset on LinkedIn.
         - The API responds with an **asset ID** (a unique identifier for the image).
       - **Post Creation**:
         - The backend then uses the **LinkedIn API's "Share on LinkedIn" endpoint** to create a post. The request includes the **post content** and the **image asset ID**.
         - The backend successfully creates the post and returns a **confirmation message** with the LinkedIn post details (URL, post ID).


<!-- <img width="1409" height="825" alt="image" src="https://github.com/user-attachments/assets/6d9ebb8a-dffe-4fed-830a-5dad08a592de" /> -->

   - **System Response**: The frontend shows a success notification, confirming that the post has been successfully uploaded to LinkedIn.



<img width="1071" height="705" alt="image" src="https://github.com/user-attachments/assets/638ec888-146d-483c-9eaa-429bb13c7e48" />



### Summary of Flow:

1. **Frontend**: User inputs a post topic and image description → Sends request to backend.
2. **Backend**:
   - Generates post content (AI-powered).
3. **Post Creation**: Backend creates a LinkedIn post using the content asset ID → Post is uploaded to LinkedIn.

### **AI Models and Services**
- **LLM Provider**: Groq
- **Models**: GPT-oss 
- **Agents**: Autogen agents for text generation.

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
   uv venv .venv
   .venv/Scripts/activate
   ```
2. Install dependencies:
   ```bash
   uv pip install -r requirements.txt
   ```
3. Create a `.env` file and add the following keys:
   ```bash
    ACCESS_TOKEN=<access_token>
    EMAIL=<email_id>
    GROQ_API_KEY=<groq_key>
    HUGGINGFACE_API_KEY=<huggingface_key>
    PASSWORD=<password>
    PERSON_URN_KEY=<urn_key>
    TAVILY_KEY=<tavily_key>
    REDIS_URL=<redis_url>
   ```
4. Build the docker-compose:
   ```bash
   docker-compose build
   ```
5. Run the docker-compose file:
    ```bash
    docker-compose up
    ```

## Contribution
Feel free to contribute by:
- Reporting issues
- Suggesting features
- Submitting pull requests


## License
This project is licensed under the MIT License.
