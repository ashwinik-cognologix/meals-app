import React, { useState, useEffect } from 'react';
//import Header from "../components/Layout/Header";
import { Grid, Box, TextField, Paper, Button } from '@mui/material';
import { addMeals, upload, getCategory, getMealDetails, updateMeals } from 'services/productservice';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';

const Addmeal = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categoryList, setCategoryList] = React.useState([]);
    const [imageUrl, setImageUrl] = React.useState([]);
    const [message, setMessage] = React.useState('');

    const [imageId, setImageId] = React.useState([]);
    // eslint-disable-next-line no-unused-vars

    const [formDetails, setFormDetails] = useState({
        category: '',
        name: '',
        price: '',
        description: '',
        file: ''
    });

    const handleTextField = (event) => {
        setFormDetails((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            };
        });
    };

    const handleFile = (event) => {
        setFormDetails((prevState) => {
            return {
                ...prevState,
                file: event.target.files[0]
            };
        });
    };

    const addMeal = () => {
        if (formDetails.file != '') {
            const formData = new FormData();

            formData.append('files', formDetails.file, formDetails.file.name);

            upload(formData).then((response) => {
                let fileId = response[0].id;
                let mealData = {
                    category: formDetails.category,
                    name: formDetails.name,
                    price: formDetails.price,
                    description: formDetails.description,
                    image: fileId
                };
                if (id != 0) {
                    updateMeals(id, mealData).then(() => {
                        setMessage('Meal updated.');
                        setTimeout(() => {
                            setMessage('');
                            navigate('/meals');
                        }, 3000);
                    });
                } else {
                    addMeals(mealData).then(() => {
                        setMessage('Meal Added.');
                        setTimeout(() => {
                            setMessage('');
                            navigate('/meals');
                        }, 3000);
                    });
                }
            });
        } else {
            if (id != 0) {
                let mealData = {
                    category: formDetails.category,
                    name: formDetails.name,
                    price: formDetails.price,
                    description: formDetails.description,
                    image: imageId
                };
                updateMeals(id, mealData).then(() => {
                    setMessage('Meal updated.');
                    setTimeout(() => {
                        setMessage('');
                        navigate('/meals');
                    }, 3000);
                });
            }
        }
    };

    useEffect(() => {
        getCategory().then((response) => {
            setCategoryList(response.data);
            setFormDetails((prevState) => {
                return {
                    ...prevState,
                    category: response.data[0].attributes.name
                };
            });
            if (id != 0) {
                getMealDetails(id).then((meals) => {
                    //console.log(meals.data);

                    setImageUrl('http://localhost:1337' + meals.data.attributes.image.data.attributes.url);

                    setImageId(meals.data.attributes.image.data.id);

                    setFormDetails((prevState) => {
                        return {
                            ...prevState,
                            category: meals.data.attributes.category,
                            name: meals.data.attributes.name,
                            price: meals.data.attributes.price,
                            description: meals.data.attributes.description,
                            file: ''
                        };
                    });
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const categoryChange = (event) => {
        setFormDetails((prevState) => {
            return {
                ...prevState,
                category: event.target.value
            };
        });
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box width={'100%'}>
                        <Paper elevation={3}>
                            <Box component={'div'} sx={{ pt: 2, pl: 4 }}>
                                <h2>Add Meal</h2>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <Select
                                            fullWidth
                                            name="category"
                                            id="demo-simple-select"
                                            value={formDetails.category}
                                            onChange={categoryChange}
                                            placeholder="Category"
                                        >
                                            {categoryList.length > 0 &&
                                                categoryList.map((category) => {
                                                    return <MenuItem value={category.attributes.name}>{category.attributes.name}</MenuItem>;
                                                })}
                                        </Select>
                                    </Box>

                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField
                                            fullWidth
                                            name="name"
                                            id="outlined-basic"
                                            label="Name"
                                            variant="outlined"
                                            value={formDetails.name}
                                            onChange={handleTextField}
                                        />
                                    </Box>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField
                                            name="price"
                                            fullWidth
                                            id="outlined-basic"
                                            label="Price"
                                            variant="outlined"
                                            value={formDetails.price}
                                            onChange={handleTextField}
                                        />
                                    </Box>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField fullWidth name="upload-photo" type="file" onChange={handleFile} />
                                    </Box>
                                    <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Description"
                                            name="description"
                                            multiline={true}
                                            rows="5"
                                            variant="outlined"
                                            value={formDetails.description}
                                            onChange={handleTextField}
                                        />
                                    </Box>

                                    <Box width="100%" component={'div'} sx={{ pt: 2, pb: 3, pl: 4 }}>
                                        <Box textAlign="left">
                                            <Button variant="outlined">
                                                <Link
                                                    to="/meals"
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
                                                onClick={addMeal}
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
                                <Grid item xs={6}>
                                    {id != 0 ? (
                                        <Box width="100%" component={'div'} sx={{ pt: 2, pl: 4 }}>
                                            <img src={imageUrl} alt="meals" height="200px" width="200px" />
                                        </Box>
                                    ) : (
                                        ''
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
export default Addmeal;
