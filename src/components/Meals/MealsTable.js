/* eslint-disable no-unused-vars */
import * as React from 'react';
import { Paper, Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import { updateMeals, getProductList } from 'services/productservice';

const columns = [
    { id: 'id', label: 'No.', minWidth: 100 },
    { id: 'mealId', label: 'Meal Id', minWidth: 100 },
    { id: 'image', label: 'Image', minWidth: 100 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'price', label: 'Price', minWidth: 100 },
    { id: 'edit', label: 'Action', minWidth: 100 }
];

function createData(id, mealId, image, name, price, edit) {
    return { id, mealId, image, name, price, edit };
}

export default function MealsTable(props) {
    const navigate = useNavigate();
    // eslint-disable-next-line no-unused-vars
    const [meals, setMeals] = React.useState(props.data);

    const [rows, setRow] = React.useState([]);

    React.useEffect(() => {
        let edit = 'edit';
        let newRow = [];
        let totalMeals = meals.length;
        meals.map((meal, index) => {
            const image = 'http://localhost:1337' + meal.attributes.image.data.attributes.url;

            let obj = createData(totalMeals, meal.id, image, meal.attributes.name, meal.attributes.price, edit);
            totalMeals = totalMeals - 1;
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

    const viewMealDetails = (id) => {
        navigate(`/add-meal/${id}`);
    };

    const deleteMeal = (id) => {
        let result = confirm('Are you sure you want to delete this meal');
        if (result == true) {
            let mealData = {
                isActive: false
            };
            updateMeals(id, mealData).then(() => {
                props.refreshTable();
            });
        }
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
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
                                                                    viewMealDetails(row.mealId);
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
                                                                    deleteMeal(row.mealId);
                                                                }
                                                            }}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {column.id === 'image' ? (
                                                            <img src={value} alt="meals" height="45px" width="45px" />
                                                        ) : (
                                                            <>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}{' '}
                                                            </>
                                                        )}
                                                    </>
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
