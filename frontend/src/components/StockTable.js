import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

function StockTable({ stockData }) {
    if (!stockData || stockData.length === 0) {
        return <Typography align="center" sx={{ mt: 3 }}>No data to display</Typography>;
    }

    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Open</TableCell>
                        <TableCell>High</TableCell>
                        <TableCell>Low</TableCell>
                        <TableCell>Close</TableCell>
                        <TableCell>Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stockData.map((stock) => (
                        <TableRow key={stock.date}>
                            <TableCell>{stock.date}</TableCell>
                            <TableCell>{stock.open}</TableCell>
                            <TableCell>{stock.high}</TableCell>
                            <TableCell>{stock.low}</TableCell>
                            <TableCell>{stock.close}</TableCell>
                            <TableCell>{stock.volume}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default StockTable;

