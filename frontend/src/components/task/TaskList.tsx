import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface TaskListProps {
  tasks: any[];
  onEdit: (task: any) => void;
  onDelete: (task: any) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <Stack spacing={3} mt={3}>
      {tasks.map((task) => (
        <Card key={task.id} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            {/* Title and description */}
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {task.description}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Due date: {task.dueDate}
            </Typography>

            {/* Boutons alignés à droite */}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <IconButton color="primary" onClick={() => onEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(task)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default TaskList;
