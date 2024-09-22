import React from 'react';
import { ColDef } from 'ag-grid-community';
import type { GetCafeResponse } from '../../types/Cafe';
import { Box, Link, Tooltip } from '@mui/material';
import { Link as TanstackLink } from '@tanstack/react-router';
import Table from '../shared/Table';
import ActionButtons from '../shared/ActionButtons';
import TooltipCell from '../shared/Tooltip';

interface CafeTableProps {
    data: GetCafeResponse[];
    onEditCafe: (cafe: GetCafeResponse) => void;
    onDeleteCafe: (cafeId: string) => void;
}

const EmployeesLink: React.FC<{ cafe: GetCafeResponse }> = ({ cafe }) => (
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
                {`${cafe._count?.employees} employee${cafe._count?.employees !== 1 ? '' : ''}`}
            </Link>
        </Box>
    </TanstackLink>
);

const CafeTable: React.FC<CafeTableProps> = ({ data, onEditCafe, onDeleteCafe }) => {
    const columnDefs: ColDef<GetCafeResponse>[] = [
        {
            field: 'logo',
            headerName: '',
            cellRenderer: (params: { data: GetCafeResponse }) => {
                return (
                    <Tooltip title="Cafe Logo">
                        <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/cafe_logos/${params.data.logo}`}
                            alt="Cafe logo"
                            className="cafe-logo"
                            style={{ width: '40px', height: '40px', objectFit: 'contain' }}
                        />
                    </Tooltip>
                );
            },
            width: 60,
            sortable: false,
            filter: false,
        },
        { field: 'id', headerName: 'ID', width: 70, cellRenderer: TooltipCell },
        { field: 'name', headerName: 'Cafe Name', flex: 1, minWidth: 150, cellRenderer: TooltipCell },
        { field: 'location', headerName: 'Location', flex: 1, minWidth: 120, cellRenderer: TooltipCell },
        { field: 'description', headerName: 'Description', flex: 2, minWidth: 200, cellRenderer: TooltipCell },
        {
            headerName: 'Employees',
            width: 150,
            cellRenderer: (params: { data: GetCafeResponse }) => (
                <EmployeesLink cafe={params.data} />
            ),
        },
        {
            headerName: 'Actions',
            cellRenderer: (params: { data: GetCafeResponse }) => (
                <ActionButtons
                    item={params.data}
                    onEdit={onEditCafe}
                    onDelete={onDeleteCafe}
                    idField="id"
                />
            ),
            sortable: false,
            filter: false,
            width: 200,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
    ];

    return <Table data={data} columnDefs={columnDefs} />;
};


export default CafeTable;