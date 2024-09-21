import React from 'react';
import { ColDef } from 'ag-grid-community';
import { Button, Box, Tooltip } from '@mui/material';
import { GetEmployeeResponse } from '../types/Employee';
import Table from './Table';

interface EmployeeTableProps {
    data: GetEmployeeResponse[];
    onEditEmployee: (employee: GetEmployeeResponse) => void;
    onDeleteEmployee: (employeeId: string) => void;
}

const ActionButtons: React.FC<{
    employee: GetEmployeeResponse;
    onEdit: (employee: GetEmployeeResponse) => void;
    onDelete: (employeeId: string) => void;
}> = ({ employee, onEdit, onDelete }) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button variant="contained" color="primary" onClick={() => onEdit(employee)} sx={{ mr: 1 }}>
            Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(employee.id)}>
            Delete
        </Button>
    </Box>
);

const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, onEditEmployee, onDeleteEmployee }) => {
    const createTooltipRenderer = (field: keyof GetEmployeeResponse) => (params: any) => (
        <Tooltip title={params.value}>
            <span>{params.value}</span>
        </Tooltip>
    );

    const columnDefs: ColDef<GetEmployeeResponse>[] = [
        { field: 'id', headerName: 'ID', width: 70, cellRenderer: createTooltipRenderer('id') },
        { field: 'name', headerName: 'Name', width: 130, cellRenderer: createTooltipRenderer('name') },
        { field: 'email', headerName: 'Email', width: 200, cellRenderer: createTooltipRenderer('email') },
        { field: 'phone_number', headerName: 'Phone Number', width: 130, cellRenderer: createTooltipRenderer('phone_number') },
        { field: 'daysWorked', headerName: 'Days Worked', width: 130, cellRenderer: createTooltipRenderer('daysWorked') },
        { field: 'cafe', headerName: 'Cafe', width: 130, cellRenderer: createTooltipRenderer('cafe') },
        {
            headerName: 'Actions',
            sortable: false,
            filter: false,
            width: 200,
            cellRenderer: (params: any) => (
                <ActionButtons
                    employee={params.data}
                    onEdit={onEditEmployee}
                    onDelete={onDeleteEmployee}
                />
            ),
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
        },
    ];

    return <Table data={data} columnDefs={columnDefs} />;
};

export default EmployeeTable;