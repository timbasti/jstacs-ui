import React from 'react';
import {Controller} from 'react-hook-form';
import {FormHelperText, FormControl, FormControlLabel, Checkbox} from '@material-ui/core';
import {useCheckboxStyles} from './styles';

export function ControlledCheckbox({name, fieldName, value, comment, control, inputItemClasses}) {
    const classes = useCheckboxStyles();

    return (
        <FormControl className={inputItemClasses}>
            <FormControlLabel
                className={classes.label}
                label={name}
                control={
                    <Controller
                        control={control}
                        name={fieldName}
                        defaultValue={value}
                        render={({onChange, value}) => <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />}
                    />
                }
            />
            <FormHelperText variant="outlined">{comment}</FormHelperText>
        </FormControl>
    );
}
