import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {useController, useFormContext} from 'react-hook-form';

import {useCheckboxStyles} from './styles';

const UncontrolledCheckbox = ({name, defaultChecked}) => {
    const {control} = useFormContext();

    const {field: {ref, ...fieldProps}} = useController({
        control,
        defaultValue: defaultChecked,
        name
    });

    return <Checkbox
        inputRef={ref}
        {...fieldProps}
        checked={defaultChecked}
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
