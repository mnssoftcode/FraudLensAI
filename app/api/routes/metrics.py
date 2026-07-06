import json

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"],
)


@router.get("/")
def metrics():
    path = settings.BASE_DIR / "saved_models" / "metrics.json"
    if not path.exists():
        return {
            "message": "Metrics not found."
        }
    with open(path) as f:
        return json.load(f)