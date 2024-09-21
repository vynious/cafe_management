import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4C9A9A', // Primary 600 shade color from the image
      light: '#B9DFDF', // Primary 200 shade color
      dark: '#2E6F6F', // Primary 800 shade color
      contrastText: '#FFFFFF' // Default contrast text
    },
    secondary: {
      main: '#8F4A4A', // Complementary 400 shade color from the image
      light: '#D4A0A0', // Complementary 200 shade color
      dark: '#5F2E2E', // Complementary 800 shade color
      contrastText: '#FFFFFF' // Default contrast text
    },
    error: {
      main: '#D32F2F' // Default error color
    },
    warning: {
      main: '#FFA000' // Default warning color
    },
    info: {
      main: '#0288D1' // Default info color
    },
    success: {
      main: '#388E3C' // Default success color
    },
    background: {
      default: '#F5F5F5', // Background color for the app
      paper: '#FFFFFF' // Background color for paper components
    },
    text: {
      primary: '#333333', // Default text color
      secondary: '#666666' // Secondary text color
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  }
});

export default theme;
