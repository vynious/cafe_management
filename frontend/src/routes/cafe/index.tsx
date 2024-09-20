import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { useCafeData } from './-hooks/useCafeData';
import type { Cafe } from '../../types/Cafe';
import LoadingComponent from '../../components/LoadingComponent';
import ErrorComponent from '../../components/ErrorComponent';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { Button } from '../../components/Button'; // Assuming you have a Button component

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

// Define the props type for the Cafe component
interface CafeProps {
    location?: string;
}

// Memoize Cafe component to prevent unnecessary re-renders
const Cafe: React.FC<CafeProps> = React.memo(({ location = '' }) => {
    // Define the params with the default location value
    const params = {
        location,
    };

    const { data, isLoading, isError, error } = useCafeData(params);

    const columnDefs: ColDef<Cafe>[] = [
        { field: 'logo', headerName: '' }, // to be replaced
        { field: 'name', headerName: 'Cafe Name', sortable: true },
        { field: 'location', headerName: 'Address', sortable: true },
        { field: 'description', headerName: 'Description', sortable: true },
        { field: '_count.employees', headerName: 'Employee count', sortable: true },
        {
            headerName: 'Actions',
            cellRenderer: (params: any) => (
                <div>
                    <Button onClick={() => handleEditCafe(params.data)}>Edit</Button>
                    <Button onClick={() => handleDeleteCafe(params.data.id)}>Delete</Button>
                </div>
            ),
            sortable: false,
            filter: false,
            width: 200,
        }
    ];

    const handleEditCafe = (cafe: Cafe) => {
        // Implement edit functionality
        console.log('Edit cafe:', cafe);
    };

    const handleDeleteCafe = (cafeId: string) => {
        // Implement delete functionality
        console.log('Delete cafe with ID:', cafeId);
    };

    // Debugging info (remove in production)
    console.log(data);

    // Loading state
    if (isLoading) {
        return <LoadingComponent />;
    }

    // Error state
    if (isError) {
        return <ErrorComponent error={error} />;
    }

    // No data available
    if (!data || data.length === 0) {
        return <div>No cafes found in this location.</div>;
    }

    return (
        <>
            <h1>Cafes List</h1>
            <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}
                    pagination={true}
                />
            </div>
        </>
    );
});

// Define the route after the Cafe component is declared
export const Route = createFileRoute('/cafe/')({
    component: Cafe,
});

export default Cafe;