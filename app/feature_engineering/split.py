from sklearn.model_selection import train_test_split


class DataSplitter:

    @staticmethod
    def split(df):

        X = df.drop(columns=["Class"])
        y = df["Class"]

        return train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42,
            stratify=y,
        )