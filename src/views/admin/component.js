import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {setRouteData} from '../../api/route/slice';
import {ApplicationsSection} from './sections/applications/component';

const AdminView = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: 'Admin'}));
    }, [dispatch]);

    return <ApplicationsSection />;
};

export default AdminView;
