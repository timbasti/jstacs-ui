import {Box, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {useController, useFormContext} from 'react-hook-form';

import {requiredValueErrorMessage} from '../../utils/error-messages';
import {ErrorNotification} from '../notifications';

const EnrichedTextField = ({helperText, label, name, placeholder, required, defaultValue}) => {
    const {control} = useFormContext();

    const textFieldRef = useRef();

    const {
        field: {ref, ...fieldProps},
        fieldState: {invalid}
    } = useController({
        control,
        defaultValue,
        name,
        rules: {required: required ? requiredValueErrorMessage() : false}
    });

    return (
        <Box>
            <ErrorNotification
                anchorEl={textFieldRef.current}
                name={name}
            />
            <TextField
                error={invalid}
                fullWidth
                helperText={helperText}
                inputRef={ref}
                label={label}
                placeholder={placeholder}
                ref={textFieldRef}
                required={required}
                type="text"
                variant="filled"
                {...fieldProps}
            />
        </Box>
    );
};

EnrichedTextField.propTypes = {
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool
};

EnrichedTextField.defaultProps = {
    defaultValue: '',
    helperText: '',
    placeholder: '',
    required: false
};

export {EnrichedTextField};
