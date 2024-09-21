import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import theme from './theme'; // Import the custom theme
import './index.css'; // Your global styles
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools  } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {queries: {retry: 5, retryDelay: 1000}}
})



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={ queryClient }>
      <ThemeProvider theme={theme}>
        <App />
        <ReactQueryDevtools initialIsOpen={ false } />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
