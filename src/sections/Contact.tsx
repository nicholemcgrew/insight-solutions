import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, TextField, Button, Grid2 } from '@mui/material';
import axios from 'axios';

interface ContactProps {
  selectedService?: string; // From App for pre-fill
}

const Contact: React.FC<ContactProps> = ({ selectedService }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: selectedService ? `Interested in ${selectedService}.` : '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, message: `Interested in ${selectedService}. Please provide more details.` }));
    }
  }, [selectedService]);

  // Validation and submit logic (as before)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post('https://formspree.io/f/xpwowzwo', formData); 
        setSubmitted(true);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } catch (error) {
        alert('Error sending message. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default' }} id="contact" role="region" aria-label="Contact form">
      <Container maxWidth="md">
        <Typography variant="h2" align="center" gutterBottom color="text.primary">
          Contact Me
        </Typography>
        <Typography variant="body1" align="center" gutterBottom color="text.secondary">
          Ready to elevate your online presence? Get in touch for a custom quote!
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '600px', mx: 'auto' }} noValidate>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="name-input"
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="name-error"
                error={!!errors.name}
                helperText={errors.name}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                sx={{ input: { color: 'text.primary' } }}
              />
              <div id="name-error" role="alert" aria-live="polite">
                {errors.name && <Typography variant="caption" color="error">{errors.name}</Typography>}
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="email-input"
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="email-error"
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                sx={{ input: { color: 'text.primary' } }}
              />
              <div id="email-error" role="alert" aria-live="polite">
                {errors.email && <Typography variant="caption" color="error">{errors.email}</Typography>}
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="message-input"
                label="Message"
                name="message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="message-error"
                error={!!errors.message}
                helperText={errors.message || 'Tell me about your project'}
                InputLabelProps={{ style: { color: 'text.secondary' } }}
                sx={{ textarea: { color: 'text.primary' } }}
              />
              <div id="message-error" role="alert" aria-live="polite">
                {errors.message && <Typography variant="caption" color="error">{errors.message}</Typography>}
              </div>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button type="submit" variant="contained" color="secondary" fullWidth aria-label="Send contact message">
                Send Message
              </Button>
            </Grid2>
          </Grid2>
        </Box>
        {submitted && (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1 }} role="status" aria-live="polite">
            <Typography>Thank you! Your message has been sent.</Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Contact;