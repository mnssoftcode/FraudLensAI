from app.data.exceptions import InvalidDatasetError
from app.data.schema import EXPECTED_COLUMNS
from app.utils.logger import logger


class DatasetValidator:

    @staticmethod
    def validate(df):

        DatasetValidator.validate_columns(df)
        DatasetValidator.validate_missing(df)
        DatasetValidator.validate_duplicates(df)
        DatasetValidator.validate_target(df)

    @staticmethod
    def validate_columns(df):

        missing = [
            col
            for col in EXPECTED_COLUMNS
            if col not in df.columns
        ]

        if missing:
            raise InvalidDatasetError(
                f"Missing columns: {missing}"
            )

        logger.info("Columns validated.")

    @staticmethod
    def validate_missing(df):

        missing = df.isnull().sum().sum()

        if missing > 0:
            raise InvalidDatasetError(
                f"Dataset contains {missing} missing values."
            )

        logger.info("No missing values.")

    @staticmethod
    def validate_duplicates(df):

        duplicates = df.duplicated().sum()

        logger.info(
            f"Duplicate rows: {duplicates}"
        )

    @staticmethod
    def validate_target(df):

        values = sorted(df["Class"].unique())

        if values != [0, 1]:
            raise InvalidDatasetError(
                "Target column must contain only 0 and 1."
            )

        logger.info("Target validated.")