import {Box} from '@material-ui/core';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setRouteData} from '../../api/route/slice';
import {ApplicationsSection} from './sections/applications/component';

const AdminView = ({className}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: 'Admin'}));
    }, [dispatch]);

    return (
        <Box className={className}>
            <ApplicationsSection />
        </Box>
    );
};

export default AdminView;
