import joblib
import numpy as np

from fastapi import APIRouter

from app.api.schemas.batch_transaction import BatchTransactionRequest
from app.api.schemas.transaction import TransactionRequest
from app.utils.logger import logger

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"],
)

from app.core.config import settings

model = joblib.load(
    settings.MODEL_PATH
)

scaler = joblib.load(
    settings.SCALER_PATH
)


def prepare_features(transaction: TransactionRequest):

    return [
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

    features = np.array(
        prepare_features(request)
    ).reshape(1, -1)

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

    features = np.array(
        [
            prepare_features(t)
            for t in request.transactions
        ]
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