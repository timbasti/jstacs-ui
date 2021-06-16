import {Box, Card, CardContent, Typography} from '@material-ui/core';
import {dump} from 'js-yaml';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

import {useParameterValueViewerStyles} from './styles';

const ParameterValueViewer = ({parameterValues}) => {
    const formattedParameter = useMemo(() => {
        const parametersObject = typeof parameterValues === 'string' ? JSON.parse(parameterValues) : parameterValues;
        console.log(parametersObject, dump(parametersObject));
        return dump(parametersObject, {lineWidth: -1});
    }, [parameterValues]);

    const classes = useParameterValueViewerStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    component="h2"
                    gutterBottom
                    variant="h6"
                >
                    Used Parameters
                </Typography>
                <Box
                    component="pre"
                    overflow="auto"
                >
                    {formattedParameter}
                </Box>
            </CardContent>
        </Card>
    );
};

ParameterValueViewer.propTypes = {parameterValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired};

export {ParameterValueViewer};
