import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib
import os

def load_and_preprocess_data():
    # For this example, we'll create synthetic data
    # In a real application, you would load your actual dataset
    np.random.seed(42)
    n_samples = 10000
    
    data = {
        'age': np.random.randint(18, 80, n_samples),
        'credit_score': np.random.randint(300, 850, n_samples),
        'balance': np.random.uniform(0, 250000, n_samples),
        'tenure': np.random.randint(0, 10, n_samples),
        'products_number': np.random.randint(1, 5, n_samples),
        'credit_card': np.random.randint(0, 2, n_samples),
        'active_member': np.random.randint(0, 2, n_samples),
        'estimated_salary': np.random.uniform(10000, 200000, n_samples),
        'churn': np.random.randint(0, 2, n_samples)
    }
    
    df = pd.DataFrame(data)
    return df

def train_model():
    # Create models directory if it doesn't exist
    os.makedirs('backend/models', exist_ok=True)
    
    # Load and preprocess data
    df = load_and_preprocess_data()
    
    # Prepare features and target
    features = [
        'age', 'credit_score', 'balance', 'tenure',
        'products_number', 'credit_card', 'active_member',
        'estimated_salary'
    ]
    X = df[features]
    y = df['churn']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    # Scale the features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train the model
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        random_state=42
    )
    model.fit(X_train_scaled, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test_scaled)
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    # Save the model and scaler
    joblib.dump(model, 'backend/models/churn_model.joblib')
    joblib.dump(scaler, 'backend/models/scaler.joblib')
    
    print("\nModel and scaler saved successfully!")

if __name__ == "__main__":
    train_model() 