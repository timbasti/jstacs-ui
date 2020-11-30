import React from 'react';
import {
    Link as RouterLink
} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    Toolbar,
    Hidden,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WarningIcon from '@material-ui/icons/Warning';
import {makeStyles} from '@material-ui/core';

import {selectDrawerOpenState} from '../../api/drawer/selectors';
import {closeDrawer} from '../../api/drawer/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            width: drawerWidth,
            flexShrink: 0
        }
    },
    drawerPaper: {
        width: drawerWidth
    },
}));

export function JstacsNavigation() {
    const classes = useStyles();
    const isDrawerOpen = useSelector(selectDrawerOpenState);
    const dispatch = useDispatch()

    const handleDrawerClose = () => {
        dispatch(closeDrawer());
    };

    return (
        <nav id="navigation" className={classes.drawer} aria-label="App menu">
            <Hidden mdUp>
                <Drawer
                    ModalProps={{
                        container: document.getElementById('navigation'),
                        style: {position: 'absolute'},
                        keepMounted: true
                    }}
                    variant="temporary"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    open={isDrawerOpen}
                    onBlur={handleDrawerClose}
                >
                    <Toolbar />
                    <List>
                        <ListItem button component={RouterLink} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Start" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/test">
                            <ListItemIcon>
                                <WarningIcon />
                            </ListItemIcon>
                            <ListItemText primary="Test Umgebung" />
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
            <Hidden smDown>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper
                    }}
                    open
                >
                    <Toolbar />
                    <List>
                        <ListItem button component={RouterLink} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Start" />
                        </ListItem>
                        <ListItem button component={RouterLink} to="/test">
                            <ListItemIcon>
                                <WarningIcon />
                            </ListItemIcon>
                            <ListItemText primary="Test Umgebung" />
                        </ListItem>
                    </List>
                </Drawer>
            </Hidden>
        </nav>
    );
}
