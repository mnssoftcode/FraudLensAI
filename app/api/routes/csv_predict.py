import joblib
import pandas as pd

from fastapi import APIRouter, File, UploadFile
from pathlib import Path
from app.core.config import settings

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)

model = joblib.load(settings.MODEL_PATH)
scaler = joblib.load(settings.SCALER_PATH)

@router.post("/csv")
async def predict_csv(file: UploadFile = File(...)):

    df = pd.read_csv(file.file)

    X = scaler.transform(df)

    predictions = model.predict(X)

    probabilities = model.predict_proba(X)[:,1]

    df["Prediction"] = predictions

    df["Fraud Probability"] = probabilities

    fraud = int(predictions.sum())

    safe = len(df) - fraud

    Path("reports").mkdir(exist_ok=True)

    output = "reports/predictions.csv"

    df.to_csv(output, index=False)

    return {

        "summary": {

            "total_transactions": len(df),

            "fraud_detected": fraud,

            "safe_transactions": safe,

            "fraud_rate": round(
                fraud / len(df) * 100,
                2,
            ),

        },

        "predictions": df.to_dict(
            orient="records"
        ),

        "download": "/download/predictions",

    }