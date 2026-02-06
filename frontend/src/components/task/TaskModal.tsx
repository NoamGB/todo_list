import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (data: any) => void;
  task?: any;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose, handleSave, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDueDate(task.dueDate);
    } else {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  }, [task]);

  const save = () => {
    handleSave({ title, description, dueDate });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{task ? 'Modify task' : 'New task'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description (optional)"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Due date"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={save} variant="contained" color="primary">
          {task ? 'Modify' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
