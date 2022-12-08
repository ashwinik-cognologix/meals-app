import React, { useState, useEffect } from 'react';
import { Grid, Box, TextField, Paper, Button } from '@mui/material';
import { addCouponCode, getCouponCodeDetails, updateCouponCode } from 'services/productservice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alert from '@mui/material/Alert';

const AddCoupon = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [message, setMessage] = React.useState('');

    const [formDetails, setFormDetails] = useState({
        code: '',
        discount: '',
        minamount: ''
    });

    const handleTextField = (event) => {
        setFormDetails((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    };

    const addCoupon = () => {
        let couponData = {
            code: formDetails.code,
            discount: formDetails.discount,
            minamount: formDetails.minamount
        };
        if (id != 0) {
            updateCouponCode(id, couponData).then(() => {
                setMessage('Coupon updated.');
                setTimeout(() => {
                    setMessage('');
                    navigate('/coupons');
                }, 3000);
            });
        } else {
            addCouponCode(couponData).then(() => {
                setMessage('Coupon Added.');
                setTimeout(() => {
                    setMessage('');
                    navigate('/coupons');
                }, 3000);
            });
        }
    };

    useEffect(() => {
        if (id != 0) {
            getCouponCodeDetails(id).then((coupons) => {
                //console.log(coupons.data);

                setFormDetails((prevState) => {
                    return {
                        ...prevState,
                        code: coupons.data[0].attributes.code,
                        discount: coupons.data[0].attributes.discount,
                        minamount: coupons.data[0].attributes.minamount
                    };
                });
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box width={'100%'}>
                        <Paper elevation={3}>
                            <Box component={'div'} sx={{ pt: 2, pl: 4 }}>
                                <h2>Add Coupon Code</h2>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField
                                            fullWidth
                                            name="code"
                                            id="outlined-basic"
                                            label="Coupon Code"
                                            variant="outlined"
                                            value={formDetails.code}
                                            onChange={handleTextField}
                                        />
                                    </Box>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField
                                            name="discount"
                                            fullWidth
                                            id="outlined-basic"
                                            label="Discount"
                                            variant="outlined"
                                            value={formDetails.discount}
                                            onChange={handleTextField}
                                        />
                                    </Box>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField
                                            name="minamount"
                                            fullWidth
                                            id="outlined-basic"
                                            label="Min Amount"
                                            variant="outlined"
                                            value={formDetails.minamount}
                                            onChange={handleTextField}
                                        />
                                    </Box>

                                    <Box width="100%" component={'div'} sx={{ pt: 2, pb: 3, pl: 4 }}>
                                        <Box textAlign="left">
                                            <Button variant="outlined">
                                                <Link
                                                    to="/coupons"
                                                    style={{
                                                        textDecoration: 'none',
                                                        width: '150px',
                                                        fontSize: '18px'
                                                    }}
                                                >
                                                    Back
                                                </Link>
                                            </Button>
                                        </Box>
                                        <Box textAlign="right" mt={-6}>
                                            <Button
                                                onClick={addCoupon}
                                                variant="contained"
                                                sx={{
                                                    textTransform: 'none',
                                                    width: '150px',
                                                    fontSize: '18px'
                                                }}
                                            >
                                                {id != 0 ? <b>Update</b> : <b>Add</b>}
                                            </Button>
                                        </Box>
                                    </Box>
                                    {message != '' && (
                                        <Box component={'div'} sx={{ pt: 2, pb: 3, pl: 4 }}>
                                            <Alert variant="filled" icon={false} severity="success">
                                                {message}
                                            </Alert>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
};
export default AddCoupon;
