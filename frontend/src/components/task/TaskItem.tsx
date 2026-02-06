import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task,deleteTask } from '../../api/tasksApi';

interface TaskItemProps {
  task: Task;
  onDeleted: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onDeleted }) => {
  const handleDelete = async () => {
    await deleteTask(task.id);
    onDeleted();
  };

  return (
    <Box sx={{ border: '1px solid #ccc', p: 1, mb: 1, borderRadius: 1 }}>
      <Typography variant="h6">{task.title}</Typography>
      <Typography variant="body2">{task.description}</Typography>
      <Typography variant="caption">Due: {task.dueDate || 'Pas de date'}</Typography>
      <IconButton onClick={handleDelete} color="error" size="small">
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default TaskItem;
