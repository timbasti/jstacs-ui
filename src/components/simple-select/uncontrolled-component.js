import {MenuItem, TextField, Tooltip, Typography} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import React, {useCallback} from 'react';
import {Controller, useFormContext} from 'react-hook-form';

export const UncontrolledSimpleSelect = ({className, defaultSelected, helperText, label, name, options}) => {
    const {control} = useFormContext();

    const renderOptions = useCallback(
        () => options.map(({key}) => <MenuItem
            key={key}
            value={key}
        >
            {key}
        </MenuItem>),
        [options]
    );

    const renderOptionsDescription = useCallback(
        () => options.map(({key, value}) => <Typography
            component="div"
            key={key}
            variant="caption"
        >
            {key === value ? key : `${key}: ${value}`}
        </Typography>),
        [options]
    );

    const renderSelect = useCallback(
        () => ({onChange, value}) => {
            const createChangeHanlder = (handleChange) => (changeEvent) => handleChange(changeEvent.target.value);
            return (
                <TextField
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

                                        {renderOptionsDescription()}
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
                    onChange={createChangeHanlder(onChange)}
                    select
                    value={value}
                    variant="filled"
                >
                    {renderOptions()}
                </TextField>
            );
        },
        [className, helperText, label, renderOptions, renderOptionsDescription]
    );

    return <Controller
        control={control}
        defaultValue={defaultSelected}
        name={name}
        render={renderSelect()}
    />;
};
