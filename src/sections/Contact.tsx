// src/sections/Contact.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, TextField, Button, Grid2 } from '@mui/material';
import axios from 'axios';

interface ContactProps {
  selectedService?: string;
}

const Contact = ({ selectedService }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: selectedService ? `Interested in ${selectedService}. Please provide more details.` : ''
  });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Focus first input on mount
  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  // Pre-fill from URL on mount
  useEffect(() => {
    const url = new URL(window.location.href);
    const service = url.searchParams.get("service");
    if (service) {
      setFormData(prev => ({
        ...prev,
        message: `Interested in ${decodeURIComponent(service)}. Please provide more details.`
      }));
      // Clean URL
      window.history.replaceState({}, "", "/#contact");
    }
  }, []);

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
      newErrors.email = 'Please enter a valid email';
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
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (error) {
        alert('Error sending message. Please try again.');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <Box
      component="main"
      id="main-content"
      tabIndex={-1}
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: 'background.default',
      }}
      itemScope
      itemType="https://schema.org/ContactPage"
    >
      <Container maxWidth="md">
        <Box
          component="section"
          aria-labelledby="contact-heading"
          sx={{ textAlign: 'center' }}
        >
          <Typography
            id="contact-heading"
            variant="h2"
            gutterBottom
            color="text.primary"
            sx={{ fontWeight: 700, mb: 3 }}
            itemProp="name"
          >
            Contact Me
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth="600px"
            mx="auto"
            paragraph
            itemProp="description"
          >
            Ready to elevate your online presence? Get in touch for a custom quote!
          </Typography>
        </Box>

        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            maxWidth: { xs: '100%', sm: 600 },
            mx: 'auto',
            p: { xs: 2, sm: 0 },
          }}
          itemProp="potentialAction"
          itemScope
          itemType="https://schema.org/Action"
        >
          <Grid2 container spacing={3}>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                inputRef={nameInputRef}
                fullWidth
                id="name-input"
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="name-error"
                error={!!errors.name}
                helperText={errors.name}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: 'secondary.main' }
                  }
                }}
              />
              {errors.name && (
                <Typography id="name-error" role="alert" color="error" variant="caption" sx={{ ml: 2 }}>
                  {errors.name}
                </Typography>
              )}
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="email-input"
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="email-error"
                error={!!errors.email}
                helperText={errors.email}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: 'secondary.main' }
                  }
                }}
              />
              {errors.email && (
                <Typography id="email-error" role="alert" color="error" variant="caption" sx={{ ml: 2 }}>
                  {errors.email}
                </Typography>
              )}
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="message-input"
                label="Your Message"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                aria-required="true"
                aria-describedby="message-error"
                error={!!errors.message}
                helperText={errors.message || 'Tell me about your project'}
                InputLabelProps={{ shrink: true }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: 'secondary.main' }
                  }
                }}
              />
              {errors.message && (
                <Typography id="message-error" role="alert" color="error" variant="caption" sx={{ ml: 2 }}>
                  {errors.message}
                </Typography>
              )}
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                aria-label="Send your message"
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': { transform: 'translateY(-2px)' },
                }}
              >
                Send Message
              </Button>
            </Grid2>
          </Grid2>

          {/* Success Message */}
          {submitted && (
            <Box
              role="status"
              aria-live="polite"
              sx={{
                mt: 3,
                p: 3,
                bgcolor: 'success.light',
                color: 'success.contrastText',
                borderRadius: 2,
                textAlign: 'center',
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" fontWeight={600}>
                Thank You!
              </Typography>
              <Typography>
                Your message has been sent successfully. I’ll get back to you within 24 hours.
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;