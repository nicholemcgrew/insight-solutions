// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A",
    },
    secondary: {
      main: "#F59E0B",
    },
    background: {
      default: "#F8FAFC",
    },
    text: {
      primary: "#0F172A",
      secondary: "#64748B",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
  },

  // Global CSS overrides injected via CssBaseline
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        /* define a CSS variable for the header offset so you can tweak it
           responsively in one place if needed */
        ":root": {
          // default offset (tweak this to match your AppBar height)
          "--header-offset": "88px",
        },

        /* smooth scrolling and padding for in-page navigation */
        html: {
          scrollBehavior: "smooth",
          // scroll-padding-top is helpful for browser default anchor behaviour
          scrollPaddingTop: "var(--header-offset)",
        },

        /* apply scroll-margin-top to sections and any element with an id
           so scrollIntoView / fragment navigation lands at the top */
        "main [id], section[id], [id]": {
          scrollMarginTop: "var(--header-offset)",
        },
      },
    },
  },
});

export default theme;
