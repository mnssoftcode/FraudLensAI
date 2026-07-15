# pyrefly: ignore [missing-import]
import joblib
import numpy as np
import pandas as pd

from fastapi import APIRouter, HTTPException

from app.api.schemas.batch_transaction import BatchTransactionRequest
from app.api.schemas.transaction import TransactionRequest
from app.core.config import settings
from app.utils.logger import logger

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)

model = None
scaler = None


def get_model_scaler():
    global model, scaler
    if model is None or scaler is None:
        try:
            model = joblib.load(settings.MODEL_PATH)
            scaler = joblib.load(settings.SCALER_PATH)
        except Exception as exc:
            logger.error(
                "Unable to load model or scaler: %s",
                exc,
            )
            raise HTTPException(
                status_code=500,
                detail="Model or scaler could not be loaded.",
            )
    return model, scaler


def prepare_features(transaction: TransactionRequest):
    # Order must match scaler training: Time, V1-V28, Amount (30 features)
    return [
        transaction.Time,
        transaction.V1,
        transaction.V2,
        transaction.V3,
        transaction.V4,
        transaction.V5,
        transaction.V6,
        transaction.V7,
        transaction.V8,
        transaction.V9,
        transaction.V10,
        transaction.V11,
        transaction.V12,
        transaction.V13,
        transaction.V14,
        transaction.V15,
        transaction.V16,
        transaction.V17,
        transaction.V18,
        transaction.V19,
        transaction.V20,
        transaction.V21,
        transaction.V22,
        transaction.V23,
        transaction.V24,
        transaction.V25,
        transaction.V26,
        transaction.V27,
        transaction.V28,
        transaction.Amount,
    ]


@router.post("/")
def predict(request: TransactionRequest):

    logger.info("Prediction request received.")

    model, scaler = get_model_scaler()

    FEATURE_COLS = list(scaler.feature_names_in_)
    features = pd.DataFrame(
        [prepare_features(request)],
        columns=FEATURE_COLS,
    )

    features = scaler.transform(features)

    probability = float(
        model.predict_proba(features)[0][1]
    )

    prediction = int(
        model.predict(features)[0]
    )

    logger.info(
        f"Prediction={prediction} Probability={probability:.4f}"
    )

    return {
        "prediction": "Fraud" if prediction else "Normal",
        "probability": round(probability, 4),
    }


@router.post("/batch")
def batch_predict(request: BatchTransactionRequest):

    logger.info(
        f"Batch prediction received ({len(request.transactions)} transactions)"
    )

    model, scaler = get_model_scaler()

    FEATURE_COLS = list(scaler.feature_names_in_)
    features = pd.DataFrame(
        [prepare_features(t) for t in request.transactions],
        columns=FEATURE_COLS,
    )

    features = scaler.transform(features)

    predictions = model.predict(features)

    probabilities = model.predict_proba(features)

    results = []

    for prediction, probability in zip(
        predictions,
        probabilities,
    ):

        results.append(
            {
                "prediction": (
                    "Fraud"
                    if prediction
                    else "Normal"
                ),
                "probability": round(
                    float(probability[1]),
                    4,
                ),
            }
        )

    return {
        "total": len(results),
        "results": results,
    }