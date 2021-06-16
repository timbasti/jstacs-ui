import {Box, TextField} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback, useRef} from 'react';
import {useController, useFormContext} from 'react-hook-form';
import NumberFormat from 'react-number-format';

import {ErrorNotification} from '../../notifications';

const EnrichedNumberField = ({helperText, label, name, placeholder, required, defaultValue, min, max}) => {
    const {control} = useFormContext();

    const numberFieldRef = useRef();

    const {
        field: {ref, onChange, ...fieldProps},
        fieldState: {invalid}
    } = useController({
        control,
        defaultValue,
        name,
        rules: {
            max,
            min,
            required
        }
    });

    const handleValueChange = useCallback(({floatValue}) => {
        onChange(floatValue);
    }, [onChange]);

    return (
        <Box>
            <ErrorNotification
                anchorEl={numberFieldRef.current}
                name={name}
            />
            <NumberFormat
                customInput={TextField}
                defaultValue={defaultValue}
                error={invalid}
                fullWidth
                getInputRef={numberFieldRef}
                helperText={helperText}
                inputRef={ref}
                label={label}
                onValueChange={handleValueChange}
                placeholder={placeholder}
                required={Boolean(required)}
                thousandSeparator
                variant="filled"
                {...fieldProps}
            />
        </Box>
    );
};

EnrichedNumberField.propTypes = {
    defaultValue: PropTypes.number,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

EnrichedNumberField.defaultProps = {
    defaultValue: undefined,
    helperText: '',
    max: undefined,
    min: undefined,
    placeholder: '',
    required: false
};

export {EnrichedNumberField};
