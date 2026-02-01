import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  Grid2,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import servicesData from "../../data/servicesData.json";
import { Service } from "../../types/services";
import { useNavbarOffset } from "../../hooks/useNavbarOffset";

// ──────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  services: string[];
  message: string;
};

type FormErrors = {
  name: string;
  email: string;
  services?: string;
  message: string;
};

const FORMSPREE_URL = "https://formspree.io/f/xpwowzwo";

// Derive service options (fallback if no "value" field)
const serviceOptions = (servicesData as Service[]).map((s) => ({
  title: s.title,
  value:
    s.value ??
    s.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
}));

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    services: [],
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
  const contactTopRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { navbarHeight, scrollMarginTop } = useNavbarOffset();

  const { serviceFromQuery } = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      serviceFromQuery: params.get("service"),
    };
  }, [location.search]);

  const handleServiceChange = (
    event: SelectChangeEvent<typeof formData.services>,
  ) => {
    const {
      target: { value },
    } = event;

    setFormData((prev) => ({
      ...prev,
      services: typeof value === "string" ? value.split(",") : value,
    }));
    setErrors((prev) => ({ ...prev, services: "" }));
  };

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
      nextErrors.email = "Invalid email.";
      ok = false;
    }

    if (!formData.message.trim() && formData.services.length === 0) {
      nextErrors.message = "Please add a message or select services.";
      ok = false;
    }

    setErrors(nextErrors);
    return ok;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);

    if (!validateForm()) return;

    // Build message with selected services
    let finalMessage = formData.message.trim();

    if (formData.services.length > 0) {
      const selectedTitles = formData.services
        .map((val) => {
          const found = (servicesData as Service[]).find((s) => {
            const computed =
              s.value ??
              s.title
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
            return computed === val;
          });
          return found?.title ?? val;
        })
        .filter(Boolean);

      if (selectedTitles.length > 0) {
        const servicesLine = `Interested in: ${selectedTitles.join(", ")}.\n\n`;
        finalMessage =
          servicesLine +
          (finalMessage ? finalMessage : "Please provide more details.");
      }
    }

    const payload = {
      name: formData.name,
      email: formData.email,
      message: finalMessage,
    };

    try {
      setIsSubmitting(true);
      await axios.post(FORMSPREE_URL, payload, {
        headers: { Accept: "application/json" },
      });

      setSubmitted(true);
      setFormData({ name: "", email: "", services: [], message: "" });
      setErrors({ name: "", email: "", message: "" });

      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Prefill + snap to the top of the form (not the footer)
  useEffect(() => {
    if (!serviceFromQuery) return;

    const decoded = decodeURIComponent(serviceFromQuery);
    const matching = serviceOptions.find(
      (opt) => opt.title === decoded || opt.value === decoded,
    );

    if (matching) {
      setFormData((prev) => ({
        ...prev,
        services: Array.from(new Set([...prev.services, matching.value])),
      }));
    }

    // Ensure we land with the top of Contact visible under the fixed navbar
    requestAnimationFrame(() => {
      const el = contactTopRef.current;
      if (!el) return;

      const offset = navbarHeight + 12;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top: Math.max(y, 0), behavior: "smooth" });

      // Helpful for keyboard users
      nameInputRef.current?.focus({ preventScroll: true });
    });
  }, [serviceFromQuery, navbarHeight]);

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-title"
      sx={{
        position: "relative",
        scrollMarginTop: `${scrollMarginTop}px`,
        py: { xs: 8, md: 10 },
      }}
    >
      {/* Anchor that we scroll to (top of contact section) */}
      <Box
        id="contact-top"
        ref={contactTopRef}
        tabIndex={-1}
        aria-hidden="true"
        sx={{ position: "absolute", top: 0, left: 0 }}
      />

      <Container maxWidth="xl">
        <Grid2 container spacing={{ xs: 3, md: 4 }} alignItems="center">
          {/* Left column – heading + pitch */}
          <Grid2 size={{ xs: 12, md: 5 }}>
            <Typography
              id="contact-title"
              component="h2"
              variant="h3"
              sx={{ fontWeight: 900, mb: 1.5 }}
            >
              Get a Quote
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Tell me what you’re building and what you need help with. I’ll
              reply within 24 hours with next steps.
            </Typography>
          </Grid2>

          {/* Right column – form */}
          <Grid2 size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, md: 3.5 }, borderRadius: 3 }}>
              <Box aria-live="polite" sx={{ mb: 2 }}>
                {submitted && (
                  <Alert severity="success">
                    Message sent — I&apos;ll reply within 24h.
                  </Alert>
                )}
                {submitError && <Alert severity="error">{submitError}</Alert>}
              </Box>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid2 container spacing={2.5}>
                  {/* Name + Email */}
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      inputRef={nameInputRef}
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                      fullWidth
                      required
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                      fullWidth
                      required
                    />
                  </Grid2>

                  {/* Services multi-select */}
                  <Grid2 size={12}>
                    <FormControl fullWidth error={!!errors.services}>
                      <InputLabel id="services-label">
                        Interested in (select all that apply)
                      </InputLabel>
                      <Select
                        labelId="services-label"
                        id="services"
                        multiple
                        value={formData.services}
                        onChange={handleServiceChange}
                        input={
                          <OutlinedInput label="Interested in (select all that apply)" />
                        }
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => {
                              const title =
                                serviceOptions.find((o) => o.value === value)
                                  ?.title ?? value;
                              return <Chip key={value} label={title} />;
                            })}
                          </Box>
                        )}
                      >
                        {serviceOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.title}
                          </MenuItem>
                        ))}
                      </Select>

                      {errors.services && (
                        <Typography
                          variant="caption"
                          color="error"
                          sx={{ mt: 0.5, ml: 1.75 }}
                        >
                          {errors.services}
                        </Typography>
                      )}
                    </FormControl>
                  </Grid2>

                  {/* Message */}
                  <Grid2 size={12}>
                    <TextField
                      name="message"
                      label="Message / Project details"
                      multiline
                      minRows={4}
                      value={formData.message}
                      onChange={handleChange}
                      error={!!errors.message}
                      helperText={
                        errors.message ||
                        "Include timeline, budget range, links, etc."
                      }
                      fullWidth
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
                      sx={{ fontWeight: 900, py: 1.5, borderRadius: 999 }}
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>
                  </Grid2>
                </Grid2>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Include links, examples, timeline, and budget range for fastest
                quote.
              </Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Contact;
