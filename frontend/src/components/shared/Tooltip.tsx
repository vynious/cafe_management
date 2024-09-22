import React from 'react';
import { Tooltip } from '@mui/material';

interface TooltipCellProps {
    value: string | number;
}

const TooltipCell: React.FC<TooltipCellProps> = ({ value }) => (
    <Tooltip title={value}>
        <span>{value}</span>
    </Tooltip>
);

export default TooltipCell;