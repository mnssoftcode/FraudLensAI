import json

from fastapi import APIRouter

from app.core.config import settings

router = APIRouter(
    prefix="/model",
    tags=["Model"],
)


@router.get("/info")
def model_info():
    path = settings.BASE_DIR / "saved_models" / "metrics.json"
    if not path.exists():
        return {
            "message": "metrics.json not found"
        }

    with open(path, "r") as f:
        return json.load(f)