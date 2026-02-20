import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type Pill = { label: string };

function MiniCard({
  eyebrow,
  title,
  priceLine,
  subtitle,
  pills,
  ctaText,
  ctaTo,
  secondaryText,
  secondaryTo,
  highlight = false,
}: {
  eyebrow: string;
  title: string;
  priceLine: string;
  subtitle: string;
  pills: Pill[];
  ctaText: string;
  ctaTo: string;
  secondaryText?: string;
  secondaryTo?: string;
  highlight?: boolean;
}) {
  const theme = useTheme();

  return (
    <Card
      component="section"
      aria-label={title}
      elevation={0}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: `1px solid ${highlight ? theme.palette.secondary.main : theme.palette.divider}`,
        boxShadow: highlight
          ? "0 14px 34px rgba(2, 6, 23, 0.12)"
          : theme.shadows[2],
      }}
    >
      {highlight ? (
        <Chip
          label="Most popular"
          size="small"
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            fontWeight: 800,
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
          }}
        />
      ) : null}

      <CardContent sx={{ p: { xs: 2.25, sm: 2.75 } }}>
        <Stack spacing={1.1}>
          <Typography
            variant="overline"
            sx={{
              fontWeight: 800,
              color: "text.secondary",
              letterSpacing: 0.8,
            }}
          >
            {eyebrow}
          </Typography>

          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 850, lineHeight: 1.15 }}
          >
            {title}
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            {priceLine}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {subtitle}
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ pt: 0.5 }}
            aria-label={`${title} includes`}
          >
            {pills.map((p, i) => (
              <Chip
                key={i}
                label={p.label}
                size="small"
                sx={{
                  fontWeight: 750,
                  bgcolor: "action.hover",
                }}
              />
            ))}
          </Stack>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          px: { xs: 2.25, sm: 2.75 },
          pb: { xs: 2.25, sm: 2.75 },
          pt: 0,
          mt: "auto",
        }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ width: "100%" }}
        >
          <Button
            component={RouterLink}
            to={ctaTo}
            variant="contained"
            fullWidth
            sx={{
              minHeight: 48,
              minWidth: 140,
              borderRadius: 2,
              fontWeight: 800,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.main",
                filter: "brightness(0.95)",
              },
            }}
          >
            {ctaText}
          </Button>

          {secondaryText && secondaryTo ? (
            <Button
              component={RouterLink}
              to={secondaryTo}
              variant="outlined"
              fullWidth
              sx={{
                minHeight: 48,
                minWidth: 140,
                borderRadius: 2,
                fontWeight: 800,
                borderColor: "divider",
                color: "text.primary",
                "&:hover": {
                  borderColor: "text.secondary",
                  bgcolor: "action.hover",
                },
              }}
            >
              {secondaryText}
            </Button>
          ) : null}
        </Stack>
      </CardActions>
    </Card>
  );
}

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing | Insight Web Solutions";
  }, []);

  const webMonthlyPills: Pill[] = [
    { label: "Full build or refresh" },
    { label: "SEO" },
    { label: "508 / WCAG" },
    { label: "Audits" },
    { label: "Ongoing support" },
  ];

  const webCustomPills: Pill[] = [
    { label: "Landing pages" },
    { label: "Rebuilds" },
    { label: "Fixes & upgrades" },
    { label: "SEO + 508 audits" },
    { label: "Custom scope" },
  ];

  const analyticsPills: Pill[] = [
    { label: "ETL / pipelines" },
    { label: "Dashboards" },
    { label: "Analytics audits" },
    { label: "Data + financial analytics" },
    { label: "Measurement strategy" },
  ];

  return (
    <Box component="main" sx={{ py: { xs: 4.5, sm: 6 } }}>
      <Container maxWidth="lg">
        <Stack spacing={1.5} sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontWeight: 900, lineHeight: 1.05 }}
          >
            Simple pricing. Zero decision fatigue.
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: "78ch" }}
          >
            Web work and analytics work are different services, so the pricing
            is different too. One clear subscription for websites, custom quotes
            for one-off work, and hourly consulting for analytics.
          </Typography>
        </Stack>

        <Grid container spacing={2.5} alignItems="stretch">
          <Grid item xs={12} md={4}>
            <MiniCard
              eyebrow="Web"
              title="Website + SEO + Support"
              priceLine="$199 / month"
              subtitle="A single plan to launch your site and keep it improving."
              pills={webMonthlyPills}
              ctaText="Start"
              ctaTo="/contact?service=web-monthly"
              secondaryText="See work"
              secondaryTo="/work"
              highlight
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <MiniCard
              eyebrow="Custom"
              title="One-off Web Projects"
              priceLine="Custom quote"
              subtitle="Tell me what you need. I’ll propose a simple package."
              pills={webCustomPills}
              ctaText="Get a quote"
              ctaTo="/contact?service=web-custom"
              secondaryText="Services"
              secondaryTo="/services#web"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <MiniCard
              eyebrow="Data"
              title="Analytics Consulting"
              priceLine="Hourly"
              subtitle="Clean tracking, dashboards, and insight for better decisions."
              pills={analyticsPills}
              ctaText="Talk data"
              ctaTo="/contact?service=analytics"
              secondaryText="Services"
              secondaryTo="/services#analytics"
            />
          </Grid>
        </Grid>

        <Typography variant="caption" sx={{ display: "block", mt: 2.5 }}>
          Ongoing support covers reasonable small changes and maintenance.
          Larger additions can be scoped separately.
        </Typography>
      </Container>
    </Box>
  );
}
