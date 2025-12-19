// src/sections/Contact.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = {
  name: string;
  email: string;
  message: string;
};

const FORMSPREE_URL = "https://formspree.io/f/xpwowzwo";

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  // Read query params once per location.search change
  const { serviceFromQuery, ctaFromQuery } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      serviceFromQuery: params.get("service"),
      ctaFromQuery: params.get("cta"),
    };
  }, [location.search]);

  // Deep link + focus management (508) + optional service prefill
  useEffect(() => {
    const shouldGoToContact =
      location.hash === "#contact" || ctaFromQuery === "true" || !!serviceFromQuery;

    if (!shouldGoToContact) return;

    const contactEl = document.getElementById("contact");

    if (contactEl) {
      // Scroll so the section top is visible below sticky header
      const headerOffset = 96; // adjust if your AppBar height changes
      const y =
        contactEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }

    // Focus first input after scroll settles (508)
    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 350);

    // Prefill message if service is present (don’t overwrite if user already typed)
    if (serviceFromQuery) {
      setFormData((prev) => {
        const alreadyHasTypedMessage = prev.message.trim().length > 0;
        if (alreadyHasTypedMessage) return prev;

        return {
          ...prev,
          message: `Interested in ${decodeURIComponent(
            serviceFromQuery
          )}. Please provide more details.`,
        };
      });
    }

    // Clean URL: remove ?cta=true but keep ?service=...
    if (ctaFromQuery === "true") {
      const params = new URLSearchParams(location.search);
      params.delete("cta");

      const nextSearch = params.toString();
      navigate(
        {
          pathname: location.pathname,
          search: nextSearch ? `?${nextSearch}` : "",
          hash: location.hash,
        },
        { replace: true }
      );
    }

    return () => window.clearTimeout(focusTimer);
  }, [
    location.hash,
    location.pathname,
    location.search,
    navigate,
    serviceFromQuery,
    ctaFromQuery,
  ]);

  const validateForm = () => {
    const nextErrors: FormErrors = { name: "", email: "", message: "" };
    let ok = true;

    if (!formData.name.trim()) {
      nextErrors.name = "Name is required.";
      ok = false;
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
      ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
      ok = false;
    }

    if (!formData.message.trim()) {
      nextErrors.message = "Message is required.";
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);

    if (!validateForm()) {
      // 508: focus first invalid field
      if (!formData.name.trim()) nameInputRef.current?.focus();
      return;
    }

    try {
      setIsSubmitting(true);

      await axios.post(FORMSPREE_URL, formData, {
        headers: { Accept: "application/json" },
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({ name: "", email: "", message: "" });

      window.setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setSubmitError(
        "Something went wrong sending your message. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 9, md: 12 },
        bgcolor: "background.default",
        scrollMarginTop: { xs: 84, md: 104 },
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Stack
          spacing={{ xs: 2, md: 3 }}
          alignItems="center"
          sx={{ textAlign: "center" }}
        >
          <Typography
            id="contact-heading"
            component="h2"
            variant="h2"
            sx={{
              fontWeight: 900,
              letterSpacing: 0.2,
              fontSize: { xs: "2.1rem", sm: "2.6rem", md: "3.1rem" },
              lineHeight: 1.12,
            }}
          >
            Contact Me
          </Typography>

          <Typography
            component="p"
            variant="h6"
            sx={{
              color: "text.secondary",
              maxWidth: 720,
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              lineHeight: 1.7,
              mb: { xs: 2, md: 1 },
            }}
          >
            Ready to elevate your online presence? Send a message and I’ll reply
            within 24 hours.
          </Typography>
        </Stack>

        {/* Form Card */}
        <Paper
          elevation={0}
          sx={(t) => ({
            mt: { xs: 4, md: 5 },
            borderRadius: 3,
            p: { xs: 3, sm: 4, md: 5 },
            bgcolor: "background.paper",
            border: `1px solid ${t.palette.divider}`,
          })}
        >
          {/* Live region for screen readers */}
          <Box aria-live="polite" aria-atomic="true" sx={{ mb: 2 }}>
            {submitted && (
              <Alert severity="success" variant="filled">
                <Typography component="span" sx={{ fontWeight: 900 }}>
                  Message sent!
                </Typography>{" "}
                I’ll reply within 24 hours.
              </Alert>
            )}

            {!!submitError && (
              <Alert severity="error" variant="filled">
                {submitError}
              </Alert>
            )}
          </Box>

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid2 container spacing={{ xs: 2.5, md: 3 }}>
              <Grid2 size={12}>
                <TextField
                  inputRef={nameInputRef}
                  fullWidth
                  required
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name || " "}
                  autoComplete="name"
                  sx={{
                    "& .MuiInputLabel-root": { fontWeight: 700 },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "1.05rem", sm: "1.1rem" },
                      py: 1.4,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                <TextField
                  fullWidth
                  required
                  label="Your Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email || " "}
                  autoComplete="email"
                  sx={{
                    "& .MuiInputLabel-root": { fontWeight: 700 },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "1.05rem", sm: "1.1rem" },
                      py: 1.4,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                <TextField
                  fullWidth
                  required
                  label="Your Message"
                  name="message"
                  multiline
                  minRows={6}
                  value={formData.message}
                  onChange={handleChange}
                  error={!!errors.message}
                  helperText={
                    errors.message ||
                    "Tell me what you need (goals, timeline, and links if you have them)."
                  }
                  sx={{
                    "& .MuiInputLabel-root": { fontWeight: 700 },
                    "& .MuiInputBase-input": {
                      fontSize: { xs: "1.05rem", sm: "1.1rem" },
                      lineHeight: 1.6,
                    },
                  }}
                />
              </Grid2>

              <Grid2 size={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    py: 1.75,
                    fontWeight: 900,
                    fontSize: { xs: "1.05rem", sm: "1.1rem" },
                    textTransform: "none",
                    borderRadius: 2,
                    "&:focus-visible": {
                      outline: "3px solid",
                      outlineColor: "primary.main",
                      outlineOffset: 3,
                    },
                  }}
                >
                  {isSubmitting ? "Sending…" : "Send Message"}
                </Button>
              </Grid2>
            </Grid2>
          </Box>

          <Typography
            component="p"
            variant="body2"
            sx={{
              mt: 2.5,
              color: "text.secondary",
              textAlign: "center",
              fontSize: { xs: "0.98rem", sm: "1rem" },
              lineHeight: 1.6,
            }}
          >
            Prefer email? Include your best contact method and I’ll respond
            quickly.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
