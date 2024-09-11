import React, { useState } from 'react';
import { Container, Tabs, Tab, Box, TextField, Button, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const useStyles = makeStyles({
  container: {
    marginTop: '10%',
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  form: {
    marginTop: '20px',
  },
  field: {
    marginBottom: '20px',
  },
  button: {
    marginTop: '10px',
  },
});

const Login = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0); // 0 for Login, 1 for Sign Up
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    fullName: '',
    contactNumber: '',
    email: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
    setError(null); // Clear errors when switching tabs
  };

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/login/customer', loginData);
      if (response.status === 200) {
        console.log('Login Successful');
        navigate('/checkout'); 
      }
    } catch (error) {
      console.error('Login Error:', error.response || error.message);
      setError('Invalid email or password. Please try again.');
    }
  };

  const handleSignupSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/user/customer', signupData);
      if (response.status === 201) {
        console.log('Signup Successful');
        navigate('/checkout'); 
      }
    } catch (error) {
      console.error('Signup Error:', error.response || error.message);
      setError('Error during signup. Please try again.');
    }
  };

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          {tab === 0 ? 'Customer Login' : 'Customer Sign Up'}
        </Typography>
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {tab === 0 ? (
          <Box className={classes.form}>
            <TextField
              className={classes.field}
              label="Email"
              variant="outlined"
              fullWidth
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <TextField
              className={classes.field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            {error && (
              <Typography color="error" variant="body2" style={{ marginBottom: '10px' }}>
                {error}
              </Typography>
            )}
            <Button variant="contained" color="primary" fullWidth onClick={handleLoginSubmit}>
              Login
            </Button>
          </Box>
        ) : (
          <Box className={classes.form}>
            <TextField
              className={classes.field}
              label="Full Name"
              variant="outlined"
              fullWidth
              value={signupData.fullName}
              onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
            />
            <TextField
              className={classes.field}
              label="Contact Number"
              variant="outlined"
              fullWidth
              value={signupData.contactNumber}
              onChange={(e) => setSignupData({ ...signupData, contactNumber: e.target.value })}
            />
            <TextField
              className={classes.field}
              label="Email"
              variant="outlined"
              fullWidth
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <TextField
              className={classes.field}
              label="Username"
              variant="outlined"
              fullWidth
              value={signupData.username}
              onChange={(e) => setSignupData({ ...signupData, username: e.target.value })}
            />
            <TextField
              className={classes.field}
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            {error && (
              <Typography color="error" variant="body2" style={{ marginBottom: '10px' }}>
                {error}
              </Typography>
            )}
            <Button variant="contained" color="primary" fullWidth onClick={handleSignupSubmit}>
              Sign Up
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
