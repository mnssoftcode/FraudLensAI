from lightgbm import LGBMClassifier

from app.ml.training.base_trainer import BaseTrainer


class LightGBMTrainer(BaseTrainer):

    def __init__(self):

        self.model = LGBMClassifier(
            n_estimators=300,
            learning_rate=0.05,
            random_state=42,
            class_weight="balanced",
        )

    def train(self, X_train, y_train):

        self.model.fit(
            X_train,
            y_train,
        )

        self.save(
            self.model,
            "lightgbm.pkl",
        )

        return self.model