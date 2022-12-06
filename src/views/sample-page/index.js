// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { getProductList } from 'services/productservice';
import React from 'react';
// ==============================|| SAMPLE PAGE ||============================== //

const SamplePage = () => {
    React.useEffect(() => {
        getProductList().then((response) => {
            console.log(response);
        });
    }, []);
    return (
        <MainCard title="Sample Card">
            <Typography variant="body2">
                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut
                enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue
                dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president,
                sunk in culpa qui officiate descent molls anim id est labours.
            </Typography>
        </MainCard>
    );
};

export default SamplePage;
