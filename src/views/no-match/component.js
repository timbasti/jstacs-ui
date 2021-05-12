import {Box, Link, Typography} from '@material-ui/core';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link as RouterLink, useLocation} from 'react-router-dom';

import {setRouteData} from '../../api/route/slice';

const NoMatchView = () => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRouteData({view: 'Not found'}));
    }, [dispatch]);

    return (
        <Typography variant="body1">
            <Box>
                Die Ansicht
                {' '}
                <code>
                    {location.pathname}
                </code>
                {' '}
                konnte nicht gefunden werden
            </Box>
            <Link
                component={RouterLink}
                to="/"
            >
                Hier kommen Sie zur Startseite
            </Link>
        </Typography>
    );
};

export default NoMatchView;
