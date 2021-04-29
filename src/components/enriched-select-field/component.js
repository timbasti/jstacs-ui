import {Box, MenuItem, TextField, Tooltip, Typography} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, {useEffect, useMemo, useRef} from 'react';
import {useController, useFormContext} from 'react-hook-form';

import {requiredValueErrorMessage} from '../../utils/error-messages';
import {ErrorNotification} from '../notifications';

const getLabelValueEntry = (label, value) => {
    return `${label}: ${value}`;
};

const EnrichedHelperText = ({helperText, options}) => {
    const renderedOptionsDescription = useMemo(() => {
        return (
            options?.map(({label, value}) => {
                const text = getLabelValueEntry(label, value);
                return (
                    <Typography
                        component="div"
                        key={value}
                        variant="caption"
                    >
                        {text}
                    </Typography>
                );
            }) || []
        );
    }, [options]);

    return (
        <Typography
            style={{
                marginRight: 5,
                verticalAlign: 'middle'
            }}
            variant="caption"
        >
            {helperText}
            <Tooltip
                enterTouchDelay={0}
                title={
                    <Box>
                        <Typography>
                            The following options are available:
                        </Typography>
                        {renderedOptionsDescription}
                    </Box>
                }
            >
                <Info
                    style={{
                        fontSize: 15,
                        verticalAlign: 'middle'
                    }}
                />
            </Tooltip>
        </Typography>
    );
};

EnrichedHelperText.propTypes = {
    helperText: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    }))
};

EnrichedHelperText.defaultProps = {
    helperText: '',
    options: []
};

const EnrichedSelectField = ({defaultValue, helperText, label, name, options, showEnrichedHelperText, required, placeholder}) => {
    const {control} = useFormContext();

    const selectFieldRef = useRef();

    const {
        field: {ref, ...fieldProps},
        fieldState: {invalid}
    } = useController({
        control,
        defaultValue,
        name,
        rules: {required: required ? requiredValueErrorMessage() : false}
    });

    const renderedOptions = useMemo(() => {
        return (
            options?.map(({label: optionLabel, value}) => {
                return (
                    <MenuItem
                        key={value}
                        value={value}
                    >
                        {optionLabel}
                    </MenuItem>
                );
            }) || []
        );
    }, [options]);

    const renderedHelperText = useMemo(() => {
        if (showEnrichedHelperText) {
            return <EnrichedHelperText
                helperText={helperText}
                options={options}
            />;
        }
        return helperText;
    }, [helperText, showEnrichedHelperText, options]);

    return (
        <Box>
            <ErrorNotification
                anchorEl={selectFieldRef.current}
                name={name}
            />
            <TextField
                error={invalid}
                fullWidth
                helperText={renderedHelperText}
                inputRef={ref}
                label={label}
                placeholder={placeholder}
                ref={selectFieldRef}
                required={required}
                select
                variant="filled"
                {...fieldProps}
            >
                {renderedOptions}
            </TextField>
        </Box>
    );
};

EnrichedSelectField.propTypes = {
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    })),
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    showEnrichedHelperText: PropTypes.bool
};

EnrichedSelectField.defaultProps = {
    defaultValue: '',
    helperText: '',
    options: [],
    placeholder: '',
    required: false,
    showEnrichedHelperText: false
};

export {EnrichedSelectField};
