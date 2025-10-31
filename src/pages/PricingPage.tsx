// src/pages/PricingPage.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import pricingData from "../data/pricing.json";

interface Plan {
  name: string;
  price: number;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
}

const PricingPage = () => {
  const plans: Plan[] = pricingData as Plan[];

  return (
    <Box
      component="main"
      id="main-content"
      tabIndex={-1}
      sx={{ py: { xs: 6, md: 8 }, bgcolor: "background.paper" }}
    >
      <Container maxWidth="lg">
        {/* SEO + Accessibility: Section with heading */}
        <Box
          component="section"
          aria-labelledby="pricing-heading"
          sx={{ textAlign: "center", mb: 6 }}
        >
          <Typography
            id="pricing-heading"
            variant="h2"
            gutterBottom
            color="text.primary"
            sx={{ fontWeight: 700 }}
          >
            Transparent Pricing
          </Typography>
          <Typography
            variant="body1"
            maxWidth="700px"
            mx="auto"
            paragraph
            color="text.secondary"
          >
            Choose the plan that fits your goals. All plans include fast delivery
            and WCAG-compliant design.
          </Typography>
        </Box>

        <Grid2 container spacing={{ xs: 3, md: 4 }}>
          {plans.map((plan, index) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={plan.name}>
              <Card
                elevation={0}
                sx={{
                  height: "100%",
                  minHeight: { xs: 480, md: 520 }, // Equal height
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: plan.popular ? "secondary.main" : "divider",
                  borderRadius: 3,
                  boxShadow: 1,
                  position: "relative",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-8px)",
                  },
                  "&:focus-visible": {
                    outline: "3px solid",
                    outlineColor: "secondary.main",
                    outlineOffset: "2px",
                  },
                }}
                tabIndex={0}
                role="article"
                aria-labelledby={`plan-${index}-title`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <Chip
                    label="MOST POPULAR"
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

                <CardContent
                  sx={{
                    flexGrow: 1,
                    pt: plan.popular ? 5 : 4,
                    pb: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    id={`plan-${index}-title`}
                    variant="h5"
                    fontWeight={700}
                    gutterBottom
                  >
                    {plan.name}
                  </Typography>

                  <Typography
                    variant="h3"
                    color="primary"
                    fontWeight={800}
                    itemProp="offers"
                    itemScope
                    itemType="https://schema.org/Offer"
                  >
                    <meta itemProp="priceCurrency" content="USD" />
                    <span itemProp="price">${plan.price}</span>
                  </Typography>

                  <Typography color="text.secondary" gutterBottom>
                    one-time
                  </Typography>

                  <Typography variant="body2" color="text.secondary" paragraph>
                    {plan.description}
                  </Typography>

                  {/* Features List */}
                  <List role="list" aria-label={`${plan.name} plan features`}>
                    {plan.features.map((f) => (
                      <ListItem key={f} disablePadding sx={{ py: 0.75 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={f} />
                      </ListItem>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <ListItem key={f} disablePadding sx={{ py: 0.75, opacity: 0.6 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CancelIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={f} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <Box sx={{ p: 3, pt: 2 }}>
                  <Button
                    fullWidth
                    variant={plan.popular ? "contained" : "outlined"}
                    color="secondary"
                    size="large"
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    aria-label={`Choose ${plan.name} plan and go to contact form`}
                    sx={{
                      py: 1.5,
                      fontWeight: 600,
                      "&:focus-visible": {
                        outline: "3px solid",
                        outlineColor: "secondary.main",
                        outlineOffset: "2px",
                      },
                    }}
                  >
                    Choose {plan.name}
                  </Button>
                </Box>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default PricingPage;