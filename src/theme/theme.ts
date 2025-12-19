// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1E3A8A", // Deep blue
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#F59E0B", // Amber
      contrastText: "#0F172A",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    /* ===== HEADINGS ===== */
    h1: {
      fontSize: "clamp(3rem, 5vw, 4.5rem)",
      fontWeight: 900,
      lineHeight: 1.15,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "clamp(2.2rem, 4vw, 3rem)",
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h4: {
      fontSize: "1.6rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.35rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.15rem",
      fontWeight: 700,
    },

    /* ===== BODY TEXT ===== */
    body1: {
      fontSize: "1.125rem", // ~18px
      lineHeight: 1.75,
    },
    body2: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },

    caption: {
      fontSize: "0.9rem",
      color: "#475569",
    },

    button: {
      fontSize: "1rem",
      fontWeight: 700,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    /* ===== GLOBAL BASELINE ===== */
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          "--header-offset": "96px",
        },
        html: {
          scrollBehavior: "smooth",
          scrollPaddingTop: "var(--header-offset)",
        },
        "main [id], section[id], [id]": {
          scrollMarginTop: "var(--header-offset)",
        },
      },
    },

    /* ===== BUTTONS ===== */
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          paddingTop: "0.85rem",
          paddingBottom: "0.85rem",
          paddingLeft: "1.75rem",
          paddingRight: "1.75rem",
          borderRadius: 12,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
            transform: "translateY(-1px)",
          },
        },
      },
    },

    /* ===== CARDS ===== */
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    /* ===== INPUTS ===== */
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontSize: "1rem",
        },
        input: {
          padding: "14px 16px",
        },
      },
    },

    /* ===== LINKS (508 friendly) ===== */
    MuiLink: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          "&:focus-visible": {
            outline: "3px solid #F59E0B",
            outlineOffset: "2px",
            borderRadius: 4,
          },
        },
      },
    },

    /* ===== ICON BUTTONS ===== */
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:focus-visible": {
            outline: "3px solid #F59E0B",
            outlineOffset: "2px",
          },
        },
      },
    },
  },
});

export default theme;
