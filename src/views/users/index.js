/* eslint-disable no-unused-vars */
import { Typography, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getRegisterUsers } from 'services/productservice';
import React, { useEffect, useState } from 'react';
import UsersTable from 'components/Users/UsersTable';

const SamplePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getRegisterUsers().then((response) => {
            console.log(response.data);
            setUsers(response.data);
        });
    }, []);

    return (
        <MainCard title="Users">
            <Box>{users.length > 0 ? <UsersTable data={users} /> : 'No data'}</Box>
        </MainCard>
    );
};

export default SamplePage;
