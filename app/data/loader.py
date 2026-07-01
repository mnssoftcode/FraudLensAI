from pathlib import Path

import pandas as pd

from app.data.exceptions import DatasetNotFoundError
from app.data.validator import DatasetValidator
from app.utils.logger import logger


class DataLoader:

    def __init__(self, file_path: str):
        self.file_path = Path(file_path)

    def load(self):

        logger.info("Loading dataset...")

        if not self.file_path.exists():
            raise DatasetNotFoundError(
                f"{self.file_path} not found."
            )

        if self.file_path.suffix != ".csv":
            raise DatasetNotFoundError(
                "Only CSV datasets are supported."
            )

        df = pd.read_csv(self.file_path)

        DatasetValidator.validate(df)

        logger.info("Dataset loaded successfully.")

        return df