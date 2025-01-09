import React, { useState } from 'react';
import axios from 'axios';
import StockForm from './components/StockForm';
import StockTable from './components/StockTable';
import { Container, Typography, Paper, Box, CircularProgress, Alert } from '@mui/material';
import './App.css';

function App() {
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = (symbol) => {
        if (!symbol) {
            setError("Please enter a stock symbol.");
            return;
        }

        setLoading(true);
        setError(null);
        setStockData([]);

        const apiUrl = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5000'; // Fallback to localhost if env not set
        axios
            .get(`${apiUrl}/api/stock?symbol=${symbol}`)
            .then((response) => {
                setStockData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.response?.data?.error || 'An unexpected error occurred');
                setLoading(false);
            });
    };

    return (
        <Container maxWidth="lg" className="App">
            <Typography variant="h2" align="center" gutterBottom>
                Stock Market Dashboard
            </Typography>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <StockForm onSearch={handleSearch} />
                {loading && (
                    <Box display="flex" justifyContent="center" mt={3}>
                        <CircularProgress />
                    </Box>
                )}
                {error && <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>}
                <StockTable stockData={stockData} />
            </Paper>
        </Container>
    );
}

export default App;


