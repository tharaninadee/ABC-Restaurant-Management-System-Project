// src/components/ContactUs.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Snackbar, Alert } from '@mui/material';

function ContactUs() {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [content, setContent] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/queries', {
                customerName,
                customerEmail,
                contactPhone,
                content
            });
            setMessage('Query was sent successfully. Our team will respond to you soon.');
            setSeverity('success');
            // Clear the form fields
            setCustomerName('');
            setCustomerEmail('');
            setContactPhone('');
            setContent('');
        } catch (error) {
            setMessage('Failed to send query. Please try again later.');
            setSeverity('error');
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Message"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button type="submit" variant="contained" color="primary">Send Query</Button>
            </form>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default ContactUs;
