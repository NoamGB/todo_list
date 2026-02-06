import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import ListIcon from '@mui/icons-material/List';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" elevation={0} sx={{ borderRadius: 0 }}>
        <Toolbar>
        <Button
            color="inherit"
            onClick={() => navigate('/')}
            variant={isHome ? 'outlined' : 'text'}
            sx={{
              borderColor: 'rgba(255,255,255,0.5)',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
          <Typography
            variant="h6"
            component="span"
            sx={{ flexGrow: 1, fontWeight: 700, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >

           Todo List
          </Typography>
          </Button>

        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
};

export default Layout;
