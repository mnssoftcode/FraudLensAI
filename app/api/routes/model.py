import json
from pathlib import Path

from fastapi import APIRouter

router = APIRouter(
    prefix="/model",
    tags=["Model"],
)


@router.get("/info")
def model_info():

    path = Path("saved_models/metrics.json")

    if not path.exists():
        return {
            "message": "metrics.json not found"
        }

    with open(path, "r") as f:
        return json.load(f)