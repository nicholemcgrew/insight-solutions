// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    // Premium charcoal primary (trust + modern)
    primary: {
      main: "#0B1220",
      contrastText: "#FFFFFF",
    },
    // Teal accent (clean + modern, not “yellow CTA”)
    secondary: {
      main: "#14B8A6",
      contrastText: "#06201D",
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569",
    },
    divider: "rgba(15, 23, 42, 0.10)",
    action: {
      hover: "rgba(15, 23, 42, 0.06)",
      selected: "rgba(20, 184, 166, 0.14)",
      focus: "rgba(20, 184, 166, 0.18)",
    },
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',

    h1: {
      fontSize: "clamp(2.6rem, 5vw, 4.5rem)",
      fontWeight: 900,
      lineHeight: 1.12,
      letterSpacing: "-0.02em",
    },
    h2: {
      fontSize: "clamp(2.05rem, 3.6vw, 3rem)",
      fontWeight: 800,
      lineHeight: 1.18,
      letterSpacing: "-0.01em",
    },
    h3: {
      fontSize: "clamp(1.65rem, 2.8vw, 2.25rem)",
      fontWeight: 750,
      lineHeight: 1.22,
    },
    h4: { fontSize: "1.6rem", fontWeight: 700 },
    h5: { fontSize: "1.35rem", fontWeight: 700 },
    h6: { fontSize: "1.15rem", fontWeight: 700 },

    body1: { fontSize: "1.125rem", lineHeight: 1.75 },
    body2: { fontSize: "1rem", lineHeight: 1.6 },

    caption: { fontSize: "0.9rem", color: "#475569" },

    button: {
      fontSize: "0.95rem",
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: "0.01em",
    },
  },

  shape: {
    borderRadius: 12, // keep cards/inputs nice
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ":root": {
          // taller navbar offsets (matches updated Navbar below)
          "--header-offset": "88px",
        },

        "@media (max-width: 900px)": {
          ":root": { "--header-offset": "72px" },
        },

        html: {
          scrollBehavior: "smooth",
          scrollPaddingTop: "var(--header-offset)",
        },

        body: {
          margin: 0,
          textRendering: "optimizeLegibility",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },

        "#root": {
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        },

        "main [id], section[id], [id]": {
          scrollMarginTop: "var(--header-offset)",
        },

        "*:focus-visible": {
          outline: "3px solid #14B8A6",
          outlineOffset: "3px",
          borderRadius: "0px", // <- keeps navbar focus from looking rounded
        },
      },
    },

    MuiContainer: {
      defaultProps: {
        maxWidth: false,
        disableGutters: true,
      },
      styleOverrides: {
        root: {
          width: "100%",
          paddingLeft: "clamp(16px, 4vw, 80px)",
          paddingRight: "clamp(16px, 4vw, 80px)",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "linear-gradient(135deg, #050A14, #0B1220 60%, #0B1220)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 14px 34px rgba(0,0,0,0.22)",
          backdropFilter: "saturate(160%) blur(12px)",
          WebkitBackdropFilter: "saturate(160%) blur(12px)",
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "88px",
          "@media (max-width: 900px)": {
            minHeight: "72px",
          },
        },
      },
    },

    // Do NOT force rounding for nav (we’ll avoid Buttons in the nav anyway)
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: "transform 140ms ease, box-shadow 140ms ease, background-color 140ms ease",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow: "0 10px 30px rgba(2, 6, 23, 0.08)",
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontSize: "1rem",
          backgroundColor: "#FFFFFF",
        },
        input: {
          padding: "14px 16px",
        },
      },
    },
  },
});

export default theme;
