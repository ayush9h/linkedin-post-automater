import uvicorn
from config.development import ORIGINS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import generate_content, generate_image, schedule_posts

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    ORIGINS,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generate_image.router, prefix="/api/v1", tags=["Image"])
app.include_router(generate_content.router, prefix="/api/v1", tags=["Content"])
app.include_router(schedule_posts.router, prefix="/api/v1", tags=["Schedule"])

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
