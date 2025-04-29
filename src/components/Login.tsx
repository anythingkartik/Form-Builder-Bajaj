import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserData } from '../types/form';
import { createUser, registerUser } from '../services/api';

const schema = yup.object().shape({
  rollNumber: yup.string().required('Roll number is required'),
  name: yup.string().required('Name is required'),
});

interface LoginProps {
  onLogin: (data: UserData) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: UserData) => {
    try {
      if (isRegistering) {
        await registerUser(data);
      } else {
        await createUser(data);
      }
      onLogin(data);
    } catch (err) {
      setError(isRegistering ? 'Registration failed. Please try again.' : 'Login failed. Please try again.');
      console.error(err);
    }
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: boolean) => {
    setIsRegistering(newValue);
    setError(null);
    reset();
  };
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '100vh', p: 2 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ color: 'white', fontWeight: 800, textAlign: 'center', mb: 4, mt: 4 }}
      >
        Bajaj Finserv
      </Typography>
      
      <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom 
          textAlign="center"
          sx={{ color: '#1a237e', fontWeight: 600, mb: 3 }}
        >
          Student {isRegistering ? 'Registration' : 'Login'}
        </Typography>
        
        <Tabs
          value={isRegistering}
          onChange={handleTabChange}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...register('rollNumber')}
            label="Roll Number"
            fullWidth
            margin="normal"
            error={!!errors.rollNumber}
            helperText={errors.rollNumber?.message}
            data-testid="roll-number-input"
          />
          <TextField
            {...register('name')}
            label="Name"
            fullWidth
            margin="normal"
            error={!!errors.name}
            helperText={errors.name?.message}
            data-testid="name-input"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            data-testid={isRegistering ? 'register-button' : 'login-button'}
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login; 