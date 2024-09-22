import React from 'react';
import { ColDef } from 'ag-grid-community';
import { Button, Box, Tooltip } from '@mui/material';
import { FlattenedGetEmployeeAssignmentResponse } from '../types/Employee';
import Table from './Table';

interface EmployeeTableProps {
    data: FlattenedGetEmployeeAssignmentResponse[] | null;
    onEditEmployee: (employee: FlattenedGetEmployeeAssignmentResponse) => void;
    onDeleteEmployee: (employeeId: string) => void;
}

const ActionButtons: React.FC<{
    employee: FlattenedGetEmployeeAssignmentResponse;
    onEdit: (employee: FlattenedGetEmployeeAssignmentResponse) => void;
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
    const createTooltipRenderer = (field: keyof FlattenedGetEmployeeAssignmentResponse) => (params: any) => (
        <Tooltip title={params.value}>
            <span>{params.value}</span>
        </Tooltip>
    );

    const columnDefs: ColDef<FlattenedGetEmployeeAssignmentResponse>[] = [
        { field: 'employeeId', headerName: 'ID', width: 70, cellRenderer: createTooltipRenderer('employeeId') },
        { field: 'employeeName', headerName: 'Name', flex: 1, minWidth: 150, cellRenderer: createTooltipRenderer('employeeName') },
        { field: 'employeeEmail', headerName: 'Email', flex: 1, minWidth: 200, cellRenderer: createTooltipRenderer('employeeEmail') },
        { field: 'employeePhoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, cellRenderer: createTooltipRenderer('employeePhoneNumber') },
        { field: 'employeeDaysWorked', headerName: 'Days Worked', width: 120, cellRenderer: createTooltipRenderer('employeeDaysWorked') },
        { field: 'cafeName', headerName: 'Cafe', flex: 1, minWidth: 150, cellRenderer: createTooltipRenderer('cafeName') },
        {
            headerName: 'Actions',
            cellRenderer: (params: any) => (
                <ActionButtons
                    employee={params.data}
                    onEdit={onEditEmployee}
                    onDelete={onDeleteEmployee}
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


export default EmployeeTable;