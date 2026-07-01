from xgboost import XGBClassifier

from app.ml.training.base_trainer import BaseTrainer


class XGBoostTrainer(BaseTrainer):

    def __init__(self):

        self.model = XGBClassifier(
            n_estimators=300,
            max_depth=6,
            learning_rate=0.1,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42,
            eval_metric="logloss",
            n_jobs=-1,
        )

    def train(self, X_train, y_train):

        self.model.fit(
            X_train,
            y_train,
        )

        self.save(
            self.model,
            "xgboost.pkl",
        )

        return self.model