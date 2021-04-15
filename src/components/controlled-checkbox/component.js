import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {useCheckboxStyles} from './styles';

const UncontrolledCheckbox = ({name, defaultChecked, helperText, inputItemClasses}) => {
    const {control} = useFormContext();
    const classes = useCheckboxStyles();

    const createInputChangeHandler = useCallback((handleChange) => (changeEvent) => handleChange(changeEvent.target.checked), []);

    const renderControlledInput = useCallback(
        ({onChange, value}) => <Checkbox
            checked={value}
            onChange={createInputChangeHandler(onChange)}
        />,
        [createInputChangeHandler]
    );

    const inputController = useEffect(
        () => <Controller
            control={control}
            defaultValue={defaultChecked}
            name={name}
            render={renderControlledInput}
        />,
        [control, defaultChecked, name, renderControlledInput]
    );

    return (
        <FormControl className={inputItemClasses}>
            <FormControlLabel
                className={classes.label}
                control={inputController}
                label={name}
            />
            <FormHelperText variant="outlined">
                {helperText}
            </FormHelperText>
        </FormControl>
    );
};

UncontrolledCheckbox.propTypes = {
    defaultChecked: PropTypes.bool,
    helperText: PropTypes.string,
    inputItemClasses: PropTypes.string,
    name: PropTypes.string.isRequired
};

UncontrolledCheckbox.defaultProps = {
    defaultChecked: false,
    helperText: '',
    inputItemClasses: ''
};

export {UncontrolledCheckbox};
