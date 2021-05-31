import {
    AppBar,
    Breadcrumbs,
    FormControlLabel,
    Hidden,
    IconButton,
    makeStyles,
    Menu,
    MenuItem,
    Switch,
    Toolbar,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {open as openDrawer} from '../api/drawer/actions';
import {selectView} from '../api/route/selectors';
import {changeApplicationTheme} from '../api/theme/actions';
import {selectPaletteType} from '../api/theme/selectors';
import {useAppHeaderControlsContext} from '../utils/app-header-controls-context';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    return {
        appBar: {
            [theme.breakpoints.up('md')]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`
            },
            color: 'white',
            zIndex: theme.zIndex.drawer + 2
        },
        title: {
            flexGrow: 1,
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            whiteSpace: 'nowrap'
        }
    };
});

export const JstacsHeader = () => {
    const [appMenuOpen, setAppMenuOpen] = useState(false);
    const appMenuOpener = useRef(null);
    const themePaletteType = useSelector(selectPaletteType);
    const dispatch = useDispatch();
    const currentView = useSelector(selectView);
    const {controls} = useAppHeaderControlsContext();

    const viewBreadcrumb = useMemo(() => {
        return (
            currentView &&
                <Typography
                    component="h1"
                    variant="h6"
                >
                    {currentView}
                </Typography>

        );
    }, [currentView]);

    const handleDrawerOpen = useCallback(() => {
        dispatch(openDrawer());
    }, [dispatch]);

    const handleDarkThemeToggle = useCallback(() => {
        const newPaletteType = themePaletteType === 'dark' ? 'light' : 'dark';
        dispatch(changeApplicationTheme(newPaletteType));
    }, [dispatch, themePaletteType]);

    const handleAppMenuToggle = useCallback(() => {
        setAppMenuOpen(!appMenuOpen);
    }, [appMenuOpen]);

    const classes = useStyles();

    return (
        <AppBar
            className={classes.appBar}
            elevation={0}
        >
            <Toolbar>
                <Hidden mdUp>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerOpen}
                        title="Toggle open/close menu"
                    >
                        <MenuIcon />
                    </IconButton>
                </Hidden>
                <Breadcrumbs
                    className={classes.title}
                    color="inherit"
                >
                    {viewBreadcrumb}
                </Breadcrumbs>
                {controls}
                <IconButton
                    color="inherit"
                    edge="end"
                    onClick={handleAppMenuToggle}
                    ref={appMenuOpener}
                    title="Open app menu"
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    anchorEl={appMenuOpener.current}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom'
                    }}
                    getContentAnchorEl={null}
                    id="simple-menu"
                    keepMounted
                    onClose={handleAppMenuToggle}
                    open={appMenuOpen}
                    transformOrigin={{
                        horizontal: 'center',
                        vertical: 'top'
                    }}
                >
                    <MenuItem>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={themePaletteType === 'dark'}
                                    color="secondary"
                                    onChange={handleDarkThemeToggle}
                                />
                            }
                            label="Dark Theme"
                            labelPlacement="start"
                        />
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};
