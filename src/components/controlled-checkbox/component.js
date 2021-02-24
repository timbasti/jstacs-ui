import {Checkbox, FormControl, FormControlLabel, FormHelperText} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import {Controller} from 'react-hook-form';

import {useCheckboxStyles} from './styles';

const createCheckedChangedHandler = (onChange) => (changeEvent) => onChange(changeEvent.target.checked);

const createUncontrolledInput = () => ({onChange, value}) => {
    const handleCheckedChange = createCheckedChangedHandler(onChange);
    return <Checkbox
        checked={value}
        onChange={handleCheckedChange}
    />;
};

const ControlledCheckbox = ({name, fieldName, value, comment, control, inputItemClasses}) => {
    const classes = useCheckboxStyles();

    return (
        <FormControl className={inputItemClasses}>
            <FormControlLabel
                className={classes.label}
                control={
                    <Controller
                        control={control}
                        defaultValue={value}
                        name={fieldName}
                        render={createUncontrolledInput()}
                    />
                }
                label={name}
            />

            <FormHelperText variant="outlined">
                {comment}
            </FormHelperText>
        </FormControl>
    );
};

ControlledCheckbox.propTypes = {
    comment: PropTypes.string,
    control: PropTypes.shape().isRequired,
    fieldName: PropTypes.string.isRequired,
    inputItemClasses: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool
};

ControlledCheckbox.defaultProps = {
    comment: '',
    inputItemClasses: '',
    value: false
};

export {ControlledCheckbox};
