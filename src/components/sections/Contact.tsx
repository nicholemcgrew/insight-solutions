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

type FormData = {
  name: string;
  email: string;
  services: string[];
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type ServiceOption = { title: string; value: string };

const FORMSPREE_URL = "https://formspree.io/f/xpwowzwo";

const normalize = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9-]/g, "");

const canonicalizeValue = (v: string) =>
  v.toLowerCase().trim().replace(/_/g, "-").replace(/\s+/g, "-");

const DISPLAY_OPTIONS: ServiceOption[] = [
  { title: "Website Design & Development", value: "web-design-development" },
  { title: "Accessibility Audit (508 / WCAG)", value: "accessibility-audit" },
  { title: "SEO & Performance Optimization", value: "seo-performance" },
  { title: "UX & Conversion Improvements", value: "ux-conversion" },
  { title: "Data & Analytics", value: "data-analytics" },
  { title: "Ongoing Support & Maintenance", value: "maintenance" },
];

const SERVICE_ORDER = DISPLAY_OPTIONS.map((o) => o.value);

const CORE_MATCHERS: Array<{
  toValue: string;
  matches: (s: { title: string; value: string }) => boolean;
}> = [
  {
    toValue: "web-design-development",
    matches: (s) =>
      /web|website|site/.test(`${s.title} ${s.value}`.toLowerCase()),
  },
  {
    toValue: "accessibility-audit",
    matches: (s) =>
      /access|508|wcag/.test(`${s.title} ${s.value}`.toLowerCase()),
  },
  {
    toValue: "seo-performance",
    matches: (s) =>
      /seo|performance|speed|optimization/.test(
        `${s.title} ${s.value}`.toLowerCase(),
      ),
  },
  {
    toValue: "ux-conversion",
    matches: (s) =>
      /ux|conversion|cro|user experience/.test(
        `${s.title} ${s.value}`.toLowerCase(),
      ),
  },
  {
    toValue: "data-analytics",
    matches: (s) =>
      /data|analytics|dashboard|report/.test(
        `${s.title} ${s.value}`.toLowerCase(),
      ),
  },
  {
    toValue: "maintenance",
    matches: (s) =>
      /maintenance|support|retainer|ongoing/.test(
        `${s.title} ${s.value}`.toLowerCase(),
      ),
  },
];

function buildServiceOptionsFromCore(coreRaw: ServiceOption[]) {
  const canonicalHits = new Map<string, ServiceOption>();

  for (const item of coreRaw) {
    for (const rule of CORE_MATCHERS) {
      if (rule.matches(item)) {
        if (!canonicalHits.has(rule.toValue)) {
          const display = DISPLAY_OPTIONS.find((d) => d.value === rule.toValue);
          canonicalHits.set(rule.toValue, {
            title: display?.title ?? item.title,
            value: rule.toValue,
          });
        }
        break;
      }
    }
  }

  const merged = new Map<string, ServiceOption>();
  DISPLAY_OPTIONS.forEach((o) => merged.set(o.value, o));
  canonicalHits.forEach((o, v) => merged.set(v, o));

  const seenTitle = new Set<string>();
  const list: ServiceOption[] = [];

  for (const o of merged.values()) {
    const val = canonicalizeValue(o.value);
    const titleKey = o.title.trim().toLowerCase();

    if (SERVICE_ORDER.includes(val) && !seenTitle.has(titleKey)) {
      seenTitle.add(titleKey);
      list.push({ title: o.title, value: val });
    }
  }

  const idx = new Map<string, number>();
  SERVICE_ORDER.forEach((v, i) => idx.set(v, i));
  list.sort((a, b) => (idx.get(a.value)! ?? 999) - (idx.get(b.value)! ?? 999));

  return list;
}

const coreServicesRaw: ServiceOption[] = (servicesData as Service[]).map(
  (s) => ({
    title: s.title,
    value: canonicalizeValue(s.value ?? normalize(s.title)),
  }),
);

const serviceOptions = buildServiceOptionsFromCore(coreServicesRaw);

