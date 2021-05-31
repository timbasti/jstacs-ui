import {Typography} from '@material-ui/core';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setRouteData} from '../../api/route/slice';

const HomeView = ({className}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: 'Home'}));
    }, [dispatch]);

    return (
        <Typography
            className={className}
            variant="body1"
        >
            Willkommen bei Jstacs Online
        </Typography>
    );
};

export default HomeView;
