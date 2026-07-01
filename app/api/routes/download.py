from fastapi import APIRouter
from fastapi.responses import FileResponse

router = APIRouter(tags=["Download"])


@router.get("/download")
def download():

    return FileResponse(
        "reports/predictions.csv",
        filename="predictions.csv",
    )