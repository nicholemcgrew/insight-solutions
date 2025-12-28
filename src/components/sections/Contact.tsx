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

// Keep in sync with your AppBar height
const HEADER_OFFSET_PX = 96;

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

  const { serviceFromQuery, ctaFromQuery } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      serviceFromQuery: params.get("service"),
      ctaFromQuery: params.get("cta"),
    };
  }, [location.search]);

  useEffect(() => {
    const shouldGoToContact =
      location.hash === "#contact" || ctaFromQuery === "true" || !!serviceFromQuery;

    if (!shouldGoToContact) return;

    const contactEl = document.getElementById("contact");
    if (contactEl) {
      const y =
        contactEl.getBoundingClientRect().top + window.pageYOffset - HEADER_OFFSET_PX;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    const focusTimer = window.setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 250);

    if (serviceFromQuery) {
      setFormData((prev) => {
        if (prev.message.trim().length > 0) return prev;
        return {
          ...prev,
          message: `Interested in ${decodeURIComponent(
            serviceFromQuery
          )}. Please provide more details.`,
        };
      });
    }

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

      window.setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitError("Something went wrong sending your message. Please try again.");
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
        bgcolor: "background.default",
        // “one-screen” target
        minHeight: `calc(100dvh - ${HEADER_OFFSET_PX}px)`,
        display: "flex",
        alignItems: "center",
        scrollMarginTop: `${HEADER_OFFSET_PX}px`,
        // tighter vertical padding to avoid scrolling
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      {/* Full-width container (removes huge side gaps) */}
      <Container
        maxWidth="xl"
        disableGutters
        sx={{
          px: { xs: 2, sm: 3, md: 6, lg: 10 }, // controlled padding, not huge margins
          width: "100%",
        }}
      >
        <Grid2
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          sx={{ width: "100%" }}
        >
          {/* LEFT: heading + short pitch */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Stack spacing={1.5} sx={{ textAlign: { xs: "center", md: "left" } }}>
              <Typography
                id="contact-heading"
                component="h2"
                sx={{
                  fontWeight: 800,
                  letterSpacing: 0.2,
                  fontSize: { xs: "2rem", sm: "2.4rem", md: "2.8rem" },
                  lineHeight: 1.1,
                }}
              >
                Contact Me
              </Typography>

              <Typography
                component="p"
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "1.05rem", sm: "1.1rem" },
                  lineHeight: 1.65,
                  maxWidth: { xs: "unset", md: 520 },
                  mx: { xs: "auto", md: 0 },
                }}
              >
                Tell me what you’re building. I’ll reply within 24 hours with next steps
                and a clear quote.
              </Typography>
            </Stack>
          </Grid2>

          {/* RIGHT: compact form */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Paper
              elevation={0}
              sx={(t) => ({
                borderRadius: 3,
                bgcolor: "background.paper",
                border: `1px solid ${t.palette.divider}`,
                p: { xs: 2.5, sm: 3, md: 3.5 }, // reduced to fit one screen
                maxWidth: 860,
                mx: { xs: "auto", md: 0 },
              })}
            >
              {/* Live region */}
              <Box aria-live="polite" aria-atomic="true" sx={{ mb: 1.5 }}>
                {submitted && (
                  <Alert severity="success" variant="filled">
                    Message sent — I’ll reply within 24 hours.
                  </Alert>
                )}
                {!!submitError && (
                  <Alert severity="error" variant="filled">
                    {submitError}
                  </Alert>
                )}
              </Box>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid2 container spacing={{ xs: 2, md: 2.5 }}>
                  {/* Name + Email side-by-side on desktop */}
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      inputRef={nameInputRef}
                      fullWidth
                      required
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name || " "}
                      autoComplete="name"
                      sx={{
                        "& .MuiInputLabel-root": { fontWeight: 600 },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "1rem", sm: "1.05rem" },
                          py: 1.2,
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      required
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email || " "}
                      autoComplete="email"
                      sx={{
                        "& .MuiInputLabel-root": { fontWeight: 600 },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "1rem", sm: "1.05rem" },
                          py: 1.2,
                        },
                      }}
                    />
                  </Grid2>

                  <Grid2 size={12}>
                    <TextField
                      fullWidth
                      required
                      label="Message"
                      name="message"
                      multiline
                      // smaller height so section fits one screen
                      minRows={4}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={errors.message || " "}
                      sx={{
                        "& .MuiInputLabel-root": { fontWeight: 600 },
                        "& .MuiInputBase-input": {
                          fontSize: { xs: "1rem", sm: "1.05rem" },
                          lineHeight: 1.55,
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
                        py: 1.4,
                        fontWeight: 800,
                        fontSize: { xs: "1.02rem", sm: "1.06rem" },
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

              {/* Keep this short so we don’t force scroll */}
              <Typography
                component="p"
                sx={{
                  mt: 1.5,
                  color: "text.secondary",
                  textAlign: "center",
                  fontSize: "0.95rem",
                }}
              >
                Include links, examples, and your timeline for the fastest quote.
              </Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Contact;
