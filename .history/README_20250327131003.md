# Customer Churn Prediction Application

A full-stack application for predicting customer churn in banking and insurance sectors using machine learning.

## Features

- Machine learning model for churn prediction
- Beautiful animated UI with wave background
- Real-time predictions
- Responsive design
- FastAPI backend
- React frontend with Material-UI

## Tech Stack

- Backend: Python, FastAPI, scikit-learn
- Frontend: React, TypeScript, Material-UI, Framer Motion
- Machine Learning: Random Forest Classifier

## Setup Instructions

### Prerequisites

- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup

1. Create and activate virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Train the model:
```bash
python backend/models/train_model.py
```

4. Start the backend server:
```bash
cd backend
uvicorn app.main:app --reload
```

### Frontend Setup

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## Deployment

### Backend Deployment

1. Create a new repository on GitHub
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

3. Deploy the backend to a cloud service (e.g., Heroku, DigitalOcean, AWS)

### Frontend Deployment

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the build folder to a static hosting service (e.g., GitHub Pages, Netlify, Vercel)

## Environment Variables

Create a `.env` file in the backend directory with:
```
MODEL_PATH=backend/models/churn_model.joblib
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 