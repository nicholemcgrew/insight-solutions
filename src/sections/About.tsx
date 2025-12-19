// src/sections/About.tsx
import React from "react";
import { Box, Container, Typography, Stack, Paper } from "@mui/material";

const About = () => {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 9, md: 12 },
        bgcolor: "background.default",
        scrollMarginTop: { xs: 84, md: 104 },
      }}
      itemScope
      itemType="https://schema.org/Person"
    >
      <Container maxWidth="md">
        <Stack spacing={{ xs: 3, md: 4 }} alignItems="center">
          {/* Heading (SEO/508: strong H2 for section) */}
          <Typography
            id="about-heading"
            component="h2"
            variant="h2"
            align="center"
            sx={{
              fontWeight: 900,
              letterSpacing: 0.2,
              fontSize: { xs: "2.1rem", sm: "2.5rem", md: "3rem" },
              lineHeight: 1.12,
              mb: 0,
            }}
            itemProp="name"
          >
            About Me
          </Typography>

          {/* Big readable body inside a card for contrast + scanning */}
          <Paper
            elevation={0}
            sx={(t) => ({
              width: "100%",
              maxWidth: 820,
              borderRadius: 3,
              p: { xs: 3, sm: 4, md: 4.5 },
              bgcolor: "background.paper",
              border: `1px solid ${t.palette.divider}`,
            })}
          >
            <Typography
              component="p"
              align="center"
              sx={{
                fontSize: { xs: "1.15rem", sm: "1.2rem", md: "1.25rem" },
                lineHeight: 1.8,
                color: "text.secondary",
                mb: 2.5,
              }}
              itemProp="description"
            >
              I’m{" "}
              <Box
                component="span"
                itemProp="givenName"
                sx={{ fontWeight: 900, color: "text.primary" }}
              >
                Nichole
              </Box>
              , the creative force behind{" "}
              <Box
                component="span"
                itemProp="worksFor"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <Box
                  component="span"
                  itemProp="name"
                  sx={{ fontWeight: 900, color: "text.primary" }}
                >
                  Insight Web Solutions
                </Box>
              </Box>
              . I specialize in{" "}
              <Box
                component="span"
                itemProp="knowsAbout"
                sx={{ fontWeight: 900, color: "text.primary" }}
              >
                modern web development, WCAG/508 accessibility audits & fixes, SEO, UX improvements, and data analytics
              </Box>
              —delivering tailored solutions that elevate your online presence and help you convert visitors into customers.
            </Typography>

            <Typography
              component="p"
              align="center"
              sx={{
                fontSize: { xs: "1.1rem", sm: "1.15rem", md: "1.2rem" },
                lineHeight: 1.8,
                color: "text.secondary",
                mb: 0,
              }}
            >
              Coming soon:{" "}
              <Box
                component="span"
                itemProp="knowsAbout"
                sx={{ fontWeight: 900, color: "text.primary" }}
              >
                AWS and cybersecurity services
              </Box>{" "}
              as I expand my expertise.
            </Typography>

            {/* Job Title (schema) */}
            <Box textAlign="center" mt={{ xs: 3, md: 3.5 }}>
              <Typography
                variant="body2"
                component="p"
                color="text.secondary"
                sx={{
                  fontStyle: "italic",
                  fontSize: { xs: "1rem", sm: "1.05rem" },
                }}
                itemProp="jobTitle"
              >
                Founder & Lead Developer
              </Typography>
            </Box>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
};

export default About;
