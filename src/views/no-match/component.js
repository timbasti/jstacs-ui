import React from 'react';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import {Typography, Link, Box} from '@material-ui/core';

export function NoMatchView() {
    let location = useLocation();

    return (
        <Typography variant="body1">
            <Box>
                Die Ansicht <code>{location.pathname}</code> konnte nicht gefunden werden
            </Box>
            <Link component={RouterLink} to="/">
                Hier kommen Sie zur Startseite
            </Link>
        </Typography>
    );
}
