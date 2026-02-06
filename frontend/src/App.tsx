import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TaskList from './components/task/TaskList';
import TaskModal from './components/task/TaskModal';
import DeleteDialog from './components/task/DeleteDialog';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasksApi';

const App = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setSnackbar({ open: true, message, severity: type });
  };

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      showAlert('Erreur lors du chargement des tâches', 'error');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const validateTask = (task: any) => {
    if (!task.title || task.title.trim() === '') {
      showAlert('Le titre est obligatoire', 'error');
      return false;
    }
    return true;
  };

  const handleSave = async (task: any) => {
    if (!validateTask(task)) return;
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, task);
        showAlert('Tâche modifiée avec succès', 'success');
      } else {
        await createTask(task);
        showAlert('Tâche ajoutée avec succès', 'success');
      }
      setSelectedTask(null);
      setModalOpen(false);
      await fetchTasks();
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message || 'Erreur lors de l\'enregistrement',
        'error'
      );
    }
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const handleDeleteConfirm = (task: any) => {
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    try {
      await deleteTask(selectedTask.id);
      showAlert('Tâche supprimée avec succès', 'success');
      setSelectedTask(null);
      setDeleteOpen(false);
      await fetchTasks();
    } catch {
      showAlert('Erreur lors de la suppression', 'error');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ borderRadius: 0 }}>
        <Toolbar>
          <Typography variant="h6" component="span" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Todo List
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            <Typography variant="h5" fontWeight={600} color="text.primary">
              Mes tâches
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setModalOpen(true)}
              sx={{ borderRadius: 2 }}
            >
              Ajouter une tâche
            </Button>
          </Box>

          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
          />
        </Paper>
      </Container>

      <TaskModal
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
          setSelectedTask(null);
        }}
        handleSave={handleSave}
        task={selectedTask}
      />

      <DeleteDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={handleDelete}
        taskTitle={selectedTask?.title}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
