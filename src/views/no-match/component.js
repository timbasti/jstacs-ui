import {Box, Link, Typography} from '@material-ui/core';
import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';

export const NoMatchView = () => {
    const location = useLocation();

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
