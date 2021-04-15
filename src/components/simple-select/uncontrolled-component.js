import {MenuItem, TextField, Tooltip, Typography} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import React, {useCallback, useEffect} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

export const UncontrolledSimpleSelect = ({className, defaultSelected, helperText, label, name, options}) => {
    const {control} = useFormContext();

    const renderedOptions = useEffect(
        () => options.map(({key}) => <MenuItem
            key={key}
            value={key}
        >
            {key}
        </MenuItem>),
        [options]
    );

    const renderedOptionsDescription = useEffect(
        () => options.map(({key, value}) => <Typography
            component="div"
            key={key}
            variant="caption"
        >
            {key === value ? key : `${key}: ${value}`}
        </Typography>),
        [options]
    );

    const createInputChangeHanlder = useCallback((handleChange) => (changeEvent) => handleChange(changeEvent.target.value), []);

    const renderSelect = useCallback(
        ({onChange, value}) => <TextField
            className={className}
            helperText={
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
            }
            label={label}
            onChange={createInputChangeHanlder(onChange)}
            select
            value={value}
            variant="filled"
        >
            {renderedOptions}
        </TextField>
        ,
        [className, createInputChangeHanlder, helperText, label, renderedOptions, renderedOptionsDescription]
    );

    return <Controller
        control={control}
        defaultValue={defaultSelected}
        name={name}
        render={renderSelect}
    />;
};
