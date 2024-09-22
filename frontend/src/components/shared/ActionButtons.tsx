import { Box } from '@mui/material';
import Button from './Button';


interface ActionButtonsProps<T> {
    item: T;
    onEdit: (item: T) => void;
    onDelete: (id: string) => void;
    idField: keyof T;
}

const ActionButtons = <T,>({ item, onEdit, onDelete, idField }: ActionButtonsProps<T>) => (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Button variant="contained" color="primary" onClick={() => onEdit(item)} sx={{ mr: 1 }}>
            Edit
        </Button>
        <Button variant="contained" color="error" onClick={() => onDelete(item[idField] as string)}>
            Delete
        </Button>
    </Box>
);

export default ActionButtons;