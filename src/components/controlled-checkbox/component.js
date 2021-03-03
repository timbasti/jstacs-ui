import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller, useFormContext} from 'react-hook-form';

import {useCheckboxStyles} from './styles';

const UncontrolledCheckbox = ({name, defaultChecked, helperText, inputItemClasses}) => {
    const {control} = useFormContext();
    const classes = useCheckboxStyles();

    const createUncontrolledInput = () => ({onChange, value}) => {
        const createChangeHandler = (handleChange) => (changeEvent) => handleChange(changeEvent.target.checked);
        return <Checkbox
            checked={value}
            onChange={createChangeHandler(onChange)}
        />;
    };

    return (
        <FormControl className={inputItemClasses}>
            <FormControlLabel
                className={classes.label}
                control={
                    <Controller
                        control={control}
                        defaultValue={defaultChecked}
                        name={name}
                        render={createUncontrolledInput()}
                    />
                }
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
