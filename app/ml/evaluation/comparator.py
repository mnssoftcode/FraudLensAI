class ModelComparator:

    def __init__(self):
        self.results = []

    def add_result(
        self,
        model_name,
        metrics,
    ):

        self.results.append({
            "model": model_name,
            **metrics,
        })

    def best_model(self):

        return max(
            self.results,
            key=lambda x: x["f1_score"],
        )

    def all_results(self):

        return self.results