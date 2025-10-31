import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1565C0', // Deep Blue
    },
    secondary: {
      main: '#F9A825', // Warm Yellow
    },
    background: {
      default: '#F5F5F5', // Light Gray
    },
    text: {
      primary: '#212121', // Dark Gray
      secondary: '#757575', // Medium Gray
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