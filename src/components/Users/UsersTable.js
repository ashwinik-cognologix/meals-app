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

const columns = [
    { id: 'id', label: 'No.', minWidth: 100 },
    { id: 'userId', label: 'User Id', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 100 },
    { id: 'view', label: 'Action', minWidth: 100 }
];

function createData(id, userId, name, email, view) {
    return { id, userId, name, email, view };
}

export default function UsersTable(props) {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [users, setUsers] = React.useState(props.data);

    const [rows, setRow] = React.useState([]);

    React.useEffect(() => {
        let view = 'view';
        let newRow = [];

        users.map((user, index) => {
            let obj = createData(
                index + 1,
                user.id,
                user.attributes.firstname + ' ' + user.attributes.lastname,
                user.attributes.email,
                view
            );

            newRow.push(obj);

            return true;
        });
        setRow(newRow);
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
    const viewUserDetails = (id) => {
        // navigate(`/view-recipt/${id}`);
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
                                                {value == 'view' ? (
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() => {
                                                            if (column.id === 'view') {
                                                                viewUserDetails(row.userId);
                                                            }
                                                        }}
                                                    >
                                                        {value}
                                                    </Button>
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
