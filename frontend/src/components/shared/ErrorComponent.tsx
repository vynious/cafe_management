import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

// Define the props type for the error component
interface ErrorComponentProps {
    error: Error | null;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => (
    <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {error?.message || 'An unexpected error occurred.'}
    </Alert>
);

export default ErrorComponent;