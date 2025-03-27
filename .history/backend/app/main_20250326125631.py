from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
from typing import List, Optional

app = FastAPI(
    title="Customer Churn Prediction API",
    description="API for predicting customer churn in banking and insurance sectors",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the input data model
class CustomerData(BaseModel):
    customer_id: str
    age: int
    gender: str
    credit_score: float
    balance: float
    tenure: int
    products_number: int
    credit_card: int
    active_member: int
    estimated_salary: float
    satisfaction_score: Optional[float] = None
    last_interaction: Optional[str] = None

class PredictionResponse(BaseModel):
    customer_id: str
    churn_probability: float
    prediction: bool
    confidence: float

# Load the model (you'll need to train and save it first)
try:
    model = joblib.load("backend/models/churn_model.joblib")
except:
    model = None

@app.get("/")
async def root():
    return {"message": "Welcome to the Customer Churn Prediction API"}

@app.post("/predict", response_model=PredictionResponse)
async def predict_churn(customer: CustomerData):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    # Prepare features for prediction
    features = [
        customer.age,
        customer.credit_score,
        customer.balance,
        customer.tenure,
        customer.products_number,
        customer.credit_card,
        customer.active_member,
        customer.estimated_salary
    ]
    
    # Make prediction
    features_array = np.array(features).reshape(1, -1)
    probability = model.predict_proba(features_array)[0][1]
    prediction = probability > 0.5
    
    return PredictionResponse(
        customer_id=customer.customer_id,
        churn_probability=float(probability),
        prediction=bool(prediction),
        confidence=float(max(probability, 1 - probability))
    )

@app.get("/health")
async def health_check():
    return {"status": "healthy", "model_loaded": model is not None} 