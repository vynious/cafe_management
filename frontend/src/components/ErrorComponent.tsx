import React from 'react';

// Define the props type for the error component
interface ErrorComponentProps {
    error: Error | null;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({ error }) => (
    <div className="error-container">
        Error: {error?.message || 'An unexpected error occurred.'}
    </div>
);

export default ErrorComponent;
