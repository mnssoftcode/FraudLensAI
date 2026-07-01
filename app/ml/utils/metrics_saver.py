import json
from pathlib import Path


class MetricsSaver:

    @staticmethod
    def save(data):

        save_dir = Path("saved_models")
        save_dir.mkdir(exist_ok=True)

        path = save_dir / "metrics.json"

        with open(path, "w") as f:
            json.dump(data, f, indent=4)