import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box
} from '@mui/material';

const ViewQueries = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // Fetch queries when component mounts
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const response = await axios.get('/api/queries');
      setQueries(response.data);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  const handleDelete = async (queryId) => {
    try {
      await axios.delete(`/api/queries/${queryId}`);
      setQueries((prevQueries) => prevQueries.filter(query => query.id !== queryId));
      alert('Query deleted successfully');
    } catch (error) {
      console.error('Error deleting query:', error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Admin Panel - View and Delete Queries
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {queries.length > 0 ? (
              queries.map((query) => (
                <TableRow key={query.id}>
                  <TableCell>{query.customerName}</TableCell>
                  <TableCell>{query.customerEmail}</TableCell>
                  <TableCell>{query.contactPhone}</TableCell>
                  <TableCell>{query.content}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDelete(query.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No queries available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewQueries;
