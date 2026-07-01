from sklearn.ensemble import RandomForestClassifier

from app.ml.training.base_trainer import BaseTrainer


class RandomForestTrainer(BaseTrainer):

    def __init__(self):

        self.model = RandomForestClassifier(
            n_estimators=200,
            random_state=42,
            class_weight="balanced",
            n_jobs=-1,
        )

    def train(self, X_train, y_train):

        self.model.fit(
            X_train,
            y_train,
        )

        self.save(
            self.model,
            "random_forest.pkl",
        )

        return self.model