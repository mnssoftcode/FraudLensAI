import json
from pathlib import Path


class MetricsSaver:

    @staticmethod
    def save(metrics):

        output = Path("saved_models")

        output.mkdir(
            parents=True,
            exist_ok=True,
        )

        with open(
            output / "metrics.json",
            "w",
        ) as f:

            json.dump(
                metrics,
                f,
                indent=4,
            )