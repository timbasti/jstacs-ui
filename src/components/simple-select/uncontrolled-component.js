import {MenuItem, TextField, Tooltip, Typography} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import PropTypes from 'prop-types';
import React, {useMemo} from 'react';
import {useFormContext} from 'react-hook-form';

const UncontrolledSimpleSelect = ({
    className,
    defaultSelected,
    helperText,
    label,
    name,
    options,
    showValuesInHelperText,
    required,
    onChange
}) => {
    const {register} = useFormContext();

    const renderedOptions = useMemo(
        () => options?.map((option) => {
            const optionValue = option.value;
            const optionLabel = option.label;
            return (
                <MenuItem
                    key={optionValue}
                    value={optionValue}
                >
                    {optionLabel}
                </MenuItem>
            );
        }),
        [options]
    );

    const renderedOptionsDescription = useMemo(() => {
        if (!showValuesInHelperText) {
            return undefined;
        }

        return (
            options &&
            options.map((option) => {
                const optionValue = option.value;
                const optionLabel = option.label;
                return (
                    <Typography
                        component="div"
                        key={optionValue}
                        variant="caption"
                    >
                        {`${optionLabel}: ${optionValue}`}
                    </Typography>
                );
            })
        );
    }, [options, showValuesInHelperText]);

    const renderedEnrichedHelperText = useMemo(() => {
        if (!showValuesInHelperText) {
            return undefined;
        }

        return (
            <>
                <Typography
                    style={{
                        marginRight: 5,
                        verticalAlign: 'middle'
                    }}
                    variant="caption"
                >
                    {helperText}
                </Typography>
                <Tooltip
                    enterTouchDelay={0}
                    title={
                        <>
                            <Typography>
                                The following options are available:
                            </Typography>
                            {renderedOptionsDescription}
                        </>
                    }
                >
                    <Info
                        style={{
                            fontSize: 15,
                            verticalAlign: 'middle'
                        }}
                    />
                </Tooltip>
            </>
        );
    }, [helperText, showValuesInHelperText, renderedOptionsDescription]);

    const renderedHelperText = useMemo(() => {
        return showValuesInHelperText ? renderedEnrichedHelperText : helperText;
    }, [helperText, showValuesInHelperText, renderedEnrichedHelperText]);

    const {ref, ...registrationProps} = useMemo(() => {
        return register(name, {required});
    }, [name, register, required]);

    return (
        <TextField
            className={className}
            defaultValue={defaultSelected}
            fullWidth
            helperText={renderedHelperText}
            inputRef={ref}
            label={label}
            name={name}
            required={required}
            select
            variant="filled"
            {...registrationProps}
            onChange={onChange}
        >
            {renderedOptions}
        </TextField>
    );
};

UncontrolledSimpleSelect.propTypes = {
    className: PropTypes.string,
    defaultSelected: PropTypes.any,
    helperText: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired
    })).isRequired,
    required: PropTypes.bool,
    showValuesInHelperText: PropTypes.bool
};

UncontrolledSimpleSelect.defaultProps = {
    className: '',
    defaultSelected: undefined,
    helperText: '',
    onChange: () => {},
    required: false,
    showValuesInHelperText: false
};

export {UncontrolledSimpleSelect};
