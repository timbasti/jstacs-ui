import {Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import WarningIcon from '@material-ui/icons/Warning';
import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link as RouterLink} from 'react-router-dom';

import {close as closeDrawer} from '../../api/drawer/actions';
import {selectDrawerOpenState} from '../../api/drawer/selectors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('md')]: {
            flexShrink: 0,
            width: drawerWidth
        }
    },
    drawerPaper: {width: drawerWidth}
}));

const renderNavigationItemList = () => {
    const navigationItemList =
        <List>
            <ListItem
                button
                component={RouterLink}
                to="/"
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>

                <ListItemText primary="Start" />
            </ListItem>

            <ListItem
                button
                component={RouterLink}
                to="/test"
            >
                <ListItemIcon>
                    <WarningIcon />
                </ListItemIcon>

                <ListItemText primary="Test Umgebung" />
            </ListItem>
        </List>;
    return navigationItemList;
};

export const JstacsNavigation = () => {
    const classes = useStyles();
    const isDrawerOpen = useSelector(selectDrawerOpenState);
    const dispatch = useDispatch();

    const handleDrawerBlur = useCallback(() => {
        dispatch(closeDrawer());
    }, [dispatch]);

    return (
        <nav
            className={classes.drawer}
            id="navigation"
        >
            <Hidden mdUp>
                <Drawer
                    ModalProps={{
                        container: document.getElementById('navigation'),
                        keepMounted: true,
                        style: {position: 'absolute'}
                    }}
                    classes={{paper: classes.drawerPaper}}
                    onBlur={handleDrawerBlur}
                    open={isDrawerOpen}
                    variant="temporary"
                >
                    <Toolbar />

                    {renderNavigationItemList()}
                </Drawer>
            </Hidden>

            <Hidden smDown>
                <Drawer
                    classes={{paper: classes.drawerPaper}}
                    open
                    variant="permanent"
                >
                    <Toolbar />

                    {renderNavigationItemList()}
                </Drawer>
            </Hidden>
        </nav>
    );
};
