from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()


BASE_DIR = Path(__file__).resolve().parent.parent.parent


class Settings:

    APP_NAME = os.getenv(
        "APP_NAME",
        "FraudLens AI",
    )

    APP_VERSION = os.getenv(
        "APP_VERSION",
        "1.0.0",
    )

    MODEL_PATH = Path(
        os.getenv(
            "MODEL_PATH",
            BASE_DIR / "saved_models" / "best_model.pkl",
        )
    )

    SCALER_PATH = Path(
        os.getenv(
            "SCALER_PATH",
            BASE_DIR / "saved_models" / "scaler.pkl",
        )
    )

    DATASET_PATH = Path(
        os.getenv(
            "DATASET_PATH",
            BASE_DIR / "datasets" / "raw" / "creditcard.csv",
        )
    )

    LOG_LEVEL = os.getenv(
        "LOG_LEVEL",
        "INFO",
    )


settings = Settings()