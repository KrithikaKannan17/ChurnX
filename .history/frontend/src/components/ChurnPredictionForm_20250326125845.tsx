import React, { useState } from 'react';
import {
  Paper,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import axios from 'axios';

interface PredictionResponse {
  customer_id: string;
  churn_probability: number;
  prediction: boolean;
  confidence: number;
}

const ChurnPredictionForm = () => {
  const [formData, setFormData] = useState({
    customer_id: '',
    age: '',
    gender: '',
    credit_score: '',
    balance: '',
    tenure: '',
    products_number: '',
    credit_card: '',
    active_member: '',
    estimated_salary: '',
  });

  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<PredictionResponse>(
        'http://localhost:8000/predict',
        formData
      );
      setPrediction(response.data);
    } catch (err) {
      setError('Error making prediction. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Information
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Customer ID"
              name="customer_id"
              value={formData.customer_id}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Credit Score"
              name="credit_score"
              type="number"
              value={formData.credit_score}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Balance"
              name="balance"
              type="number"
              value={formData.balance}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Tenure (years)"
              name="tenure"
              type="number"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Products"
              name="products_number"
              type="number"
              value={formData.products_number}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Credit Card (0/1)"
              name="credit_card"
              type="number"
              value={formData.credit_card}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Active Member (0/1)"
              name="active_member"
              type="number"
              value={formData.active_member}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12} sm={6}>
            <TextField
              fullWidth
              label="Estimated Salary"
              name="estimated_salary"
              type="number"
              value={formData.estimated_salary}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Predict Churn'}
            </Button>
          </Grid>
        </Grid>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {prediction && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Prediction Results
          </Typography>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <Paper sx={{ p: 2, bgcolor: prediction.prediction ? '#ffebee' : '#e8f5e9' }}>
                <Typography variant="subtitle1">
                  Churn Prediction: {prediction.prediction ? 'Likely to Churn' : 'Likely to Stay'}
                </Typography>
                <Typography variant="body2">
                  Probability: {(prediction.churn_probability * 100).toFixed(2)}%
                </Typography>
                <Typography variant="body2">
                  Confidence: {(prediction.confidence * 100).toFixed(2)}%
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
};

export default ChurnPredictionForm; 