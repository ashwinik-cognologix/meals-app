import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

import { gridSpacing } from 'store/constant';
import { getOrder, getRegisterUsers } from 'services/productservice';
import Orders from 'views/orders';
import { Box } from '@mui/system';
import Earning from 'views/reports/monthly-report';
import Users from 'views/users';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [totalOrder, setTotalOrders] = useState('');
    const [totalUsers, setUsers] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [earning, setEarning] = useState(0);
    const [tab, setTab] = useState('Total Orders');
    useEffect(() => {
        setLoading(true);
        getOrder().then((response) => {
            // console.log(response);
            let amount = 0;
            response.data.forEach((element) => {
                let newAmount = Number(element.attributes.amount);
                amount = amount + newAmount;
            });
            setTotalOrders(response.data.length);
            setEarning(amount);
        });
        getRegisterUsers().then((response) => {
            //console.log(response.data);
            setUsers(response.data.length);
            setLoading(false);
        });
    }, []);

    const setActiveTab = (value) => {
        setTab(value);
    };

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} count={totalOrder} title={'Total Orders'} setActiveTab={setActiveTab} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} count={earning} title={'Total Earning'} setActiveTab={setActiveTab} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} count={totalUsers} title={'Total Users'} setActiveTab={setActiveTab} />
                    </Grid>
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Box mt={3}>
                            {tab == 'Total Orders' ? <Orders /> : ''}
                            {tab == 'Total Users' ? <Users /> : ''}
                            {tab == 'Total Earning' ? <Earning /> : ''}
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
