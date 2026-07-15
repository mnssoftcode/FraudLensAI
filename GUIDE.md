# FraudLens AI — Bank Integration Guide

**For:** Backend Developer / Systems Integration Team  
**Base URL (Prod):** `https://your-deployed-domain.com`  
**Base URL (Local Test):** `http://localhost:8000`  
**Auth:** None currently (recommend adding API key before production)  
**Format:** All requests/responses are `application/json`

---

## Overview: Which APIs to Use

| API Endpoint | Use Case | Priority |
|---|---|---|
| `POST /predict/` | **Real-time check** — single transaction at payment time | ⭐ **Primary** |
| `POST /predict/batch` | **Bulk check** — multiple transactions in one call | ⭐ **Primary** |
| `POST /predict/csv` | **Batch file upload** — nightly reconciliation runs | Secondary |
| `GET /health/` | **Health check** — before sending requests | Required |
| `GET /model/info` | **Model metadata** — for audit/compliance logging | Optional |

> **For real-time card transactions:** Use `POST /predict/` (response in < 100ms)  
> **For end-of-day batch processing:** Use `POST /predict/batch` or `POST /predict/csv`

---

## Step 1 — Health Check (Always Do This First)

Before sending any transaction data, verify the service is online.

### Request
```http
GET /health/
```

### Response
```json
{
    "status": "healthy",
    "model_loaded": true,
    "scaler_loaded": true,
    "app": "FraudLens AI",
    "version": "1.0.0"
}
```

**Logic:** If `status != "healthy"` or `model_loaded != true`, do NOT send transactions — fall back to your existing fraud rules.

---

## API 1 — Real-Time Single Transaction Check

> Use this at the payment gateway level. Call this API **before** approving any card transaction.

### Request
```http
POST /predict/
Content-Type: application/json
```

```json
{
    "Time": 0,
    "V1":  -1.3598071,
    "V2":  -0.0727812,
    "V3":   2.5363467,
    "V4":   1.3781552,
    "V5":  -0.3383208,
    "V6":   0.4623878,
    "V7":   0.2395986,
    "V8":   0.0986979,
    "V9":   0.3637870,
    "V10":  0.0907942,
    "V11": -0.5516000,
    "V12": -0.6178009,
    "V13": -0.9913899,
    "V14": -0.3111694,
    "V15":  1.4681770,
    "V16": -0.4704005,
    "V17":  0.2079712,
    "V18":  0.0257907,
    "V19":  0.4039930,
    "V20":  0.2514121,
    "V21": -0.0183068,
    "V22":  0.2778376,
    "V23": -0.1104739,
    "V24":  0.0669281,
    "V25":  0.1285394,
    "V26": -0.1891148,
    "V27":  0.1335584,
    "V28": -0.0210531,
    "Amount": 149.62
}
```

### Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `Time` | float | Optional (default: `0.0`) | Seconds since first transaction in the dataset |
| `V1`–`V28` | float | **Required** | PCA-transformed features (privacy-preserving) |
| `Amount` | float | **Required** | Transaction amount in the original currency |

> **Note on V1–V28:** These are PCA (Principal Component Analysis) components derived from the original transaction features. Your transaction processor must transform raw features to PCA space using the same encoder the model was trained with. Contact the AI team for the PCA transformation pipeline.

### Response
```json
{
    "prediction": "Normal",
    "probability": 0.0001
}
```

| Field | Type | Values | Description |
|---|---|---|---|
| `prediction` | string | `"Fraud"` or `"Normal"` | Model's classification |
| `probability` | float | `0.0` – `1.0` | Confidence that the transaction is fraud |

### Decision Logic for Your System
```
if prediction == "Fraud":
    → Block transaction immediately
    → Flag for manual review queue
    → Send OTP verification to customer
    
elif probability > 0.5 and prediction == "Normal":
    → Allow but flag as "suspicious"
    → Increase monitoring on this card
    
else:
    → Allow transaction normally
```

---

## API 2 — Batch Transaction Check (Multiple at Once)

