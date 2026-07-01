from app.feature_engineering.split import DataSplitter
from app.feature_engineering.scaling import FeatureScaler


class FeaturePipeline:

    def __init__(self):
        self.scaler = FeatureScaler()

    def process(self, df):

        (
            X_train,
            X_test,
            y_train,
            y_test,
        ) = DataSplitter.split(df)

        X_train_scaled = self.scaler.fit_transform(
            X_train
        )

        X_test_scaled = self.scaler.transform(
            X_test
        )

        return {
            "X_train": X_train_scaled,
            "X_test": X_test_scaled,
            "y_train": y_train,
            "y_test": y_test,
            "scaler": self.scaler,
        }