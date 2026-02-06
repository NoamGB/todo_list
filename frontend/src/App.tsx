import React, { useEffect, useState } from 'react';

import { Container, Typography, Button } from '@mui/material';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import TaskList from './components/task/TaskList';
import TaskModal from './components/task/TaskModal';
import DeleteDialog from './components/task/DeleteDialog';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasksApi';
import AlertDialog from './components/task/AlertDialog';

const App = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const [alertOpen, setAlertOpen] = useState(false);
const [alertMessage, setAlertMessage] = useState('');
const [alertType, setAlertType] = useState<'success' | 'error'>('success');

const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
  setAlertMessage(message);
  setAlertType(type);
  setAlertOpen(true);
};

  // Récupération des tâches avec try/catch
  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error: any) {
      showAlert('Error fetching tasks', 'error');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Validation frontend
  const validateTask = (task: any) => {
    if (!task.title || task.title.trim() === '') {
      showAlert('The title is required', 'error');
      return false;
    }
    // if (!task.description || task.description.trim() === '') {
    //   showAlert('Description is required', 'error');
    //   return false;
    // }
    // if (!task.dueDate) {
    //   showAlert('Due date is required', 'error');
    //   return false;
    // }
    // const dueDate = new Date(task.dueDate);
    // if (dueDate < new Date()) {
    //   showAlert('Due date must be in the future', 'error');
    //   return false;
    // }
    return true;
  };

  // Création / mise à jour
  const handleSave = async (task: any) => {
    if (!validateTask(task)) return;

    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, task);
        showAlert('Task modified successfully', 'success');
      } else {
        await createTask(task);
        showAlert('Task added successfully', 'success');
      }
      setSelectedTask(null);
      setModalOpen(false);
      await fetchTasks();
    } catch (error: any) {
      showAlert(error?.response?.data?.message || 'Error saving task', 'error');
    }
  };

  // Editer une tâche
  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  // Supprimer une tâche
  const handleDeleteConfirm = (task: any) => {
    setSelectedTask(task);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedTask) return;
    try {
      await deleteTask(selectedTask.id);
      showAlert('Task deleted successfully', 'success');
      setSelectedTask(null);
      setDeleteOpen(false);
      await fetchTasks();
    } catch (error: any) {
      showAlert('Error deleting task', 'error');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Todo List
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setModalOpen(true)}
        sx={{ mb: 3 }}
      >
        Add a task
      </Button>

      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDeleteConfirm} />

      <TaskModal
        open={modalOpen}
        handleClose={() => { setModalOpen(false); setSelectedTask(null); }}
        handleSave={handleSave}
        task={selectedTask}
      />

      <DeleteDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={handleDelete}
        taskTitle={selectedTask?.title}
      />

<AlertDialog
  open={alertOpen}
  onClose={() => setAlertOpen(false)}
  message={alertMessage}
  type={alertType}
  duration={3000} // se ferme après 3 secondes
/>



    </Container>
  );
};

export default App;
