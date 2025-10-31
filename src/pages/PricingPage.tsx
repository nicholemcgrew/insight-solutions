// src/pages/PricingPage.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import pricingData from "../data/pricing.json";

interface Feature {
  text: string;
  included: boolean;
}

interface Plan {
  title: string;
  subtitle: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  cta: string;
  popular?: boolean;
}

const PricingPage = () => {
  const plans: Plan[] = pricingData as Plan[];

  return (
    <Box
      component="section"
      id="pricing"
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "background.default",
      }}
      itemScope
      itemType="https://schema.org/Service"
    >
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="h2"
            gutterBottom
            color="text.primary"
            sx={{ fontWeight: 700 }}
            itemProp="name"
          >
            Transparent Pricing
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth="700px"
            mx="auto"
            paragraph
          >
            Choose the perfect plan for your project. All packages include
            WCAG-compliant accessibility, SEO optimization, and mobile-first
            design.
          </Typography>
        </Box>

        {/* Pricing Cards */}
        <Grid2 container spacing={{ xs: 3, md: 4 }} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid2
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "stretch",
              }}
            >
              <Card
                elevation={plan.popular ? 12 : 3}
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                  position: "relative",
                  border: plan.popular
                    ? "2px solid"
                    : "1px solid",
                  borderColor: plan.popular ? "secondary.main" : "divider",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: plan.popular ? 16 : 8,
                  },
                }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Chip
                    label="Most Popular"
                    color="secondary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontWeight: 600,
                      zIndex: 1,
                    }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1, pt: plan.popular ? 5 : 3 }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    color="text.primary"
                    fontWeight={700}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {plan.subtitle}
                  </Typography>

                  <Box sx={{ my: 2 }}>
                    <Typography
                      variant="h3"
                      component="span"
                      color="primary.main"
                      fontWeight={800}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      component="span"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                  >
                    {plan.description}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  {/* Features List */}
                  <Box component="ul" sx={{ m: 0, p: 0, listStyle: "none" }}>
                    {plan.features.map((feature, i) => (
                      <Box
                        component="li"
                        key={i}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 1,
                          color: feature.included ? "success.main" : "text.disabled",
                        }}
                      >
                        {feature.included ? (
                          <CheckCircleIcon fontSize="small" sx={{ mr: 1 }} />
                        ) : (
                          <CancelIcon fontSize="small" sx={{ mr: 1 }} />
                        )}
                        <Typography variant="body2">
                          {feature.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    color="secondary"
                    fullWidth
                    size="large"
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      textTransform: "none",
                    }}
                  >
                    {plan.cta}
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {/* CTA Footer */}
        <Box textAlign="center" mt={8}>
          <Typography variant="body1" color="text.secondary">
            Need a custom quote?{" "}
            <Button
              variant="text"
              color="secondary"
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Get in Touch
            </Button>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default PricingPage;