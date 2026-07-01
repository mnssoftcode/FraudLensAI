from pathlib import Path

import joblib
from sklearn.preprocessing import StandardScaler


class FeatureScaler:

    def __init__(self):

        self.scaler = StandardScaler()

    def fit_transform(self, X_train):

        X = self.scaler.fit_transform(X_train)

        output = Path("saved_models")

        output.mkdir(
            parents=True,
            exist_ok=True,
        )

        joblib.dump(
            self.scaler,
            output / "scaler.pkl",
        )

        return X

    def transform(self, X_test):

        return self.scaler.transform(X_test)