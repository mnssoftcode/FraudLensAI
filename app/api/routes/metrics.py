import json
from pathlib import Path

from fastapi import APIRouter

router = APIRouter(
    prefix="/metrics",
    tags=["Metrics"],
)


@router.get("/")
def metrics():

    path = Path("saved_models/metrics.json")

    if not path.exists():
        return {
            "message": "Metrics not found."
        }

    with open(path) as f:
        return json.load(f)