import React, { useState, useCallback } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ThemeProvider } from '@mui/material/styles'
import { useQueryClient } from '@tanstack/react-query'
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
import LoadingComponent from '../../components/shared/LoadingComponent'
import ErrorComponent from '../../components/shared/ErrorComponent'
import CafeTable from '../../components/cafe/CafeTable'
import DeleteConfirmation from '../../components/shared/DeleteConfirmation'
import theme from '../../theme'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { deleteCafe } from '../../api/cafeApi'
import TopBar from '../../components/shared/TopBar'

const GetCafeResponse: React.FC = React.memo(() => {
    const [locationQuery, setLocationQuery] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        isOpen: false,
        cafeId: null as string | null,
    })
    const queryClient = useQueryClient()

    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useCafeData({ location: searchTerm })

    const handleEditCafe = useCallback((cafe: GetCafeResponse) => {
        navigate({
            to: '/cafes/edit/$id',
            params: { id: cafe.id },
        })
    }, [navigate])

    const handleDeleteCafe = useCallback((cafeId: string) => {
        setDeleteConfirmation({ isOpen: true, cafeId })
    }, [])

    const confirmDelete = useCallback(async () => {
        if (deleteConfirmation.cafeId) {
            try {
                await deleteCafe(deleteConfirmation.cafeId)
                queryClient.invalidateQueries({ queryKey: ['cafes', searchTerm] })
                window.location.reload()
            } catch (error) {
                alert('Failed to delete cafe')
            }
        }
        setDeleteConfirmation({ isOpen: false, cafeId: null })
    }, [deleteConfirmation.cafeId, queryClient, searchTerm])

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
                <TopBar currentPath="/cafes" />
                <Box sx={{ mt: 2, mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" component="h1" className="cafe-list-title">
                        Cafe Explorer
                    </Typography>
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
                        data={data || []}
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