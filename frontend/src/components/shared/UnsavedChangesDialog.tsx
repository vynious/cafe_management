import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'

interface UnsavedChangesDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const UnsavedChangesDialog: React.FC<UnsavedChangesDialogProps> = ({ open, onClose, onConfirm }) => (
    <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
            sx: {
                borderRadius: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
        }}
    >
        <DialogTitle
            id="alert-dialog-title"
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', py: 2 }}
        >
            Unsaved Changes
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
            <DialogContentText id="alert-dialog-description">
                You have unsaved changes. Are you sure you want to leave without saving?
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
            <Button onClick={onClose} variant="outlined" color="primary">
                Stay
            </Button>
            <Button onClick={onConfirm} variant="contained" color="error">
                Leave without saving
            </Button>
        </DialogActions>
    </Dialog>
)