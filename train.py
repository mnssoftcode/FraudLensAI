from app.core.config import settings

from app.data.loader import DataLoader
from app.data.summary import DatasetSummary

from app.eda.analyzer import EDA
from app.eda.report_generator import ReportGenerator

from app.feature_engineering.pipeline import FeaturePipeline

from app.services.training_service import TrainingService


print("Loading dataset...")

loader = DataLoader(settings.DATASET_PATH)

df = loader.load()

print("Feature engineering...")

pipeline = FeaturePipeline()

processed = pipeline.process(df)

print("Training models...")

training = TrainingService()

training_result = training.train(processed)

print("Generating reports...")

eda = EDA(df)

overview = eda.dataset_overview()

summary = DatasetSummary.generate(df)

report = ReportGenerator()

report.generate(
    overview=overview,
    summary=summary,
)

print()

print("Training Complete")

print(training_result["best_model"])