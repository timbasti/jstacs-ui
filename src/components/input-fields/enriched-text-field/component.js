import {Box, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useRef} from 'react';
import {useController, useFormContext} from 'react-hook-form';

import {ErrorNotification} from '../../notifications';

const EnrichedTextField = ({helperText, label, name, placeholder, required, defaultValue, minLength, maxLength, multiline}) => {
    const {control} = useFormContext();

    const textFieldRef = useRef();

    const {
        field: {ref, ...fieldProps},
        fieldState: {invalid}
    } = useController({
        control,
        defaultValue: defaultValue || '',
        name,
        rules: {
            maxLength,
            minLength,
            required
        }
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
                required={Boolean(required)}
                variant="filled"
                {...fieldProps}
                multiline={multiline}
            />
        </Box>
    );
};

EnrichedTextField.propTypes = {
    defaultValue: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    multiline: PropTypes.bool,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

EnrichedTextField.defaultProps = {
    defaultValue: '',
    helperText: '',
    maxLength: undefined,
    minLength: undefined,
    multiline: false,
    placeholder: '',
    required: false
};

export {EnrichedTextField};
