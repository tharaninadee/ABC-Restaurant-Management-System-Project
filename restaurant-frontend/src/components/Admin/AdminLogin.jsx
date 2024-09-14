import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, TextField, Container, Typography, Box, CircularProgress } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('admin'); // 'admin' or 'staff'
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      let response;
      if (userType === 'admin') {
        response = await axios.post('/api/user/login/admin', { email, password });
      } else {
        response = await axios.post('/api/user/login/staff', { email, password });
      }
      if (response.status === 200) {
        console.log('Login successful:', response.data);
        sessionStorage.setItem('userSession', JSON.stringify(response.data)); // Save session
        console.log('Redirecting to:', userType === 'admin' ? '/admin' : '/staff');
        navigate(userType === 'admin' ? '/admin' : '/staff');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        mx: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" sx={{ mb: 4 }}>
          Login
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ width: '100%' }}
          onSubmit={handleLogin}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            fullWidth
            select
            label="User Type"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            SelectProps={{
              native: true,
            }}
            disabled={loading}
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </TextField>
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Sign In'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
