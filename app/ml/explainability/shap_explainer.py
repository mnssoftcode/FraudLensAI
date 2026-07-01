from pathlib import Path

import matplotlib.pyplot as plt
import shap


class SHAPExplainer:

    def generate(self, model, X_test):

        explainer = shap.TreeExplainer(model)

        shap_values = explainer.shap_values(X_test)

        output = Path("reports/explainability")
        output.mkdir(parents=True, exist_ok=True)

        plt.figure()

        shap.summary_plot(
            shap_values,
            X_test,
            show=False,
        )

        plt.savefig(
            output / "summary_plot.png",
            dpi=300,
            bbox_inches="tight",
        )

        plt.close()

        return str(output / "summary_plot.png")