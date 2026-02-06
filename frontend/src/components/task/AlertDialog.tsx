import React, { useEffect } from 'react';
import { Dialog, DialogContent, Typography, Box } from '@mui/material';

interface AlertDialogProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type?: 'success' | 'error';
  duration?: number; // temps en ms avant fermeture auto
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onClose,
  message,
  type = 'success',
  duration = 3000,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [open, duration, onClose]);

  const bgColor = type === 'success' ? 'green' : 'red';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiPaper-root': {
          position: 'fixed',
          top: 20,
          right: 20,
          m: 0,
          width: 300,
          backgroundColor: bgColor,
          color: 'white',
          borderRadius: 2,
        },
      }}
      hideBackdrop
    >
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
