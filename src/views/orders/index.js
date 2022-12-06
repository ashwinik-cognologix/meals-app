/* eslint-disable no-unused-vars */
import { Typography, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getOrder } from 'services/productservice';
import React, { useEffect, useState } from 'react';
import OrderTable from 'components/Orders/OrderTable';
const SamplePage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrder().then((response) => {
            setOrders(response.data);
        });
    }, []);

    return (
        <MainCard title="Orders">
            <Box>{orders.length > 0 ? <OrderTable data={orders} /> : 'No data'}</Box>
        </MainCard>
    );
};

export default SamplePage;
