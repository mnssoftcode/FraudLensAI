from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/")
def health():

    model_loaded = settings.MODEL_PATH.exists()
    scaler_loaded = settings.SCALER_PATH.exists()

    return {
        "status": "healthy",
        "model_loaded": model_loaded,
        "scaler_loaded": scaler_loaded,
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }