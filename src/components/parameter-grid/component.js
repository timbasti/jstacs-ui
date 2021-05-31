import {Grid} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';

import {createParameterInput} from '../../utils/parameter-factory';

const ParameterGrid = ({parameters, parentName, titleComponent}) => {
    const renderedTitleItem = useMemo(() => {
        return (
            titleComponent &&
                <Grid
                    item
                    xs={12}
                >
                    {titleComponent}
                </Grid>

        );
    }, [titleComponent]);

    const renderedParameterItems = useMemo(() => {
        return parameters?.map((parameter) => {
            const gridProps =
                parameter.dataType === 'PARAMETERSET'
                    ? {xs: 12}
                    : {
                        lg: 4,
                        sm: 6,
                        xs: 12
                    };
            const key = parentName ? `${parentName}.${parameter.name}` : parameter.name;
            return (
                <Grid
                    item
                    key={key}
                    {...gridProps}
                >
                    {createParameterInput(parameter, parentName)}
                </Grid>
            );
        });
    }, [parameters, parentName]);

    return (
        <Grid
            container
            spacing={3}
        >
            {renderedTitleItem}
            {renderedParameterItems}
        </Grid>
    );
};

ParameterGrid.propTypes = {
    parameters: PropTypes.arrayOf(PropTypes.any).isRequired,
    parentName: PropTypes.string,
    titleComponent: PropTypes.node
};

ParameterGrid.defaultProps = {
    parentName: undefined,
    titleComponent: undefined
};

export {ParameterGrid};
