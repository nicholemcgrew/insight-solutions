// ===============================================
// OPTION A: Text ON TOP of the form (single column)
// File: Contact.tsx
// ===============================================

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
  TextField,
  Typography,
  Checkbox,
  ListItemText,
  Stack,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import axios from "axios";
import { useLocation } from "react-router-dom";
import servicesData from "../../data/servicesData.json";
import { Service } from "../../types/services";
import { useNavbarOffset } from "../../hooks/useNavbarOffset";

/* -----------------------------
   Types
----------------------------- */

type FormData = {
  name: string;
  email: string;
  services: string[];
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const FORMSPREE_URL = "https://formspree.io/f/xpwowzwo";

/* -----------------------------
   Options
----------------------------- */

const normalize = (s: string) =>
  s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const coreServices = (servicesData as Service[]).map((s) => ({
  title: s.title,
  value: s.value ?? normalize(s.title),
}));

const extraServices = [
  { title: "Data & Analytics", value: "data-analytics" },
  { title: "Accessibility Audit", value: "accessibility-audit" },
  { title: "UX & Conversion Improvements", value: "ux-conversion" },
  { title: "Ongoing Support & Maintenance", value: "maintenance" },
];

const serviceOptions = [...coreServices, ...extraServices];
const titleByValue = Object.fromEntries(serviceOptions.map((o) => [o.value, o.title]));

/* -----------------------------
   Component
----------------------------- */

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    services: [],
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { navbarHeight } = useNavbarOffset();

  const serviceFromQuery = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("service");
  }, [location.search]);

  /* -----------------------------
     Helpers
  ----------------------------- */

  const update = (key: keyof FormData, value: any) => {
    setFormData((p) => ({ ...p, [key]: value }));
    setErrors((p) => ({ ...p, [key]: "" }));
  };

  const validate = () => {
    const e: FormErrors = {};

    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Invalid email address.";

    if (!formData.message.trim() && formData.services.length === 0)
      e.message = "Add a message or select services.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -----------------------------
     Submit
  ----------------------------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitted(false);

    if (!validate()) return;

    const selected = formData.services.map((v) => titleByValue[v] ?? v);

    const message =
      selected.length > 0
        ? `Interested in: ${selected.join(", ")}.\n\n${
            formData.message || "Please provide more details."
          }`
        : formData.message;

    try {
      setIsSubmitting(true);
      await axios.post(
        FORMSPREE_URL,
        {
          name: formData.name,
          email: formData.email,
          message,
        },
        { headers: { Accept: "application/json" } }
      );

      setSubmitted(true);
      setFormData({ name: "", email: "", services: [], message: "" });
      setErrors({});
      setTimeout(() => setSubmitted(false), 6000);
    } catch {
      setSubmitError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -----------------------------
     Prefill + snap
  ----------------------------- */

  useEffect(() => {
    if (!serviceFromQuery) return;

    const decoded = decodeURIComponent(serviceFromQuery);
    const match = serviceOptions.find((o) => o.title === decoded || o.value === decoded);

    if (match) {
      setFormData((p) => ({
        ...p,
        services: Array.from(new Set([...p.services, match.value])),
      }));
    }

    requestAnimationFrame(() => {
      topRef.current?.focus({ preventScroll: true });
      nameRef.current?.focus({ preventScroll: true });
    });
  }, [serviceFromQuery]);

  /* -----------------------------
     Render
  ----------------------------- */

  return (
    <Box
      component="section"
      id="contact"
      aria-labelledby="contact-title"
      sx={{
        minHeight: `calc(100dvh - ${navbarHeight}px)`,
        display: "flex",
        alignItems: "center",
        scrollMarginTop: `${navbarHeight + 16}px`,
      }}
    >
      <Box ref={topRef} tabIndex={-1} aria-hidden />

      <Container maxWidth="lg">
        <Paper
          elevation={10}
          sx={{
            p: { xs: 3.5, md: 5 },
            borderRadius: 4,
          }}
        >
          <Stack spacing={2.5}>
            {/* Header text sits ABOVE the form */}
            <Box>
              <Typography
                id="contact-title"
                component="h2"
                variant="h3"
                sx={{ fontWeight: 900 }}
              >
                Let’s Work Together
              </Typography>

              <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 1 }}>
                Share a few details and I’ll follow up within 24 hours with clear next steps.
              </Typography>
            </Box>

            {/* Alerts + Form */}
            <Stack spacing={2}>
              <Box aria-live="polite">
                {submitted && (
                  <Alert severity="success">Message sent. I’ll be in touch shortly.</Alert>
                )}
                {submitError && <Alert severity="error">{submitError}</Alert>}
              </Box>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid2 container spacing={2.25}>
                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      inputRef={nameRef}
                      label="Name"
                      fullWidth
                      required
                      value={formData.name}
                      onChange={(e) => update("name", e.target.value)}
                      error={!!errors.name}
                      helperText={errors.name}
                      InputProps={{
                        startAdornment: <PersonOutlineIcon sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid2>

                  <Grid2 size={{ xs: 12, md: 6 }}>
                    <TextField
                      label="Email"
                      fullWidth
                      required
                      value={formData.email}
                      onChange={(e) => update("email", e.target.value)}
                      error={!!errors.email}
                      helperText={errors.email}
                      InputProps={{
                        startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
                      }}
                    />
                  </Grid2>

                  <Grid2 size={12}>
                    <FormControl fullWidth>
                      <InputLabel>Services</InputLabel>
                      <Select
                        multiple
                        value={formData.services}
                        onChange={(e) =>
                          update(
                            "services",
                            typeof e.target.value === "string"
                              ? e.target.value.split(",")
                              : e.target.value
                          )
                        }
                        input={<OutlinedInput label="Services" />}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                            {selected.map((v) => (
                              <Chip key={v} label={titleByValue[v]} />
                            ))}
                          </Box>
                        )}
                      >
                        {serviceOptions.map((o) => (
                          <MenuItem key={o.value} value={o.value}>
                            <Checkbox checked={formData.services.includes(o.value)} />
                            <ListItemText primary={o.title} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid2>

                  <Grid2 size={12}>
                    <TextField
                      label="Project details"
                      multiline
                      minRows={4}
                      fullWidth
                      value={formData.message}
                      onChange={(e) => update("message", e.target.value)}
                      error={!!errors.message}
                      helperText={errors.message}
                      InputProps={{
                        startAdornment: <WorkOutlineIcon sx={{ mr: 1, mt: 1 }} />,
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
                        py: 1.6,
                        fontWeight: 900,
                        borderRadius: 999,
                      }}
                    >
                      {isSubmitting ? "Sending…" : "Send Message"}
                    </Button>
                  </Grid2>
                </Grid2>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
