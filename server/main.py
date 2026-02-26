from contextlib import asynccontextmanager

from config.development import ORIGINS
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import generate_content, schedule_posts
from scheduler import start_scheduler


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()
    yield


app = FastAPI(
    title="Linkedin Post Automator - BE",
    summary="Services, routes for Linkedin post Automator",
    version="0.1.0",
    lifespan=lifespan,
)


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

# app.include_router(generate_image.router, prefix="/api/v1", tags=["Image"])
app.include_router(generate_content.router, prefix="/api/v1", tags=["Content"])
app.include_router(schedule_posts.router, prefix="/api/v1", tags=["Schedule"])
app.include_router(schedule_posts.router, prefix="/api/v1", tags=["Schedule"])
