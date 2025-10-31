import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1E3A8A', // Deeper Navy Blue for trust
    },
    secondary: {
      main: '#F59E0B', // Warm Amber for energy
    },
    background: {
      default: '#F8FAFC', // Soft Slate for calm
    },
    text: {
      primary: '#0F172A', // Dark Slate for readability
      secondary: '#64748B', // Medium Slate for secondary text
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;