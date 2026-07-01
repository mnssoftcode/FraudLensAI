from abc import ABC, abstractmethod
from pathlib import Path

import joblib


class BaseTrainer(ABC):

    @abstractmethod
    def train(self, X_train, y_train):
        pass

    def save(self, model, filename):

        output = Path("saved_models")

        output.mkdir(
            parents=True,
            exist_ok=True,
        )

        joblib.dump(
            model,
            output / filename,
        )