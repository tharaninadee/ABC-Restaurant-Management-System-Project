import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Modal,
    TextField,
    Snackbar,
    Alert,
    Paper,
    Box
} from '@mui/material';

const RespondQuery = () => {
    const [queries, setQueries] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState(null);
    const [response, setResponse] = useState('');
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    
    useEffect(() => {
        async function fetchQueries() {
            try {
                const result = await axios.get('/api/queries');
                setQueries(result.data);
            } catch (error) {
                setMessage('Failed to load queries. Please try again later.');
                setSeverity('error');
                setOpen(true);
            }
        }
        fetchQueries();
    }, []);

    const handleOpen = (query) => {
        setSelectedQuery(query);
        setResponse(''); // Clear previous response
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedQuery(null);
    };

    const handleSubmit = async () => {
        if (!selectedQuery) return;
        
        try {
            await axios.put(`/api/queries/${selectedQuery.id}`, {
                ...selectedQuery,
                response,
                status: 'resolved'
            });
            setMessage('Response sent successfully.');
            setSeverity('success');
            handleClose();
            // Update the queries list after successful response
            setQueries((prevQueries) =>
                prevQueries.map((query) =>
                    query.id === selectedQuery.id
                        ? { ...query, response, status: 'resolved' }
                        : query
                )
            );
        } catch (error) {
            setMessage('Failed to send response. Please try again later.');
            setSeverity('error');
        }
        setOpen(true);
    };

    const handleResponseChange = (e) => {
        setResponse(e.target.value);
    };

    const handleCloseSnackbar = () => {
        setOpen(false);
    };

    return (
        <div>
            <h2>Queries</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Content</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {queries.map((query) => (
                            <TableRow key={query.id}>
                                <TableCell>{query.customerName}</TableCell>
                                <TableCell>{query.customerEmail}</TableCell>
                                <TableCell>{query.contactPhone}</TableCell>
                                <TableCell>{query.content}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleOpen(query)}
                                        variant="contained"
                                        color="success"
                                    >
                                        Respond
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        padding: 2,
                        margin: 'auto',
                        maxWidth: 600,
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                    }}
                >
                    <h2>Respond to Query</h2>
                    <TextField
                        label="Response"
                        multiline
                        rows={4}
                        fullWidth
                        value={response}
                        onChange={handleResponseChange}
                    />
                    <Box sx={{ marginTop: 2 }}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            color="primary"
                        >
                            Send Response
                        </Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar open={message !== ''} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default RespondQuery;
