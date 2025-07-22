import React, { useState } from 'react';
import axios from '../api/axios';
import { saveToken } from '../utils';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Alert
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    setError('');

    try {
      const res = await axios.post('/qclogin', { email, password });
      console.log('Token:', res.data.access_token);
      if (res.status === 200 && res.data.access_token) {
        saveToken(res.data.access_token);
        navigate('/dashboard');
      } else {
        setError('Invalid login credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check credentials or try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10} component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom>Login</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          margin="normal"
          required
        />

        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
