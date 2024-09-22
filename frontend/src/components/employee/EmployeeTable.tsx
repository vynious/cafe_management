import React from 'react';
import { ColDef } from 'ag-grid-community';
import { Tooltip } from '@mui/material';
import { FlattenedGetEmployeeAssignmentResponse } from '../../types/Employee';
import Table from '../Table';
import ActionButtons from '../ActionButtons';
import TooltipCell from '../Tooltip';


interface EmployeeTableProps {
    data: FlattenedGetEmployeeAssignmentResponse[] | null;
    onEditEmployee: (employee: FlattenedGetEmployeeAssignmentResponse) => void;
    onDeleteEmployee: (employeeId: string) => void;
}


const EmployeeTable: React.FC<EmployeeTableProps> = ({ data, onEditEmployee, onDeleteEmployee }) => {

    const columnDefs: ColDef<FlattenedGetEmployeeAssignmentResponse>[] = [
        { field: 'employeeId', headerName: 'ID', width: 70, cellRenderer: TooltipCell },
        { field: 'employeeName', headerName: 'Name', flex: 1, minWidth: 150, cellRenderer: TooltipCell },
        { field: 'employeeEmail', headerName: 'Email', flex: 1, minWidth: 200, cellRenderer: TooltipCell },
        { field: 'employeePhoneNumber', headerName: 'Phone Number', flex: 1, minWidth: 150, cellRenderer: TooltipCell },
        { field: 'employeeDaysWorked', headerName: 'Days Worked', width: 120, cellRenderer: TooltipCell },
        { field: 'cafeName', headerName: 'Cafe', flex: 1, minWidth: 150, cellRenderer: TooltipCell },
        {
            headerName: 'Actions',
            cellRenderer: (params: { data: FlattenedGetEmployeeAssignmentResponse }) => (
                <ActionButtons
                    item={params.data}
                    onEdit={onEditEmployee}
                    onDelete={onDeleteEmployee}
                    idField="employeeId"
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