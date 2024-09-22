import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4C9A9A', 
      light: '#B9DFDF', 
      dark: '#2E6F6F', 
      contrastText: '#FFFFFF' 
    },
    secondary: {
      main: '#8F4A4A', 
      light: '#D4A0A0',
      dark: '#5F2E2E', 
      contrastText: '#FFFFFF' 
    },
    error: {
      main: '#D32F2F' 
    },
    warning: {
      main: '#FFA000' 
    },
    info: {
      main: '#0288D1' 
    },
    success: {
      main: '#388E3C' 
    },
    background: {
      default: '#F5F5F5', 
      paper: '#FFFFFF' 
    },
    text: {
      primary: '#333333', 
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif'
  }
});

export default theme;
