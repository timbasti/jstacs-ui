import React from 'react';
import {Controller} from 'react-hook-form';
import {
    FormHelperText,
    FormControl,
    FormControlLabel,
    Checkbox
} from '@material-ui/core';
import {useCheckboxStyles} from "./styles";

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

export function ControlledCheckbox({name, value, comment, control, inputItemClasses}) {
    const classes = useCheckboxStyles();
    const spaceLessIdentifier = getSpaceLessIdentifier(name);

    return (
        <FormControl className={inputItemClasses}>
            <FormControlLabel
                className={classes.label}
                label={name}
                control={
                    <Controller
                        control={control}
                        name={spaceLessIdentifier}
                        defaultValue={value}
                        render={({onChange, value}) => (
                            <Checkbox
                                onChange={(e) => onChange(e.target.checked)}
                                checked={value}
                            />
                        )}
                    />
                }
            />
            <FormHelperText>{comment}</FormHelperText>
        </FormControl>
    );
}
