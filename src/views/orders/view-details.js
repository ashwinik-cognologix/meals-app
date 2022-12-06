import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getOrderDetails } from 'services/productservice';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

const columns = [
    { id: 'id', label: 'No.', minWidth: 100 },
    { id: 'meal', label: 'Meal', minWidth: 100 },
    { id: 'qty', label: 'Qty', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 }
];

function createData(id, meal, qty, price) {
    return { id, meal, qty, price };
}

export default function StickyHeadTable() {
    const { id } = useParams();
    // eslint-disable-next-line no-unused-vars
    const [orderDetailsList, setOrderDetailsList] = React.useState([]);
    const [orders, setCartDetails] = React.useState([]);
    const [rows, setRow] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() => {
        getOrderDetails(id).then((response) => {
            setOrderDetailsList({
                totalAmount: response?.data[0].attributes.totalAmount
            });
            setCartDetails(response?.data);

            let newRow = [];
            response?.data.map((order, index) => {
                let obj = createData(index + 1, order.attributes.name, order.attributes.amount, order.attributes.price);

                newRow.push(obj);

                return true;
            });
            setRow(newRow);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column, index) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={index} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                        <TableRow hover role="checkbox" tabIndex={-1}>
                            <TableCell>
                                {' '}
                                <Button variant="outlined">
                                    <Link
                                        to="/orders"
                                        style={{
                                            textDecoration: 'none',
                                            width: '150px',
                                            fontSize: '18px'
                                        }}
                                    >
                                        Back
                                    </Link>
                                </Button>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                                <b>Total</b> : {orderDetailsList.totalAmount}{' '}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
