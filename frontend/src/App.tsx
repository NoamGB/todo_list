import React, { useEffect, useState } from 'react';
import { Container, Button, Typography } from '@mui/material';
import TaskList from './components/task/TaskList';
import TaskModal from './components/task/TaskModal';
import DeleteDialog from './components/task/DeleteDialog';
import { getTasks, createTask, updateTask, deleteTask } from './api/tasksApi';

const App = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSave = async (task: any) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, task);
    } else {
      await createTask(task);
    }
    setSelectedTask(null);
    fetchTasks();
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
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      setSelectedTask(null);
      fetchTasks();
    }
    setDeleteOpen(false);
  };

  return (
    <Container style={{ marginTop: 30 }}>
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)}>
      Add a task
      </Button>
      <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDeleteConfirm} />
      <TaskModal open={modalOpen} handleClose={() => { setModalOpen(false); setSelectedTask(null); }} handleSave={handleSave} task={selectedTask} />
      <DeleteDialog open={deleteOpen} handleClose={() => setDeleteOpen(false)} handleDelete={handleDelete} taskTitle={selectedTask?.title} />
    </Container>
  );
};

export default App;
