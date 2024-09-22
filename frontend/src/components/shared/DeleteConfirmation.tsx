import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Typography,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName: string;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({ isOpen, onClose, onConfirm, itemName }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="delete-confirmation-dialog-title"
            aria-describedby="delete-confirmation-dialog-description"
            PaperProps={{
                style: {
                    borderRadius: 12,
                    padding: '16px',
                },
            }}
        >
            <DialogTitle id="delete-confirmation-dialog-title">
                <Typography variant="h5" component="span" fontWeight="bold">
                    Confirm Deletion
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <DeleteIcon color="error" fontSize="large" />
                    <Typography variant="body1" ml={2}>
                        You are about to delete:
                    </Typography>
                </Box>
                <Typography variant="h6" fontWeight="medium" color="primary">
                    "{itemName}"
                </Typography>
                <DialogContentText id="delete-confirmation-dialog-description" mt={2}>
                    This action cannot be undone. Are you sure you want to proceed?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error" variant="contained" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmation;