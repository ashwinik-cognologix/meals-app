import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EarningCard from './EarningCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';

import { gridSpacing } from 'store/constant';
import { getOrder, getRegisterUsers } from 'services/productservice';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [totalOrder, setTotalOrders] = useState('');
    const [totalUsers, setUsers] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [earning, setEarning] = useState(0);
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

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} count={totalOrder} title={'Total Orders'} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} count={earning} title={'Total Earning'} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} count={totalUsers} title={'Total Users'} />
                    </Grid>
                    {/* <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} />
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
