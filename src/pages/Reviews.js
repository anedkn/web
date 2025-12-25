import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  Alert,
  Rating
} from '@mui/material';
import {
  Send,
  CheckCircle,
  Star,
  RateReview
} from '@mui/icons-material';

const Reviews = () => {
  const [formData, setFormData] = useState({
    name: '',
    rating: 5,
    review: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRatingChange = (event, newValue) => {
    setFormData({
      ...formData,
      rating: newValue
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отзыв отправлен:', formData);
    setSubmitStatus('success');
    setFormData({ name: '', rating: 5, review: '' });
    
    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 4, mb: 3 }}>
        <RateReview sx={{ mr: 1, verticalAlign: 'middle' }} />
        Оставить отзыв
      </Typography>

      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Поделитесь вашим мнением
            </Typography>
            
            {submitStatus === 'success' && (
              <Alert 
                severity="success" 
                icon={<CheckCircle />}
                sx={{ mb: 3 }}
              >
                Спасибо за ваш отзыв!
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Ваше имя"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body1" sx={{ mr: 2 }}>
                      Ваша оценка:
                    </Typography>
                    <Rating
                      name="rating"
                      value={formData.rating}
                      onChange={handleRatingChange}
                      precision={1}
                      icon={<Star fontSize="inherit" />}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Текст отзыва"
                    name="review"
                    value={formData.review}
                    onChange={handleChange}
                    required
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Расскажите о вашем опыте..."
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Send />}
                    fullWidth
                  >
                    Отправить отзыв
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reviews;