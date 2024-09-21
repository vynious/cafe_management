import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingComponent: React.FC = () => (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <CircularProgress />
        <Typography>Loading...</Typography>
    </Box>
);

export default LoadingComponent;