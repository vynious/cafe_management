import React, { useState, useCallback } from 'react'
import { createFileRoute, Link, useNavigate, useSearch } from '@tanstack/react-router'
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

import { useEmployeeData } from '../../hooks/useEmployeeData'
import type { GetEmployeeResponse, FlattenedGetEmployeeAssignmentResponse } from '../../types/Employee'
import LoadingComponent from '../../components/LoadingComponent'
import ErrorComponent from '../../components/ErrorComponent'
import EmployeeTable from '../../components/employee/EmployeeTable'
import DeleteConfirmation from '../../components/DeleteConfirmation'
import theme from '../../theme'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { flattenEmployeeData } from '../../utils/flatten'
import { deleteEmployee } from '../../api/employeeApi'


const GetEmployeeResponse: React.FC = React.memo(() => {
  const {cafe : initialCafeName } = useSearch({ from: '/employees/' })
  const [cafeQuery, setCafeQuery] = useState(initialCafeName || '')
  const [searchTerm, setSearchTerm] = useState(initialCafeName || '')
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    employeeId: null as string | null,
  })
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { data: rawData, isLoading, isError, error } = useEmployeeData({ cafe: searchTerm })

  const data = React.useMemo(() => {
    if (!rawData) return null;
    return rawData.map(employee => {
      return flattenEmployeeData(employee)
    });
  }, [rawData]);
  console.log(data)

  const handleEditEmployee = useCallback((flattenEmployeeData: FlattenedGetEmployeeAssignmentResponse) => {
    navigate({
      to: '/employees/edit/$id',
      params: { id: flattenEmployeeData.employeeId },
    })
  }, [navigate])

  const handleDeleteEmployee = useCallback((employeeId: string) => {
    setDeleteConfirmation({ isOpen: true, employeeId })
  }, [])


  const confirmDelete = useCallback(async () => {
    if (deleteConfirmation.employeeId) {
      try {
        await deleteEmployee(deleteConfirmation.employeeId)        
        // invalidate and refetch
        queryClient.invalidateQueries({ queryKey: ['employees', searchTerm] })
        window.location.reload()
      } catch (error) {
        alert('Failed to delete employee')
      }
    }
    setDeleteConfirmation({ isOpen: false, employeeId: null })
  }, [deleteConfirmation.employeeId, queryClient, searchTerm])

  const handleSearchSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cafeQuery !== searchTerm) {
      setSearchTerm(cafeQuery);
    }
  }, [cafeQuery, searchTerm]);

  if (isError) return <ErrorComponent error={error} />

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" className="employee-list-container">
        <Typography variant="h4" component="h1" className="employee-list-title" gutterBottom>
          Employee Explorer
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Button
            component={Link}
            to="/employees/add"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Add New Employee
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSearchSubmit} sx={{ mb: 2, display: 'flex', gap: 2 }}>
          <TextField
            label="Search by cafe name"
            variant="outlined"
            value={cafeQuery}
            onChange={(e) => setCafeQuery(e.target.value)}
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
            {data.length} employees found
          </Typography>
        )}

        {isLoading ? (
          <LoadingComponent />
        ) : (
          <EmployeeTable
            data={data}
            onEditEmployee={handleEditEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        )}

        <DeleteConfirmation
          isOpen={deleteConfirmation.isOpen}
          onClose={() => setDeleteConfirmation({ isOpen: false, employeeId: null })}
          onConfirm={confirmDelete}
          itemName={data?.find((employee) => employee.employeeId === deleteConfirmation.employeeId)?.employeeName || 'this employee'}
        />
      </Container>
    </ThemeProvider>
  )
})

export const Route = createFileRoute('/employees/')({
  component: GetEmployeeResponse,
})

export default GetEmployeeResponse