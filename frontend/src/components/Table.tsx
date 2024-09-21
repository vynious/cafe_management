import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import type { Cafe } from '../types/Cafe';
import { Box, Button, Link } from '@mui/material';
import { Link as TanstackLink } from '@tanstack/react-router';

interface CafeTableProps {
    data: Cafe[];
    onEditCafe: (cafe: Cafe) => void;
    onDeleteCafe: (cafeId: string) => void;
}

const CafeTable: React.FC<CafeTableProps> = ({ data, onEditCafe, onDeleteCafe }) => {
    const columnDefs: ColDef<Cafe>[] = [
        {
            field: 'logo',
            headerName: '',
            cellRenderer: (params: { value: string }) => (
                <img
                    src={params.value}
                    alt="Cafe logo"
                    className="cafe-logo"
                    style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                />
            ),
            width: 60,
            sortable: false,
            filter: false,
        },
        { field: 'name', headerName: 'Cafe Name', flex: 1, minWidth: 150 },
        { field: 'location', headerName: 'Location', flex: 1, minWidth: 120 },
        { field: 'description', headerName: 'Description', flex: 2, minWidth: 200 },
        {
            field: 'employees',
            headerName: 'Employees',
            width: 150,
            cellRenderer: (params: { data: Cafe }) => (
                <EmployeesLink cafe={params.data} />
            ),
        },
        {
            headerName: 'Actions',
            cellRenderer: (params: { data: Cafe }) => (
                <ActionButtons cafe={params.data} onEdit={onEditCafe} onDelete={onDeleteCafe} />
            ),
            sortable: false,
            filter: false,
            width: 200,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
    ];

    return (
        <Box sx={{ height: `${50 + (10 * 50)}px`, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="ag-theme-alpine" style={{ flex: 1, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}
                    pagination={true}
                    paginationPageSize={10}
                    domLayout="autoHeight"
                    animateRows={true}
                    rowSelection="single"
                    suppressCellFocus={true}
                    rowHeight={50}
                    headerHeight={50}
                    paginationAutoPageSize={false}
                />
            </div>
        </Box>
    );
};

const EmployeesLink: React.FC<{ cafe: Cafe }> = ({ cafe }) => (
    <TanstackLink
        to="/employees"
        search={{ cafe: cafe.name }}
        style={{ textDecoration: 'none', display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
    >
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer'
                }
            }}
        >
            <span role="img" aria-label="View employees" style={{ marginRight: '4px' }}>👥</span>
            <Link component="span" variant="body2">
                {`${cafe._count.employees} employee${cafe._count.employees !== 1 ? '' : ''}`}
            </Link>
        </Box>
    </TanstackLink>
);

const ActionButtons: React.FC<{ cafe: Cafe, onEdit: (cafe: Cafe) => void, onDelete: (cafeId: string) => void }> = ({ cafe, onEdit, onDelete }) => (
    <Box className="action-buttons" sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
            variant="contained"
            color="primary"
            onClick={() => onEdit(cafe)}
            sx={{ marginRight: 1 }}
        >
            Edit
        </Button>
        <Button
            variant="contained"
            color="secondary"
            onClick={() => onDelete(cafe.id)}
        >
            Delete
        </Button>
    </Box>
);

export default CafeTable;