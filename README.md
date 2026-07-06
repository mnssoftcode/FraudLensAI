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
3. Install runtime dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. (Optional) Install development dependencies for notebooks, testing, and tooling:
   ```bash
   pip install -r requirements-dev.txt
   ```

### Running the Application

1. Start the backend:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

2. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

If the frontend and backend are served from different origins, add a `frontend/.env` file with:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

For Railway deployment, the production URLs are:

- Frontend: `http://fraudlens-frontend-production.up.railway.app/`
- Backend: `https://fraudlensai-production.up.railway.app/`

The frontend is configured to use the backend at `https://fraudlensai-production.up.railway.app` by default when no `VITE_API_BASE_URL` is provided.

## License

MIT
