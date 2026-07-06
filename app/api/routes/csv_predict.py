import joblib
import pandas as pd

from fastapi import APIRouter, File, UploadFile, HTTPException
from app.core.config import settings
from app.data.schema import EXPECTED_COLUMNS

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)

model = None
scaler = None
FEATURE_COLUMNS = [
    column
    for column in EXPECTED_COLUMNS
    if column not in ("Time", "Class")
]


def get_model_scaler():
    global model, scaler
    if model is None or scaler is None:
        try:
            model = joblib.load(settings.MODEL_PATH)
            scaler = joblib.load(settings.SCALER_PATH)
        except Exception:
            raise HTTPException(
                status_code=500,
                detail="Model or scaler could not be loaded.",
            )
    return model, scaler


def validate_csv_columns(df: pd.DataFrame) -> pd.DataFrame:
    missing_columns = [
        column
        for column in FEATURE_COLUMNS
        if column not in df.columns
    ]
    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"Missing columns: {missing_columns}",
        )
    return df[FEATURE_COLUMNS]

@router.post("/csv")
async def predict_csv(file: UploadFile = File(...)):

    try:
        df = pd.read_csv(file.file)
    except Exception:
        raise HTTPException(
            status_code=400,
            detail="Unable to read uploaded CSV file.",
        )

    if df.empty:
        raise HTTPException(
            status_code=400,
            detail="Uploaded CSV is empty.",
        )

    df = validate_csv_columns(df)
    model, scaler = get_model_scaler()

    X = scaler.transform(df)

    predictions = model.predict(X)
    probabilities = model.predict_proba(X)[:, 1]

    df["Prediction"] = predictions
    df["Fraud Probability"] = probabilities

    fraud = int(predictions.sum())

    safe = len(df) - fraud

    output_dir = settings.BASE_DIR / "reports"
    output_dir.mkdir(parents=True, exist_ok=True)

    output = output_dir / "predictions.csv"
    df.to_csv(output, index=False)

    return {
        "summary": {
            "total_transactions": len(df),
            "fraud_detected": fraud,
            "safe_transactions": safe,
            "fraud_rate": round(fraud / len(df) * 100, 2),
        },
        "predictions": df.to_dict(orient="records"),
        "download": "/download",
    }