import { useState } from 'react';
import { CssBaseline, Alert, Snackbar, Box, Typography } from '@mui/material';
import Login from './components/Login';
import DynamicForm from './components/DynamicForm';
import { getForm } from './services/api';
import { FormResponse, UserData } from './types/form';

function App() {
  const [formData, setFormData] = useState<FormResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (userData: UserData) => {
    try {
      const formResponse = await getForm(userData.rollNumber);
      setFormData(formResponse);
      setSuccess('Login successful!');
    } catch (err) {
      setError('Failed to login or fetch form. Please try again.');
      console.error(err);
    }
  };

  const handleFormSubmit = (data: any) => {
    console.log('Form submitted with data:', data);
    setSuccess('Form submitted successfully!');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'auto',
      }}
    >
      <CssBaseline />
      <Typography
        variant="h3"
        component="h1"
        sx={{
          color: 'white',
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
          width: '100%',
        }}
      >
        Bajaj Finserv
      </Typography>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          px: 2,
          flex: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            borderRadius: 2,
            p: 4,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            width: '100%',
            maxWidth: '800px',
          }}
        >
          {!formData ? (
            <Login onLogin={handleLogin} />
          ) : (
            <DynamicForm
              sections={formData.form.sections}
              onSubmit={handleFormSubmit}
            />
          )}
        </Box>
      </Box>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!success}
        autoHideDuration={6000}
        onClose={() => setSuccess(null)}
      >
        <Alert severity="success" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
