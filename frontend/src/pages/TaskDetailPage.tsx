import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

import DeleteDialog from '../components/task/DeleteDialog';
import { getTask, updateTask, deleteTask } from '../api/tasksApi';
import { useSnackbar } from '../context/SnackbarContext';

const formatDate = (dateStr: string) => {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
};

const TaskDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showAlert } = useSnackbar();
  const [task, setTask] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', dueDate: '' });

  const fetchTask = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await getTask(Number(id));
      setTask(data);
      if (data) {
        setForm({
          title: data.title ?? '',
          description: data.description ?? '',
          dueDate: data.dueDate ?? '',
        });
      }
    } catch {
      showAlert('Tâche introuvable', 'error');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  const handleSave = async () => {
    if (!task || !form.title.trim()) {
      showAlert('Le titre est obligatoire', 'error');
      return;
    }
    try {
      await updateTask(task.id, form);
      showAlert('Tâche modifiée avec succès', 'success');
      setTask((prev:any) => (prev ? { ...prev, ...form } : null));
      setEditMode(false);
    } catch (error: any) {
      showAlert(
        error?.response?.data?.message || "Erreur lors de l'enregistrement",
        'error'
      );
    }
  };

  const handleDelete = async () => {
    if (!task) return;
    try {
      await deleteTask(task.id);
      showAlert('Tâche supprimée avec succès', 'success');
      setDeleteOpen(false);
      navigate('/');
    } catch {
      showAlert('Erreur lors de la suppression', 'error');
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mb: 2 }}
        >
          Retour à la liste
        </Button>

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
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {editMode ? (
                <TextField
                  fullWidth
                  label="Titre"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {task.title}
                </Typography>
              )}
              <Chip
                size="small"
                icon={<EventIcon sx={{ fontSize: 16 }} />}
                label={formatDate(editMode ? form.dueDate : task.dueDate)}
                variant="outlined"
                sx={{ mt: 0.5 }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              {editMode ? (
                <>
                  <IconButton color="primary" onClick={handleSave} aria-label="Enregistrer">
                    <SaveIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setEditMode(false);
                      setForm({
                        title: task.title ?? '',
                        description: task.description ?? '',
                        dueDate: task.dueDate ?? '',
                      });
                    }}
                    aria-label="Annuler"
                  >
                    <CloseIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton
                    color="primary"
                    onClick={() => setEditMode(true)}
                    aria-label="Modifier"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setDeleteOpen(true)}
                    aria-label="Supprimer"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>

          {editMode ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
              />
              <TextField
                label="Date d'échéance"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.dueDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, dueDate: e.target.value }))
                }
              />
            </Box>
          ) : (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ whiteSpace: 'pre-wrap' }}
            >
              {task.description || 'Aucune description.'}
            </Typography>
          )}
        </Paper>
      </Container>

      <DeleteDialog
        open={deleteOpen}
        handleClose={() => setDeleteOpen(false)}
        handleDelete={handleDelete}
        taskTitle={task?.title}
      />
    </>
  );
};

export default TaskDetailPage;
