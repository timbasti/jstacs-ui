import {Typography} from '@material-ui/core';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setRouteData} from '../../api/route/slice';

const HomeView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: 'Home'}));
    }, [dispatch]);

    return <Typography variant="body1">
        Willkommen bei Jstacs Online
    </Typography>;
};

export default HomeView;