const titleByValue: Record<string, string> = Object.fromEntries(
  serviceOptions.map((o) => [o.value, o.title]),
);

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

  // Avoid focus-jumps if user starts interacting quickly
  const userInteractedRef = useRef(false);
  const markInteracted = () => {
    userInteractedRef.current = true;
  };

  // Allow applying a *new* service param, but don't keep reapplying the same one
  const lastAppliedServiceRef = useRef<string | null>(null);

  const location = useLocation();
  const { navbarHeight } = useNavbarOffset();

  // Reads "service" from BOTH:
  // 1) normal query string: "/?service=x#contact"
  // 2) hash query string: "/#contact?service=x" or "/#/contact?service=x"
  const serviceFromQuery = useMemo(() => {
    const searchParams = new URLSearchParams(location.search);
    const fromSearch = searchParams.get("service");
    if (fromSearch) return fromSearch;

    const hash = location.hash || "";
    const qIndex = hash.indexOf("?");
    if (qIndex === -1) return null;

    const hashQuery = hash.slice(qIndex + 1);
    const hashParams = new URLSearchParams(hashQuery);
    return hashParams.get("service");
  }, [location.search, location.hash]);

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
        { name: formData.name, email: formData.email, message },
        { headers: { Accept: "application/json" } },
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

  useEffect(() => {
    if (!serviceFromQuery) return;

    const decoded = decodeURIComponent(serviceFromQuery);
    const decodedVal = canonicalizeValue(decoded);

    // Only skip if it's the same service we already applied
    if (lastAppliedServiceRef.current === decodedVal) return;

    const match = serviceOptions.find(
      (o) => o.title === decoded || o.value === decodedVal,
    );

    // Mark applied even if no match, so we don't loop on weird values
    lastAppliedServiceRef.current = decodedVal;

    if (match) {
      setFormData((p) => ({
        ...p,
        services: Array.from(new Set([...p.services, match.value])),
      }));

      // Focus only if they haven't already started interacting
      requestAnimationFrame(() => {
        if (userInteractedRef.current) return;
        topRef.current?.focus({ preventScroll: true });
        nameRef.current?.focus({ preventScroll: true });
      });
    }
  }, [serviceFromQuery]);

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
        mb: { xs: "1rem", sm: "1rem", md: 0 },
      }}
      onPointerDown={markInteracted}
      onKeyDown={markInteracted}
    >
      {/* Focus target for programmatic scroll/focus — tabIndex={-1} allows
          .focus() calls but keeps it out of the tab order. aria-hidden is
          intentionally omitted: pairing aria-hidden with tabIndex is
          prohibited by WAI-ARIA and triggers 508 violations. */}
      <Box ref={topRef} tabIndex={-1} sx={{ outline: "none" }} />

      <Container maxWidth="lg">
        <Paper elevation={10} sx={{ p: { xs: 3.5, md: 5 }, borderRadius: 4 }}>
          <Stack spacing={2.5}>
            <Box>
              <Typography
                id="contact-title"
                component="h2"
                variant="h3"
                sx={{ fontWeight: 900 }}
              >
                Let's Work Together
              </Typography>
              <Typography
                color="text.secondary"
                sx={{ lineHeight: 1.7, mt: 1 }}
              >
                Share a few details and a response will follow within 24 hours
                with clear next steps.
              </Typography>
            </Box>

            <Box aria-live="polite">
              {submitted && (
                <Alert severity="success">
                  Message sent. A response will follow shortly.
                </Alert>
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
                    onFocus={markInteracted}
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
                    onFocus={markInteracted}
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
                      onOpen={markInteracted}
                      inputProps={{ "aria-label": "Services" }}
                      onChange={(e) =>
                        update(
                          "services",
                          typeof e.target.value === "string"
                            ? e.target.value.split(",")
                            : e.target.value,
                        )
                      }
                      input={<OutlinedInput label="Services" />}
                      renderValue={(selected) => (
                        <Box
                          sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}
                        >
                          {selected.map((v) => (
                            <Chip key={v} label={titleByValue[v] ?? v} />
                          ))}
                        </Box>
                      )}
                    >
                      {serviceOptions.map((o) => (
                        <MenuItem key={o.value} value={o.value}>
                          <Checkbox
                            checked={formData.services.includes(o.value)}
                          />
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
                    onFocus={markInteracted}
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
                    sx={{ py: 1.6, fontWeight: 900, borderRadius: 999 }}
                  >
                    {isSubmitting ? "Sending…" : "Send Message"}
                  </Button>
                </Grid2>
              </Grid2>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default Contact;
