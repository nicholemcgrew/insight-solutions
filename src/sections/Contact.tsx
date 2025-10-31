import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid2 } from '@mui/material';
import axios from 'axios';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const validateForm = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('https://formspree.io/f/xpwowzwo', formData); 
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        alert('Error sending message. Please try again.');
      }
    }
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }} id="contact">
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Contact Me
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Ready to elevate your online presence with Insight Web Solutions? Get in touch!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', mx: 'auto' }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-label="Your name"
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-label="Your email"
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                aria-label="Your message"
                error={!!errors.message}
                helperText={errors.message}
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Send Message
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;