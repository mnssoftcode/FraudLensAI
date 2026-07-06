import json
from pathlib import Path

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_health_endpoint():
    response = client.get("/health/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"


def test_metrics_endpoint():
    response = client.get("/metrics/")
    assert response.status_code == 200
    data = response.json()
    assert "comparison" in data
    assert "best_model" in data
