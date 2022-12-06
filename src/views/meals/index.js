/* eslint-disable no-unused-vars */
import { Typography, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getProductList } from 'services/productservice';
import React, { useEffect, useState } from 'react';
import MealsTable from 'components/Meals/MealsTable';
import { useNavigate } from 'react-router-dom';
import { Paper, Button } from '@mui/material';
const SamplePage = () => {
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getMeals();
    }, [count]);

    const addMeals = () => {
        navigate(`/add-meal/0`);
    };

    const getMeals = () => {
        setMeals([]);
        getProductList().then((response) => {
            setMeals(response.data);
        });
    };

    return (
        <MainCard title="Meals">
            <Box width="100%" component={'div'} sx={{ pb: 2 }} textAlign="right">
                <Button
                    onClick={addMeals}
                    variant="contained"
                    textAlign="right"
                    sx={{
                        textTransform: 'none',
                        width: '150px',
                        fontSize: '18px'
                    }}
                >
                    <b> Add Meal</b>
                </Button>
            </Box>
            <Box>{meals.length > 0 ? <MealsTable data={meals} refreshTable={() => setCount(count + 1)} /> : 'No data'}</Box>
        </MainCard>
    );
};

export default SamplePage;