> Use this for processing a list of transactions in one call (e.g., a daily batch job or when analyzing a card's recent activity).

### Request
```http
POST /predict/batch
Content-Type: application/json
```

```json
{
    "transactions": [
        {
            "Time": 0,
            "V1": -1.3598071,
            "V2": -0.0727812,
            "V3": 2.5363467,
            "V4": 1.3781552,
            "V5": -0.3383208,
            "V6": 0.4623878,
            "V7": 0.2395986,
            "V8": 0.0986979,
            "V9": 0.3637870,
            "V10": 0.0907942,
            "V11": -0.5516000,
            "V12": -0.6178009,
            "V13": -0.9913899,
            "V14": -0.3111694,
            "V15": 1.4681770,
            "V16": -0.4704005,
            "V17": 0.2079712,
            "V18": 0.0257907,
            "V19": 0.4039930,
            "V20": 0.2514121,
            "V21": -0.0183068,
            "V22": 0.2778376,
            "V23": -0.1104739,
            "V24": 0.0669281,
            "V25": 0.1285394,
            "V26": -0.1891148,
            "V27": 0.1335584,
            "V28": -0.0210531,
            "Amount": 149.62
        },
        {
            "Time": 1,
            "V1": -4.7219, "V2": 3.1211, "V3": -4.0721, "V4": 4.3412,
            "V5": -1.3397, "V6": 0.2189, "V7": 0.6907, "V8": -0.0722,
            "V9": -0.2965, "V10": -1.5675, "V11": 1.6298, "V12": 1.4884,
            "V13": -0.4267, "V14": -7.8593, "V15": 0.5177, "V16": -0.3392,
            "V17": 0.1154, "V18": 0.0341, "V19": 0.1891, "V20": 0.1475,
            "V21": 0.0071, "V22": 0.1078, "V23": -0.0748, "V24": 0.0327,
            "V25": 0.0427, "V26": -0.0906, "V27": 0.0493, "V28": -0.0116,
            "Amount": 1.00
        }
    ]
}
```

### Response
```json
[
    {
        "prediction": "Normal",
        "probability": 0.0001
    },
    {
        "prediction": "Fraud",
        "probability": 0.9998
    }
]
```

> The response array is in the **same order** as the input transactions array. Map by index.

---

## API 3 — CSV Batch File Upload (Nightly Processing)

> Use this for end-of-day batch reconciliation. Upload a CSV file of all transactions and get back a labeled report.

### Request
```http
POST /predict/csv
Content-Type: multipart/form-data
```

The CSV file must have these columns:

| Columns | Required |
|---|---|
| `V1`, `V2`, ..., `V28` | ✅ Yes |
| `Amount` | ✅ Yes |
| `Time` | ❌ Optional (auto-filled with 0 if missing) |

### Response
```json
{
    "summary": {
        "total_transactions": 1000,
        "fraud_detected": 3,
        "safe_transactions": 997,
        "fraud_rate": 0.30
    },
    "predictions": [
        {
            "V1": -1.3598071,
            "Amount": 149.62,
            "Prediction": 0,
            "Label": "Normal",
            "Fraud Probability": 0.0001
        },
        {
            "V1": -4.7219,
            "Amount": 1.00,
            "Prediction": 1,
            "Label": "Fraud",
            "Fraud Probability": 0.9998
        }
    ],
    "download": "/download"
}
```

### Download the Report
```http
GET /download
```
Returns the full predictions as a downloadable `.csv` file.

---

## Code Examples

### Python (requests)
```python
import requests

BASE_URL = "https://your-deployed-domain.com"

def check_transaction(transaction_data: dict) -> dict:
    """Check a single transaction for fraud."""
    
    # 1. Health check first
    health = requests.get(f"{BASE_URL}/health/").json()
    if health["status"] != "healthy":
        raise Exception("FraudLens service is not available")

    # 2. Predict
    response = requests.post(
        f"{BASE_URL}/predict/",
        json=transaction_data,
        timeout=5  # 5 second timeout for real-time use
    )
    response.raise_for_status()
    result = response.json()

    # 3. Apply bank decision logic
    if result["prediction"] == "Fraud":
        return {"action": "BLOCK", "confidence": result["probability"]}
    elif result["probability"] > 0.5:
        return {"action": "FLAG", "confidence": result["probability"]}
    else:
        return {"action": "ALLOW", "confidence": result["probability"]}


# Example usage
txn = {
    "Time": 0, "Amount": 250.00,
    "V1": -1.36, "V2": -0.07, "V3": 2.54,
    # ... rest of V1-V28 from your PCA pipeline
}
decision = check_transaction(txn)
print(decision)  # {"action": "ALLOW", "confidence": 0.0001}
```

### JavaScript / Node.js (fetch)
```javascript
const BASE_URL = "https://your-deployed-domain.com";

async function checkTransaction(transactionData) {
    // Health check
    const health = await fetch(`${BASE_URL}/health/`).then(r => r.json());
    if (health.status !== "healthy") throw new Error("FraudLens unavailable");

    // Predict
    const response = await fetch(`${BASE_URL}/predict/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
        signal: AbortSignal.timeout(5000)  // 5s timeout
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const result = await response.json();

    // Decision
    if (result.prediction === "Fraud") return { action: "BLOCK", ...result };
    if (result.probability > 0.5) return { action: "FLAG", ...result };
    return { action: "ALLOW", ...result };
}
```

### Java (Spring Boot / OkHttp)
```java
import okhttp3.*;
import com.google.gson.*;

