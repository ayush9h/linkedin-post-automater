from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import generate_content, generate_image

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
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
