from pathlib import Path
import joblib


class ModelSaver:

    @staticmethod
    def save(model):

        output = Path("saved_models")
        output.mkdir(parents=True, exist_ok=True)

        joblib.dump(
            model,
            output / "best_model.pkl",
        )