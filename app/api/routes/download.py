from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

from app.core.config import settings

router = APIRouter(tags=["Download"])


@router.get("/download")
def download():
    path = settings.BASE_DIR / "reports" / "predictions.csv"
    if not path.exists():
        raise HTTPException(
            status_code=404,
            detail="Prediction report not found.",
        )
    return FileResponse(
        path,
        filename="predictions.csv",
    )