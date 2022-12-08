/* eslint-disable no-unused-vars */
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { updateCouponCode } from 'services/productservice';

const columns = [
    { id: 'id', label: 'No.', minWidth: 100 },
    { id: 'couponId', label: 'Coupon Id.', minWidth: 100 },
    { id: 'code', label: 'Code', minWidth: 100 },
    { id: 'discount', label: 'Discount', minWidth: 100 },
    { id: 'minlimit', label: 'Min Amount', minWidth: 100 },
    { id: 'edit', label: 'Action', minWidth: 100 }
];

function createData(id, couponId, code, discount, minlimit, edit) {
    return { id, couponId, code, discount, minlimit, edit };
}

export default function CouponCodeTable(props) {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [coupons, setCouponCode] = React.useState(props.data);

    const [rows, setRow] = React.useState([]);

    React.useEffect(() => {
        let edit = 'edit';
        let newRow = [];
        let totalCoupon = coupons.length;
        coupons.map((coupon, index) => {
            let obj = createData(
                totalCoupon,
                coupon.id,
                coupon.attributes.code,
                coupon.attributes.discount,
                coupon.attributes.minamount,
                edit
            );
            totalCoupon = totalCoupon - 1;
            newRow.push(obj);

            return true;
        });
        setRow(newRow.reverse());
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const viewCouponDetails = (id) => {
        navigate(`/add-coupon/${id}`);
    };
    const deleteCoupon = (id) => {
        let result = confirm('Are you sure you want to delete this coupon code');
        if (result == true) {
            let couponData = {
                isActive: false
            };
            updateCouponCode(id, couponData).then(() => {
                props.refreshTable();
            });
        }
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
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value == 'edit' ? (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() => {
                                                                if (column.id === 'edit') {
                                                                    viewCouponDetails(row.couponId);
                                                                }
                                                            }}
                                                        >
                                                            Update
                                                        </Button>{' '}
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="error"
                                                            onClick={() => {
                                                                if (column.id === 'edit') {
                                                                    deleteCoupon(row.couponId);
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>{column.format && typeof value === 'number' ? column.format(value) : value}</>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
