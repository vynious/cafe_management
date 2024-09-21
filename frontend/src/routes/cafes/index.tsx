import React, { useState, useCallback } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useCafeData } from '../../hooks/useCafeData';
import type { Cafe } from '../../types/Cafe';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import CafeTable from '../../components/Table';
import DeleteConfirmation from '../../components/DeleteConfirmation';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import theme from '../../theme';

const Cafe: React.FC = React.memo(() => {
    const [locationQuery, setLocationQuery] = useState('');
    const [submittedLocation, setSubmittedLocation] = useState('');
    const { data, isLoading, isError, error } = useCafeData({ location: submittedLocation });
    const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; cafeId: string | null }>({
        isOpen: false,
        cafeId: null,
    });

    const handleLocationSearch = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setSubmittedLocation(locationQuery);
        },
        [locationQuery]
    );

    const handleEditCafe = (cafe: Cafe) => {
        // TODO: edit functionality
        console.log('Edit cafe:', cafe);
    };

    const handleDeleteCafe = (cafeId: string) => {
        setDeleteConfirmation({ isOpen: true, cafeId });
    };

    const confirmDelete = () => {
        if (deleteConfirmation.cafeId) {
            // TODO: delete functionality
            console.log('Deleting cafe with ID:', deleteConfirmation.cafeId);
        }
        setDeleteConfirmation({ isOpen: false, cafeId: null });
    };

    if (isLoading) return <LoadingComponent />;
    if (isError) return <ErrorComponent error={error} />;

    return (
        <ThemeProvider theme={theme}>
            <Container className="cafe-list-container">
                <Typography variant="h4" component="h1" className="cafe-list-title" gutterBottom>
                    Cafes Data
                </Typography>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Button
                        component={Link}
                        to="/cafes/add"
                        variant="contained"
                        color="primary"
                    >
                        Add New Cafe
                    </Button>
                </Box>
                <Box component="form" onSubmit={handleLocationSearch} className="location-search" mb={3}>
                    <TextField
                        label="Search by location"
                        variant="outlined"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Search
                    </Button>
                </Box>
                <CafeTable
                    data={data}
                    onEditCafe={handleEditCafe}
                    onDeleteCafe={handleDeleteCafe}
                />
                <DeleteConfirmation
                    isOpen={deleteConfirmation.isOpen}
                    onClose={() => setDeleteConfirmation({ isOpen: false, cafeId: null })}
                    onConfirm={confirmDelete}
                    itemName={data?.find(cafe => cafe.id === deleteConfirmation.cafeId)?.name || 'this cafe'}
                />
            </Container>
        </ThemeProvider>
    );
});

export const Route = createFileRoute('/cafes/')({
    component: Cafe,
});

export default Cafe;