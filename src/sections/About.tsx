// src/sections/About.tsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      component="section"
      id="about"
      aria-labelledby="about-heading"
      tabIndex={-1}
      sx={{
        py: { xs: 8, md: 10 },
        bgcolor: "background.default",
        scrollMarginTop: { xs: 70, md: 90 },
      }}
      itemScope
      itemType="https://schema.org/Person"
    >
      <Container maxWidth="md">
        <Typography
          id="about-heading"
          variant="h2"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700, mb: 4 }}
          itemProp="name"
        >
          About Me
        </Typography>

        <Typography
          variant="body1"
          align="center"
          maxWidth="700px"
          mx="auto"
          paragraph
          sx={{
            fontSize: { xs: "1.1rem", md: "1.125rem" },
            lineHeight: 1.7,
            color: "text.secondary",
          }}
          itemProp="description"
        >
          I’m{" "}
          <Box component="span" itemProp="givenName">
            Nichole
          </Box>
          , the creative force behind{" "}
          <Box component="span" itemProp="worksFor" itemScope itemType="https://schema.org/Organization">
            <Box component="span" itemProp="name">
              Insight Web Solutions
            </Box>
          </Box>
          . Specializing in{" "}
          <Box component="span" itemProp="knowsAbout">
            web development, WCAG-compliant accessibility audits and improvements, SEO, UX enhancements, and data analytics
          </Box>
          , I deliver tailored solutions to elevate your online presence. Stay tuned for upcoming{" "}
          <Box component="span" itemProp="knowsAbout">
            AWS and cybersecurity services
          </Box>{" "}
          as I expand my expertise!
        </Typography>

        {/* Optional: Founder badge */}
        <Box textAlign="center" mt={3}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
            itemProp="jobTitle"
          >
            Founder & Lead Developer
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About;