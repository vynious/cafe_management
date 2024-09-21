import React, { useState, useCallback } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ThemeProvider } from '@mui/material/styles'
import {
    Button,
    TextField,
    Container,
    Typography,
    Box,
    LinearProgress,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import SearchIcon from '@mui/icons-material/Search'

import { useCafeData } from '../../hooks/useCafeData'
import type { GetCafeResponse } from '../../types/Cafe'
import LoadingComponent from '../../components/LoadingComponent'
import ErrorComponent from '../../components/ErrorComponent'
import CafeTable from '../../components/Table'
import DeleteConfirmation from '../../components/DeleteConfirmation'
import theme from '../../theme'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'

const GetCafeResponse: React.FC = React.memo(() => {
    const [locationQuery, setLocationQuery] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        cafeId: null as string | null,
    })
    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useCafeData({ location: searchTerm })

    const handleEditCafe = useCallback((cafe: GetCafeResponse) => {
        navigate({
            to: '/cafes/edit/$id',
            params: { id: cafe.id },
            search: { cafeData: GetCafeResponse }
        })
    }, [navigate])


    const handleDeleteCafe = useCallback((cafeId: string) => {
        setDeleteConfirmation({ isOpen: true, cafeId })
    }, [])

    const confirmDelete = useCallback(async () => {
        if (deleteConfirmation.cafeId) {
            try {
                console.log('Deleting cafe:', deleteConfirmation.cafeId)
                // TODO: Implement actual delete functionality
                alert('Cafe deleted successfully')
            } catch (error) {
                alert('Failed to delete cafe')
            }
        }
        setDeleteConfirmation({ isOpen: false, cafeId: null })
    }, [deleteConfirmation.cafeId])


    const handleSearchSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (locationQuery !== searchTerm) {
            setSearchTerm(locationQuery);
        }
    }, [locationQuery, searchTerm]);

    if (isError) return <ErrorComponent error={error} />

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg" className="cafe-list-container">
                <Typography variant="h4" component="h1" className="cafe-list-title" gutterBottom>
                    Cafe Explorer
                </Typography>

                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Button
                        component={Link}
                        to="/cafes/add"
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Add New Cafe
                    </Button>
                </Box>

                <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2, display: 'flex', gap: 2 }}>
                    <TextField
                        label="Search by location"
                        variant="outlined"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        fullWidth
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon />}
                    >
                        Search
                    </Button>
                </Box>

                {isLoading && <LinearProgress />}

                {data && (
                    <Typography variant="subtitle1" gutterBottom>
                        {data.length} cafes found
                    </Typography>
                )}

                {isLoading ? (
                    <LoadingComponent />
                ) : (
                    <CafeTable
                        data={data}
                        onEditCafe={handleEditCafe}
                        onDeleteCafe={handleDeleteCafe}
                    />
                )}

                <DeleteConfirmation
                    isOpen={deleteConfirmation.isOpen}
                    onClose={() => setDeleteConfirmation({ isOpen: false, cafeId: null })}
                    onConfirm={confirmDelete}
                    itemName={data?.find((cafe) => cafe.id === deleteConfirmation.cafeId)?.name || 'this cafe'}
                />
            </Container>
        </ThemeProvider>
    )
})

export const Route = createFileRoute('/cafes/')({
    component: GetCafeResponse,
})

export default GetCafeResponse