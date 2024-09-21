import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import type { Cafe } from '../types/Cafe';
import { Box, Button } from '@mui/material';
import { Employee } from '../types/Employee';

interface CafeTableProps {
    data: Cafe[];
    onEditCafe: (cafe: Cafe) => void;
    onDeleteCafe: (cafeId: string) => void;
}

interface EmployeeTableProps {
    data: Employee[]
    onEditEmployee: (employee: Employee) => void;
    onDeleteEmployee: (employeeId: string) => void;

}

const CafeTable: React.FC<CafeTableProps> = ({ data, onEditCafe, onDeleteCafe }) => {
    const columnDefs: ColDef<Cafe>[] = [
        {
            field: 'logo',
            headerName: '',
            cellRenderer: (params: { value: string }) => (
                <img src={params.value} alt="Cafe logo" className="cafe-logo" />
            ),
            width: 80,
            sortable: false,
            filter: false,
        },
        {
            field: 'name',
            headerName: 'Cafe Name',
            flex: 1,
            minWidth: 150,
        },
        {
            field: 'location',
            headerName: 'Location',
            flex: 1,
            minWidth: 120,
        },
        {
            field: 'description',
            headerName: 'Description',
            flex: 2,
            minWidth: 200,
        },
        {
            headerName: 'Actions',
            cellRenderer: (params: { data: Cafe }) => (
                <Box className="action-buttons">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => onEditCafe(params.data)} // Call onEditCafe with selected cafe data
                        sx={{ marginRight: 1 }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => onDeleteCafe(params.data.id)}
                    >
                        Delete
                    </Button>
                </Box>
            ),
            sortable: false,
            filter: false,
            width: 200,
        },
    ];

    return (
        <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
            <AgGridReact
                columnDefs={columnDefs}
                rowData={data}
                pagination={true}
                paginationPageSize={10}
                domLayout="autoHeight"
                animateRows={true}
                rowSelection="single"
            />
        </div>
    );
};

export default CafeTable;
