
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { Box } from '@mui/material';

interface TableProps<T> {
    data: T[];
    columnDefs: ColDef<T>[];
    rowHeight?: number;
    headerHeight?: number;
    paginationPageSize?: number;
}

const Table = <T extends object>({
    data,
    columnDefs,
    rowHeight = 50,
    headerHeight = 50,
    paginationPageSize = 10
}: TableProps<T>) => {
    return (
        <Box sx={{ height: `${headerHeight + (paginationPageSize * rowHeight)}px`, width: '100%', display: 'flex', flexDirection: 'column' }}>
            <div className="ag-theme-alpine" style={{ flex: 1, width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}
                    pagination={true}
                    paginationPageSize={paginationPageSize}
                    domLayout="autoHeight"
                    animateRows={true}
                    rowSelection="single"
                    suppressCellFocus={true}
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}
                    paginationAutoPageSize={false}
                />
            </div>
        </Box>
    );
};

export default Table;