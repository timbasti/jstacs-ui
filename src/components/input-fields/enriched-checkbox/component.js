import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback, useMemo} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {useCheckboxStyles} from './styles';

const UncontrolledCheckbox = ({name, defaultChecked}) => {
    const {control} = useFormContext();

    const renderCheckbox = useCallback(({field: {ref, value, ...fieldProps}}) => {
        return <Checkbox
            checked={value}
            inputRef={ref}
            {...fieldProps}
        />;
    }, []);

    return <Controller
        control={control}
        defaultValue={defaultChecked}
        name={name}
        render={renderCheckbox}
    />;
};

UncontrolledCheckbox.propTypes = {
    defaultChecked: PropTypes.bool,
    name: PropTypes.string.isRequired
};

UncontrolledCheckbox.defaultProps = {defaultChecked: false};

const EnrichedCheckbox = ({helperText, label, name, defaultChecked}) => {
    const classes = useCheckboxStyles();

    const formControl = useMemo(() => {
        return <UncontrolledCheckbox
            defaultChecked={defaultChecked}
            name={name}
        />;
    }, [defaultChecked, name]);

    return (
        <FormControl fullWidth>
            <FormControlLabel
                className={classes.label}
                control={formControl}
                label={label}
            />
            <FormHelperText variant="outlined">
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

EnrichedCheckbox.propTypes = {
    defaultChecked: PropTypes.bool,
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string.isRequired
};

EnrichedCheckbox.defaultProps = {
    defaultChecked: false,
    helperText: '',
    label: ''
};

export {EnrichedCheckbox};
