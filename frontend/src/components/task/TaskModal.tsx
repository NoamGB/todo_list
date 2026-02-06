import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  InputAdornment,
} from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import EventIcon from '@mui/icons-material/Event';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: any) => void;
  task?: any;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  handleSave,
  task,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title ?? '');
      setDescription(task.description ?? '');
      setDueDate(task.dueDate ?? '');
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [task, open]);

  const save = () => {
    handleSave({ title, description, dueDate });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 0 }}>
        {task ? 'Modifier la tâche' : 'Nouvelle tâche'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            autoFocus
            label="Titre"
            fullWidth
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TitleIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Description (optionnel)"
            fullWidth
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Date d'échéance"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EventIcon color="action" fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button onClick={handleClose} color="inherit">
          Annuler
        </Button>
        <Button onClick={save} variant="contained">
          {task ? 'Enregistrer' : 'Ajouter'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
