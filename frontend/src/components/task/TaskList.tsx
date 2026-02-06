import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Stack,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EventIcon from '@mui/icons-material/Event';

interface TaskListProps {
  tasks: any[];
  onEdit: (task: any) => void;
  onDelete: (task: any) => void;
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <Box
        sx={{
          py: 6,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Typography variant="body1">
          Aucune tâche pour le moment. Cliquez sur « Ajouter une tâche » pour commencer.
        </Typography>
      </Box>
    );
  }

  return (
    <Stack spacing={2}>
      {tasks.map((task) => (
        <Card
          key={task.id}
          variant="outlined"
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
            '&:hover': {
              borderColor: 'primary.main',
              borderWidth: 1,
            },
          }}
        >
          <CardContent sx={{ '&:last-child': { pb: 2 } }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 1,
              }}
            >
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom noWrap>
                  {task.title}
                </Typography>
                {task.description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {task.description}
                  </Typography>
                )}
                <Box sx={{ mt: 1.5 }}>
                  <Chip
                    size="small"
                    icon={<EventIcon sx={{ fontSize: 16 }} />}
                    label={formatDate(task.dueDate)}
                    variant="outlined"
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexShrink: 0 }}>
                <IconButton
                  color="primary"
                  onClick={() => onEdit(task)}
                  aria-label="Modifier"
                  size="small"
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => onDelete(task)}
                  aria-label="Supprimer"
                  size="small"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default TaskList;
