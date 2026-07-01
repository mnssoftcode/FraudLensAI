import json
from pathlib import Path

from app.ml.evaluation.comparator import ModelComparator
from app.ml.evaluation.evaluator import ModelEvaluator

from app.ml.training.logistic_regression import LogisticRegressionTrainer
from app.ml.training.random_forest import RandomForestTrainer
from app.ml.training.xgboost import XGBoostTrainer
from app.ml.training.lightgbm import LightGBMTrainer

from app.ml.utils.model_saver import ModelSaver
from app.ml.utils.metrics_saver import MetricsSaver

from app.utils.logger import logger


class TrainingService:

    def __init__(self):

        self.comparator = ModelComparator()

    def train_model(
        self,
        name,
        trainer,
        processed,
    ):

        model = trainer.train(
            processed["X_train"],
            processed["y_train"],
        )

        metrics = ModelEvaluator.evaluate(
            model,
            processed["X_test"],
            processed["y_test"],
        )

        self.comparator.add_result(
            name,
            metrics,
        )

        return model

    def train(self, processed):

        trained_models = {}

        logger.info("Training Logistic Regression...")
        trained_models["Logistic Regression"] = self.train_model(
            "Logistic Regression",
            LogisticRegressionTrainer(),
            processed,
        )

        logger.info("Training Random Forest...")
        trained_models["Random Forest"] = self.train_model(
            "Random Forest",
            RandomForestTrainer(),
            processed,
        )

        logger.info("Training XGBoost...")
        trained_models["XGBoost"] = self.train_model(
            "XGBoost",
            XGBoostTrainer(),
            processed,
        )

        logger.info("Training LightGBM...")
        trained_models["LightGBM"] = self.train_model(
            "LightGBM",
            LightGBMTrainer(),
            processed,
        )

        comparison = self.comparator.all_results()

        best = self.comparator.best_model()

        logger.info("Saving best model...")

        ModelSaver.save(
            trained_models[best["model"]]
        )

        MetricsSaver.save(best)

        Path("saved_models").mkdir(
            exist_ok=True
        )

        with open(
            "saved_models/metrics.json",
            "w",
        ) as f:

            json.dump(
                {
                    "comparison": comparison,
                    "best_model": best,
                },
                f,
                indent=4,
            )

        logger.info("Training completed.")

        return {

            "comparison": comparison,

            "best_model": best,

        }