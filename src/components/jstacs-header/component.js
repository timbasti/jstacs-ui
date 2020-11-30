import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Hidden,
    makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';

import logo from '../../assets/logo.png';
import {selectPaletteType} from '../../api/theme/selectors';
import {changeApplicationTheme} from '../../api/theme/actions';
import {openDrawer} from '../../api/drawer/actions';

const useStyles = makeStyles((theme) => ({
    logo: {
        width: 48,
        height: 48,
        padding: 12,
        marginLeft: -12
    },
    title: {
        marginLeft: theme.spacing(2),
        flexGrow: 1
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    }
}));

export function JstacsHeader() {
    const themePaletteType = useSelector(selectPaletteType);
    const dispatch = useDispatch();

    const handleDrawerOpen = () => {
        dispatch(openDrawer());
    };

    const handleDarkThemeToggle = () => {
        const newPaletteType = themePaletteType === 'dark' ? 'light' : 'dark';
        dispatch(changeApplicationTheme(newPaletteType));
    };

    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="Toggle open/close menu"
                        title="Toggle open/close menu"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Hidden smDown>
                    <img
                        className={classes.logo}
                        alt="Jstacs logo"
                        src={logo}
                    />
                </Hidden>
                <Typography variant="h6" className={classes.title}>
                    Jstacs Online
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="Toggle light/dark theme"
                    title="Toggle light/dark theme"
                    onClick={handleDarkThemeToggle}
                >
                    <BrightnessMediumIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
