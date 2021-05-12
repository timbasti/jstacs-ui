import {AppBar, Box, Tab, Tabs, useMediaQuery, useTheme} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, Route, Switch, useLocation, useParams} from 'react-router-dom';

import {setRouteData} from '../../api/route/slice';
import {selectSelectedTool} from '../../api/tools/selectors';
import {loadTool} from '../../api/tools/thunks';
import {AvailableExecutions, StartExecution, ToolOverview} from './sections';

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
        if (selectedTool) {
            return <ToolOverview tool={selectedTool} />;
        }
        return undefined;
    }, [selectedTool]);

    return (
        <div>
            <AppBar position="static">
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
                <Switch>
                    <Route
                        exact
                        path={sectionPaths[0]}
                        render={handleToolOverviewRender}
                    />
                    <Route
                        component={StartExecution}
                        path={sectionPaths[1]}
                    />
                    <Route
                        component={AvailableExecutions}
                        path={sectionPaths[2]}
                    />
                </Switch>
            </TabPanel>
        </div>
    );
};

export default ToolView;
