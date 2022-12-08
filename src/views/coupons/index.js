/* eslint-disable no-unused-vars */
import { Button, Box } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getCouponCode } from 'services/productservice';
import React, { useEffect, useState } from 'react';
import CouponCodeTable from 'components/Coupons/CouponCodeTable';
import { useNavigate } from 'react-router-dom';

const CouponCode = () => {
    const navigate = useNavigate();
    const [couponcode, setCouponCode] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        getCoupon();
    }, [count]);

    const addCoupon = () => {
        navigate(`/add-coupon/0`);
    };

    const getCoupon = () => {
        setCouponCode([]);
        getCouponCode().then((response) => {
            setCouponCode(response.data);
        });
    };

    return (
        <MainCard title="Coupon Code">
            <Box width="100%" component={'div'} sx={{ pb: 2 }} textAlign="right">
                <Button
                    onClick={addCoupon}
                    variant="contained"
                    textAlign="right"
                    sx={{
                        textTransform: 'none',
                        width: '150px',
                        fontSize: '18px'
                    }}
                >
                    <b> Add Coupon</b>
                </Button>
            </Box>
            <Box>{couponcode.length > 0 ? <CouponCodeTable data={couponcode} /> : 'No data'}</Box>
        </MainCard>
    );
};

export default CouponCode;
