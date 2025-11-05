import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import portfolioData from "../data/portfolio.json";
import portfolioImg from "../assets/images/portfolio.png";

interface Project {
  title: string;
  description: string;
  role: string;
  tech: string[];
  link: string;
  desktop: string | typeof portfolioImg;
  mobile: string | typeof portfolioImg;
}

const Portfolio = () => {
  const projects: Project[] = (portfolioData as Project[]).map((p) => ({
    ...p,
    desktop: p.desktop === "portfolioImg" ? portfolioImg : p.desktop,
    mobile: p.mobile === "portfolioImg" ? portfolioImg : p.mobile,
  }));

  return (
    <Box component="section" id="portfolio" aria-labelledby="portfolio-heading" tabIndex={-1} sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Typography id="portfolio-heading" variant="h2" align="center" gutterBottom color="text.primary" sx={{ fontWeight: 700, mb: 3 }}>
          My Portfolio
        </Typography>

        <Grid2 container spacing={4} mt={2}>
          {projects.map((project, i) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={i}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 3, boxShadow: 3, overflow: "hidden", transition: "0.3s", "&:hover": { boxShadow: 12, transform: "translateY(-8px)" } }}>
                <Box sx={{ position: "relative", height: { xs: 200, sm: 250 }, bgcolor: "#f5f5f5", overflow: "hidden" }}>
                  <CardMedia component="img" image={project.desktop} alt={project.title} loading="lazy" sx={{ width: "100%", height: "100%", objectFit: "contain", maxWidth: 600, mx: "auto" }} />
                  <CardMedia component="img" image={project.mobile} alt={`${project.title} – mobile`} loading="lazy" sx={{ position: "absolute", bottom: 16, right: 16, width: { xs: "30%", sm: "25%" }, borderRadius: 2, boxShadow: 6, border: "3px solid white", objectFit: "contain" }} />
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom color="primary.main" fontWeight={700}>{project.title}</Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>{project.description}</Typography>
                  <Typography variant="caption" color="text.secondary" fontStyle="italic" display="block" mb={2}>Role: {project.role}</Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {project.tech.map((tech, i) => <Chip key={i} label={tech} size="small" color="secondary" variant="outlined" sx={{ fontSize: "0.75rem" }} />)}
                  </Stack>
                </CardContent>

                <Box sx={{ p: 3, pt: 0 }}>
                  <Button variant="contained" color="secondary" href={project.link} target="_blank" rel="noopener noreferrer" fullWidth endIcon={<OpenInNewIcon />} sx={{ py: 1.5, fontWeight: 600, textTransform: "none" }}>
                    View Live Project
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

export default Portfolio;
