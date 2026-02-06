import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  taskTitle?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, handleClose, handleDelete, taskTitle }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Delete "{taskTitle}" ?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
