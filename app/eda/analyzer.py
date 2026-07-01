import pandas as pd


class EDA:

    def __init__(self, df: pd.DataFrame):
        self.df = df

    def dataset_overview(self):

        return {
            "rows": self.df.shape[0],
            "columns": self.df.shape[1],
            "missing_values": int(
                self.df.isnull().sum().sum()
            ),
            "duplicate_rows": int(
                self.df.duplicated().sum()
            ),
            "memory_mb": round(
                self.df.memory_usage(deep=True).sum() / 1024**2,
                2,
            ),
        }