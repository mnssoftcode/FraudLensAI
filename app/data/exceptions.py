class DatasetError(Exception):
    """Base exception for dataset errors."""
    pass


class DatasetNotFoundError(DatasetError):
    """Raised when dataset file does not exist."""
    pass


class InvalidDatasetError(DatasetError):
    """Raised when dataset is invalid."""
    pass