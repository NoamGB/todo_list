import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';

interface DeleteDialogProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  taskTitle?: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  open,
  handleClose,
  handleDelete,
  taskTitle,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmberRoundedIcon color="error" />
        Confirmer la suppression
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Êtes-vous sûr de vouloir supprimer la tâche
          {taskTitle ? (
            <>
              {' « '}
              <strong>{taskTitle}</strong>
              {' » '}
            </>
          ) : (
            ' '
          )}
          ? Cette action est irréversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit">
          Annuler
        </Button>
        <Button onClick={handleDelete} color="error" variant="contained">
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