public class FraudLensClient {
    private static final String BASE_URL = "https://your-deployed-domain.com";
    private final OkHttpClient client = new OkHttpClient.Builder()
        .connectTimeout(3, TimeUnit.SECONDS)
        .readTimeout(5, TimeUnit.SECONDS)
        .build();
    private final Gson gson = new Gson();

    public FraudResult checkTransaction(TransactionPayload txn) throws IOException {
        String json = gson.toJson(txn);
        RequestBody body = RequestBody.create(json, MediaType.get("application/json"));
        
        Request request = new Request.Builder()
            .url(BASE_URL + "/predict/")
            .post(body)
            .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) throw new IOException("API error: " + response.code());
            return gson.fromJson(response.body().string(), FraudResult.class);
        }
    }
}
```

### cURL (for Testing)
```bash
# Single transaction
curl -X POST https://your-deployed-domain.com/predict/ \
  -H "Content-Type: application/json" \
  -d '{"Time":0,"V1":-1.36,"V2":-0.07,"V3":2.54,"V4":1.38,"V5":-0.34,"V6":0.46,"V7":0.24,"V8":0.10,"V9":0.36,"V10":0.09,"V11":-0.55,"V12":-0.62,"V13":-0.99,"V14":-0.31,"V15":1.47,"V16":-0.47,"V17":0.21,"V18":0.03,"V19":0.40,"V20":0.25,"V21":-0.02,"V22":0.28,"V23":-0.11,"V24":0.07,"V25":0.13,"V26":-0.19,"V27":0.13,"V28":-0.02,"Amount":149.62}'

# Health check
curl https://your-deployed-domain.com/health/

# CSV batch upload
curl -X POST https://your-deployed-domain.com/predict/csv \
  -F "file=@transactions.csv"
```

---

## Error Handling

| HTTP Status | Meaning | What to do |
|---|---|---|
| `200 OK` | Success | Use the response normally |
| `400 Bad Request` | Missing or wrong fields | Check your JSON fields — likely a missing V column |
| `422 Unprocessable Entity` | Validation error | Check field types — all V fields must be `float` |
| `500 Internal Server Error` | Model failed to load | Retry once; if persistent, contact AI team |
| Timeout | Network issue | Fall back to your existing rule-based system |

```json
// Example 400 error response
{
    "detail": "Missing required columns: ['V14', 'V22']. Expected: V1–V28, Amount (Time is optional)."
}
```

---

## Model Performance (For Compliance/Audit)

Fetch via `GET /model/info` — returns full benchmark statistics.

| Model | Accuracy | Precision | Recall | F1 | ROC AUC |
|---|---|---|---|---|---|
| **XGBoost (Active)** | **99.96%** | **95.06%** | **78.57%** | **86.03%** | **97.64%** |
| LightGBM | 99.95% | 89.01% | 82.65% | 85.71% | 96.63% |
| Random Forest | 99.95% | 92.77% | 78.57% | 85.08% | 96.13% |
| Logistic Regression | 97.55% | 6.10% | 91.84% | 11.44% | 97.21% |

**Confusion Matrix (XGBoost, on 56,962 test transactions):**
- ✅ True Normal: 56,860
- ✅ True Fraud (caught): 77
- ⚠️ False Positive (blocked legit): 4
- ⚠️ False Negative (missed fraud): 21

---

## Production Checklist (Before Going Live)

- [ ] **Deploy** the FastAPI service to a private server or cloud (AWS/GCP/Azure)
- [ ] **Add API Key authentication** — add `X-API-Key` header validation in `main.py`
- [ ] **Enable HTTPS** — never send transaction data over HTTP
- [ ] **Set firewall rules** — only allow your bank's IP range to call the API
- [ ] **Add rate limiting** — prevent abuse (e.g., max 1000 req/min per client)
- [ ] **Log all requests** — store transaction_id + prediction + probability for audit trail
- [ ] **Set timeout to 3–5 seconds** — if API doesn't respond in time, fall back to rule-based system
- [ ] **Monitor `/health/` endpoint** — integrate with your monitoring system (Datadog, etc.)
- [ ] **Test with `fraudlens_test_scenarios.csv`** — verify integration before going live

---

## Swagger UI (Interactive Testing)
