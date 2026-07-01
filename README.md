# FraudLens-AI

An AI/ML-powered fraud detection system with explainability features and anomaly detection capabilities.

## Project Structure

- **app/**: Main application code
  - **api/**: API endpoints
  - **core/**: Core functionality
  - **data/**: Data handling and processing
  - **features/**: Feature engineering
  - **models/**: ML models
  - **services/**: Business logic services
  - **explainability/**: Model interpretability
  - **anomaly/**: Anomaly detection
  - **utils/**: Utility functions

- **datasets/**: Data storage
  - **raw/**: Raw datasets
  - **processed/**: Processed datasets

- **notebooks/**: Jupyter notebooks for exploration
- **tests/**: Unit and integration tests
- **saved_models/**: Trained model storage
- **frontend/**: Web interface

## Getting Started

### Prerequisites
- Python 3.8+
- Virtual environment (recommended)

### Installation

1. Clone the repository
2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

```bash
python main.py
```

## License

MIT
