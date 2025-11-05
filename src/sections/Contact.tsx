// src/sections/Contact.tsx
import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Typography, TextField, Button, Grid2 } from "@mui/material";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Handle CTA + scroll to TOP of section
  useEffect(() => {
    const url = new URL(window.location.href);
    const cta = url.searchParams.get("cta");
    const service = url.searchParams.get("service");
    const hash = window.location.hash;

    const goToContact = cta === "true" || hash === "#contact";

    if (goToContact) {
      const contact = document.getElementById("contact");
      if (contact) {
        // SCROLL TO TOP OF SECTION (not middle)
        const yOffset = -90; // Height of sticky navbar
        const y = contact.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }

      // Focus name input (prevent scroll)
      nameInputRef.current?.focus({ preventScroll: true });

      // Pre-fill service
      if (service) {
        setFormData(prev => ({
          ...prev,
          message: `Interested in ${decodeURIComponent(service)}. Please provide more details.`,
        }));
      }

      // Clean URL
      if (cta === "true") {
        window.history.replaceState({}, "", "/");
      }
    }
  }, []);

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) (newErrors.name = "Name is required"), (isValid = false);
    if (!formData.email.trim()) (newErrors.email = "Email is required"), (isValid = false);
    else if (!/\S+@\S+\.\S+/.test(formData.email)) (newErrors.email = "Invalid email"), (isValid = false);
    if (!formData.message.trim()) (newErrors.message = "Message is required"), (isValid = false);

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await axios.post("https://formspree.io/f/xpwowzwo", formData);
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      } catch {
        alert("Error sending message.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <Box
      component="main"
      id="contact"
      tabIndex={-1}
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "background.default",
        scrollMarginTop: "90px", // Ensures top alignment
      }}
    >
      <Container maxWidth="md">
        <Box component="section" aria-labelledby="contact-heading" sx={{ textAlign: "center" }}>
          <Typography id="contact-heading" variant="h2" gutterBottom color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
            Contact Me
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto" paragraph>
            Ready to elevate your online presence? Get in touch for a custom quote!
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ maxWidth: { xs: "100%", sm: 600 }, mx: "auto", p: { xs: 2, sm: 0 } }}>
          <Grid2 container spacing={3}>
            <Grid2 size={12}>
              <TextField
                inputRef={nameInputRef}
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid2>
            <Grid2 size={12}>
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                multiline
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                error={!!errors.message}
                helperText={errors.message || "Tell me about your project"}
              />
            </Grid2>
            <Grid2 size={12}>
              <Button type="submit" variant="contained" color="secondary" size="large" fullWidth sx={{ py: 1.5, fontWeight: 600 }}>
                Send Message
              </Button>
            </Grid2>
          </Grid2>

          {submitted && (
            <Box sx={{ mt: 3, p: 3, bgcolor: "success.light", color: "success.contrastText", borderRadius: 2, textAlign: "center" }}>
              <Typography variant="h6" fontWeight={600}>Thank You!</Typography>
              <Typography>Your message was sent. I'll reply within 24 hours.</Typography>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;