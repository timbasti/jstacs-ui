import {MenuItem, TextField, Tooltip, Typography} from '@material-ui/core';
import {Info} from '@material-ui/icons';
import React, {useEffect} from 'react';

export const ControlledSimpleSelect = ({className, selected, helperText, label, name, options, onChange}) => {
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
            name={name}
            onChange={onChange}
            select
            value={selected}
            variant="filled"
        >
            {renderedOptions}
        </TextField>
    );
};
