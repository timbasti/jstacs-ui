import {Box, Tab, Tabs} from '@material-ui/core';
import React, {useCallback} from 'react';
import {useParams} from 'react-router-dom';

import {StartToolSection} from './sections/start-tool/component';

const TabPanel = ({children, show}) => {
    return (
        <Box
            hidden={!show}
            p={3}
        >
            {children}
        </Box>
    );
};

export const ToolView = () => {
    const {toolId} = useParams();
    const [value, setValue] = React.useState(0);

    const handleChange = useCallback(
        (event, newValue) => {
            setValue(newValue);
        },
        [setValue]
    );

    return (
        <div>
            <Tabs
                onChange={handleChange}
                value={value}
            >
                <Tab label="Start Tool" />
                <Tab label="Tool Executions" />
            </Tabs>
            <TabPanel show={value === 0}>
                <StartToolSection toolId={toolId} />
            </TabPanel>
            <TabPanel show={value === 1}>
                Hello World
            </TabPanel>
        </div>
    );
};
