import {MenuItem, TextField, Tooltip, Typography} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import React, {useCallback} from 'react';
import {useFormContext} from 'react-hook-form';

export const ControlledSimpleSelect = ({className, selected, helperText, label, name, options}) => {
    const {register} = useFormContext();

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
            inputRef={register}
            label={label}
            name={name}
            select
            value={selected}
            variant="filled"
        >
            {renderOptions()}
        </TextField>
    );
};
