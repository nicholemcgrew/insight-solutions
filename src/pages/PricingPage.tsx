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
    <Box sx={{ py: 8, bgcolor: "background.paper" }} id="pricing">
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom color="text.primary">
          Transparent Pricing
        </Typography>
        <Typography
          variant="body1"
          align="center"
          maxWidth="700px"
          mx="auto"
          paragraph
          color="text.secondary"
        >
          Choose the plan that fits your goals. All plans include fast delivery
          and WCAG-compliant design.
        </Typography>

        <Grid2 container spacing={4} mt={4}>
          {plans.map((plan) => (
            <Grid2 size={{ xs: 12, md: 4 }} key={plan.name}>
              {/* ←←← YOUR CARD STARTS HERE ←←← */}
              <Card
                sx={{
                  
    height: '100%',
    bgcolor: 'background.paper',
    border: '1px solid',
    borderColor: plan.popular ? 'secondary.main' : 'divider',
    borderRadius: 2,
    boxShadow: 1,
    position: 'relative',
    transition: '0.3s',
    '&:hover': { boxShadow: 8, transform: 'translateY(-8px)' },
  }}
              >
                {/* Popular badge */}
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
                    }}
                  />
                )}

                <CardContent sx={{ flexGrow: 1, pt: plan.popular ? 4 : 3 }}>
                  <Typography variant="h5" fontWeight={700}>
                    {plan.name}
                  </Typography>
                  <Typography variant="h3" color="primary" fontWeight={800}>
                    ${plan.price}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    one-time
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {plan.description}
                  </Typography>

                  <List>
                    {plan.features.map((f) => (
                      <ListItem key={f} disablePadding sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircleIcon color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={f} />
                      </ListItem>
                    ))}
                    {plan.notIncluded.map((f) => (
                      <ListItem key={f} disablePadding sx={{ py: 0.5, opacity: 0.6 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CancelIcon color="error" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={f} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>

                <Box sx={{ p: 2 }}>
                  <Button
                    fullWidth
                    variant={plan.popular ? "contained" : "outlined"}
                    color="secondary"
                    size="large"
                    onClick={() => {
                      document
                        .getElementById("contact")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Choose {plan.name}
                  </Button>
                </Box>
              </Card>
              {/* ←←← YOUR CARD ENDS HERE ←←← */}
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </Box>
  );
};

export default PricingPage;