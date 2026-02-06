import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { createTask } from '../../api/tasksApi';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createTask({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
    onTaskCreated();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={3}
        fullWidth
        sx={{ mb: 1 }}
      />
      <TextField
        label="Due date"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        fullWidth
        sx={{ mb: 1 }}
      />
      <Button variant="contained" type="submit">Add</Button>
    </Box>
  );
};

export default TaskForm;
