class DatasetSummary:

    @staticmethod
    def generate(df):

        fraud = int(df["Class"].sum())
        normal = int((df["Class"] == 0).sum())

        fraud_percent = round(
            fraud / len(df) * 100,
            3
        )

        normal_percent = round(
            normal / len(df) * 100,
            3
        )

        return {
            "rows": len(df),
            "columns": len(df.columns),
            "memory_mb": round(
                df.memory_usage(deep=True).sum() / 1024**2,
                2,
            ),
            "fraud_cases": fraud,
            "normal_cases": normal,
            "fraud_percentage": fraud_percent,
            "normal_percentage": normal_percent,
        }