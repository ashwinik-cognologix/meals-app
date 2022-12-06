/* eslint-disable no-unused-vars */
import { Typography, Box, Grid, Button, Divider } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getOrdersReport, getCategory, getOrder, getOrdersDetailsReport } from 'services/productservice';
import React, { useEffect, useState } from 'react';
import DailyReportTable from 'components/Reports/DailyReportTable';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const DailyReport = () => {
    const [orders, setOrders] = useState([]);
    const [satrtDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [categoryList, setCategoryList] = React.useState([]);
    const [category, setCategory] = React.useState('All');

    useEffect(() => {
        let now = Math.floor(new Date() / 1000);
        let startTime = now - (now % 86400);
        let endTime = startTime + 86400;

        getOrdersReport(startTime, endTime).then((response) => {
            setOrders(response.data);
        });
        getCategory().then((response) => {
            setCategoryList(response.data);
        });
    }, []);

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1);
    };

    const categoryChange = (event) => {
        setCategory(event.target.value);
    };

    const searchReport = () => {
        let now = Math.floor(new Date() / 1000);
        let startTime = now - (now % 86400);
        let endTime = startTime + 86400;

        setOrders([]);

        if (category == 'All') {
            getOrdersReport(startTime, endTime).then((response) => {
                setOrders(response.data);
            });
        } else {
            getOrdersDetailsReport(startTime, endTime, category).then((response) => {
                setOrders(response.data);
            });
        }
    };

    return (
        <MainCard title="Report">
            <Grid container spacing={4}>
                <Grid item xs={2}>
                    <Select
                        fullWidth
                        name="category"
                        id="demo-simple-select"
                        value={category}
                        placeholder="Category"
                        onChange={categoryChange}
                    >
                        <MenuItem value={'All'}>All categories</MenuItem>
                        {categoryList.length > 0 &&
                            categoryList.map((category, index) => {
                                return (
                                    <MenuItem key={index} value={category.attributes.name}>
                                        {category.attributes.name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </Grid>

                {/* <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Start Date"
                            value={satrtDate}
                            onChange={handleStartDate}
                            inputFormat="DD-MM-YYYY"
                            renderInput={(params) => <TextField {...params} />}
                        />{' '}
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={handleEndDate}
                            inputFormat="DD-MM-YYYY"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid> */}
                <Grid item xs={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={searchReport}
                        size="large"
                        style={{ height: '50px', borderRadius: '10px' }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
            <Box my={3}>
                <Divider light />
            </Box>

            <Box>{orders.length > 0 ? <DailyReportTable data={orders} category={category} /> : 'No data'}</Box>
        </MainCard>
    );
};

export default DailyReport;
