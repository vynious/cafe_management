import React from 'react';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';
import { Link as RouterLink } from '@tanstack/react-router';
import CoffeeIcon from '@mui/icons-material/Coffee';

interface TopBarProps {
    currentPath: '/cafes' | '/employees';
}

const TopBar: React.FC<TopBarProps> = ({ currentPath }) => {
    return (
        <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
                <CoffeeIcon sx={{ mr: 2, color: 'primary.main' }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'text.primary' }}>
                    Cafe Management
                </Typography>
                <Box>
                    <Button
                        component={RouterLink}
                        to="/cafes"
                        sx={{
                            mr: 2,
                            color: currentPath === '/cafes' ? 'primary.main' : 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'primary.main',
                            },
                        }}
                    >
                        Cafes
                    </Button>
                    <Button
                        component={RouterLink}
                        to="/employees"
                        sx={{
                            color: currentPath === '/employees' ? 'primary.main' : 'text.secondary',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                color: 'primary.main',
                            },
                        }}
                    >
                        Employees
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;