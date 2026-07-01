from sklearn.linear_model import LogisticRegression

from app.ml.training.base_trainer import BaseTrainer


class LogisticRegressionTrainer(BaseTrainer):

    def __init__(self):

        self.model = LogisticRegression(
            random_state=42,
            max_iter=1000,
            class_weight="balanced",
        )

    def train(self, X_train, y_train):

        self.model.fit(
            X_train,
            y_train,
        )

        self.save(
            self.model,
            "logistic_regression.pkl",
        )

        return self.model