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

# Required feature columns (excluding Class label)
REQUIRED_COLUMNS = [
    column
    for column in EXPECTED_COLUMNS
    if column not in ("Class",)
]
# Time is optional — many public CSV samples don't include it
OPTIONAL_COLUMNS = {"Time"}


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


def validate_and_prepare_csv(df: pd.DataFrame) -> pd.DataFrame:
    """
    Validate CSV columns and fill optional ones with defaults.
    - Time is optional: defaults to 0.0 if not present
    - All V1-V28 and Amount are required
    """
    # Auto-fill optional missing columns with defaults
    for col in OPTIONAL_COLUMNS:
        if col not in df.columns:
            df[col] = 0.0

    # Check for truly required columns (V1-V28, Amount)
    strictly_required = [c for c in REQUIRED_COLUMNS if c not in OPTIONAL_COLUMNS]
    missing_columns = [c for c in strictly_required if c not in df.columns]
    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"Missing required columns: {missing_columns}. Expected: V1–V28, Amount (Time is optional).",
        )

    # Return columns in the exact order the scaler expects
    return df[REQUIRED_COLUMNS]


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

    df = validate_and_prepare_csv(df)
    model, scaler = get_model_scaler()

    # Use named DataFrame so scaler recognizes columns (no sklearn warning)
    X = df[list(scaler.feature_names_in_)]
    X_scaled = scaler.transform(X)

    predictions = model.predict(X_scaled)
    probabilities = model.predict_proba(X_scaled)[:, 1]

    df["Prediction"] = predictions
    df["Label"] = ["Fraud" if p == 1 else "Normal" for p in predictions]
    df["Fraud Probability"] = probabilities.round(4)

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