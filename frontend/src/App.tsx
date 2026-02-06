import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SnackbarProvider } from './context/SnackbarContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import TaskDetailPage from './pages/TaskDetailPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SnackbarProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tasks" element={<HomePage />} />
            <Route path="tasks/:id" element={<TaskDetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </SnackbarProvider>
    </BrowserRouter>
  );
};

export default App;
