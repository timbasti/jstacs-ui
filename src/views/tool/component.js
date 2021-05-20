import {AppBar, Box, makeStyles, Tab, Tabs, Toolbar, useMediaQuery, useTheme} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Route, Switch, useLocation, useParams} from 'react-router-dom';

import {setRouteData} from '../../api/route/slice';
import {selectSelectedTool} from '../../api/tools/selectors';
import {loadTool} from '../../api/tools/thunks';
import {AvailableExecutions, StartExecution, ToolOverview} from './sections';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
    const titleSpacing = 2;
    return {
        appBar: {
            [theme.breakpoints.up('md')]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`
            },
            color: 'white',
            zIndex: theme.zIndex.drawer + 1
        },
        title: {
            flexGrow: 1,
            marginLeft: theme.spacing(titleSpacing)
        }
    };
});

const TabPanel = ({children}) => {
    return <Box p={3}>
        {children}
    </Box>;
};

const ToolView = () => {
    const {pathname} = useLocation();
    const {applicationId, toolId} = useParams();
    const [currentSection, setCurrentSection] = useState(0);
    const [sectionPaths, setSectionPaths] = useState(['', '', '']);

    const theme = useTheme();
    const isNarrow = useMediaQuery(theme.breakpoints.down('xs'));

    const dispatch = useDispatch();

    const selectedTool = useSelector(selectSelectedTool);

    useEffect(() => {
        setSectionPaths([
            `/applications/${applicationId}/tools/${toolId}/tool-overview`,
            `/applications/${applicationId}/tools/${toolId}/start-execution`,
            `/applications/${applicationId}/tools/${toolId}/available-executions`
        ]);
    }, [applicationId, toolId]);

    useEffect(() => {
        const newSection = sectionPaths.indexOf(pathname);
        setCurrentSection(newSection === -1 ? 0 : newSection);
    }, [pathname, sectionPaths]);

    useEffect(() => {
        dispatch(loadTool(toolId));
    }, [dispatch, toolId]);

    useEffect(() => {
        if (selectedTool) {
            dispatch(setRouteData({view: selectedTool.name}));
        }
    }, [dispatch, selectedTool]);

    const handleToolOverviewRender = useCallback(() => {
        return selectedTool && <ToolOverview
            {...selectedTool}
            toolId={toolId}
        />;
    }, [selectedTool, toolId]);

    const handleStartExecutionRender = useCallback(() => {
        return selectedTool && <StartExecution
            {...selectedTool}
            toolId={toolId}
        />;
    }, [selectedTool, toolId]);

    const handleAvailableExecutionsRender = useCallback(() => {
        return selectedTool && <AvailableExecutions
            {...selectedTool}
            toolId={toolId}
        />;
    }, [selectedTool, toolId]);

    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.appBar}>
                <Toolbar />
                <Tabs
                    value={currentSection}
                    variant={isNarrow ? 'fullWidth' : 'standard'}
                >
                    <Tab
                        component={NavLink}
                        label="Tool Overview"
                        to={sectionPaths[0]}
                    />
                    <Tab
                        component={NavLink}
                        label="Start Execution"
                        to={sectionPaths[1]}
                    />
                    <Tab
                        component={NavLink}
                        label="Available Executions"
                        to={sectionPaths[2]}
                    />
                </Tabs>
            </AppBar>
            <TabPanel>
                <Tabs />
                <Switch>
                    <Route
                        exact
                        path={sectionPaths[0]}
                        render={handleToolOverviewRender}
                    />
                    <Route
                        exact
                        path={sectionPaths[1]}
                        render={handleStartExecutionRender}
                    />
                    <Route
                        path={sectionPaths[2]}
                        render={handleAvailableExecutionsRender}
                    />
                </Switch>
            </TabPanel>
        </div>
    );
};

export default ToolView;
