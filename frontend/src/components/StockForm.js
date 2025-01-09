import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

function StockForm({ onSearch }) {
    const [symbol, setSymbol] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (symbol.trim()) {
            onSearch(symbol.trim());
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
                label="Stock Symbol"
                variant="outlined"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                fullWidth
            />
            <Button type="submit" variant="contained" color="primary">
                Get Stock Data
            </Button>
        </Box>
    );
}

export default StockForm;

