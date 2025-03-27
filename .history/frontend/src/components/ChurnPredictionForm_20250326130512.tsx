import React, { useState } from 'react';
import {
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Stack,
  useTheme,
  alpha,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useSpring, animated } from '@react-spring/web';

interface PredictionResponse {
  customer_id: string;
  churn_probability: number;
  prediction: boolean;
  confidence: number;
}

const MotionPaper = motion(Paper);

const ChurnPredictionForm = () => {
  const theme = useTheme();
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

  const formSpring = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 300, friction: 20 },
  });

  const resultSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: { tension: 300, friction: 20 },
    immediate: !prediction,
  });

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
    <animated.div style={formSpring}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4,
          background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.background.paper, 0.95)} 100%)`,
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 4,
          }}
        >
          Customer Churn Prediction
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                fullWidth
                label="Customer ID"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                fullWidth
                label="Credit Score"
                name="credit_score"
                type="number"
                value={formData.credit_score}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Balance"
                name="balance"
                type="number"
                value={formData.balance}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                fullWidth
                label="Tenure (years)"
                name="tenure"
                type="number"
                value={formData.tenure}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Number of Products"
                name="products_number"
                type="number"
                value={formData.products_number}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <TextField
                fullWidth
                label="Credit Card (0/1)"
                name="credit_card"
                type="number"
                value={formData.credit_card}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Active Member (0/1)"
                name="active_member"
                type="number"
                value={formData.active_member}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>

            <TextField
              fullWidth
              label="Estimated Salary"
              name="estimated_salary"
              type="number"
              value={formData.estimated_salary}
              onChange={handleChange}
              required
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
              sx={{
                py: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Predict Churn'
              )}
            </Button>
          </Stack>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {prediction && (
            <animated.div style={resultSpring}>
              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Prediction Results
                </Typography>
                <MotionPaper
                  sx={{
                    p: 3,
                    background: prediction.prediction
                      ? `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`
                      : `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
                    border: `1px solid ${alpha(
                      prediction.prediction ? theme.palette.error.main : theme.palette.success.main,
                      0.2
                    )}`,
                    borderRadius: 2,
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography variant="h6" gutterBottom>
                    Churn Prediction:{' '}
                    <span
                      style={{
                        color: prediction.prediction
                          ? theme.palette.error.main
                          : theme.palette.success.main,
                        fontWeight: 'bold',
                      }}
                    >
                      {prediction.prediction ? 'Likely to Churn' : 'Likely to Stay'}
                    </span>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Probability:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {(prediction.churn_probability * 100).toFixed(2)}%
                    </span>
                  </Typography>
                  <Typography variant="body1">
                    Confidence:{' '}
                    <span style={{ fontWeight: 'bold' }}>
                      {(prediction.confidence * 100).toFixed(2)}%
                    </span>
                  </Typography>
                </MotionPaper>
              </Box>
            </animated.div>
          )}
        </AnimatePresence>
      </Paper>
    </animated.div>
  );
};

export default ChurnPredictionForm; 