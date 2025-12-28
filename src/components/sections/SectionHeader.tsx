import { Box, Typography } from "@mui/material";

interface SectionHeaderProps {
  id: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3";
}

export default function SectionHeader({ id, title, subtitle, as = "h2" }: SectionHeaderProps) {
  // Standardize heading + subtitle spacing so sections stay consistent.
  return (
    <Box>
      <Typography id={id} component={as} variant="h2" sx={{ fontWeight: 950 }}>
        {title}
      </Typography>

      {subtitle ? (
        <Typography
          component="p"
          sx={{
            mt: 1.25,
            maxWidth: 900,
            mx: "auto",
            color: "text.secondary",
            fontSize: { xs: "1.05rem", md: "1.1rem" },
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}

export {};
