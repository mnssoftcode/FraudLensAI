from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings

from app.api.routes.predict import router as predict_router
from app.api.routes.csv_predict import router as csv_predict_router
from app.api.routes.download import router as download_router
from app.api.routes.health import router as health_router
from app.api.routes.metrics import router as metrics_router
from app.api.routes.model import router as model_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(csv_predict_router)
app.include_router(download_router)
app.include_router(model_router)
app.include_router(metrics_router)
app.include_router(health_router)


@app.get("/")
def home():

    return {

        "message": settings.APP_NAME,

        "version": settings.APP_VERSION,

        "status": "Running",

        "model": "best_model.pkl",

        "api": "/docs",

    }