import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingComponent: React.FC = () => (
    <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        position="fixed"
        top={0}
        left={0}
        bgcolor="rgba(255, 255, 255, 0.8)"
        zIndex={9999}
        gap={2}
    >
        <CircularProgress size={40} thickness={4} />
        <Typography variant="body1" color="text.secondary">
            Loading
        </Typography>
    </Box>
);

export default LoadingComponent;