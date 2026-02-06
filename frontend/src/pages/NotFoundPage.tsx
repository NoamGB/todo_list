import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight={700} color="text.secondary" gutterBottom>
          404
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Page introuvable
        </Typography>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
        >
          Retour à l'accueil
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
