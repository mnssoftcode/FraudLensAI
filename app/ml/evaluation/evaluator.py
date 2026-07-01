from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    roc_auc_score,
    confusion_matrix,
)


class ModelEvaluator:

    @staticmethod
    def evaluate(model, X_test, y_test):

        predictions = model.predict(X_test)

        probabilities = model.predict_proba(X_test)[:, 1]

        return {
            "accuracy": round(
                accuracy_score(y_test, predictions), 4
            ),
            "precision": round(
                precision_score(y_test, predictions), 4
            ),
            "recall": round(
                recall_score(y_test, predictions), 4
            ),
            "f1_score": round(
                f1_score(y_test, predictions), 4
            ),
            "roc_auc": round(
                roc_auc_score(y_test, probabilities), 4
            ),
            "confusion_matrix": confusion_matrix(
                y_test,
                predictions,
            ).tolist(),
        }