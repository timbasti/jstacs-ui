import React from 'react';
import {
    TextField,
} from '@material-ui/core';
import {ControlledCheckbox} from '../components/controlled-checkbox/component';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

function createTextField({
    name,
    value,
    comment,
    required,
    control,
    register,
    inputItemClasses,
    rules,
    inputType,
    registerOptions
}) {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);
    return (
        <TextField
            inputRef={register(registerOptions)}
            name={spaceLessIdentifier}
            label={name}
            defaultValue={value}
            helperText={comment}
            type={inputType}
            required={required}
            variant="filled"
            className={inputItemClasses}
        />
    );
}

function createCheckBox(props) {
    return <ControlledCheckbox {...props} />;
}

export function createSimpleParameterInput({dataType, required, ...props}) {
    switch (dataType) {
        case 'CHAR':
        case 'STRING':
            return createTextField({
                ...props,
                required,
                inputType: 'text',
                registerOptions: {
                    required
                }
            });
        case 'LONG':
        case 'INT':
        case 'BYTE':
        case 'SHORT':
            return createTextField({
                ...props,
                required,
                inputType: 'number',
                registerOptions: {
                    required,
                    valueAsNumber: true
                }
            });
        case 'FLOAT':
        case 'DOUBLE':
            return createTextField({
                ...props,
                required,
                inputType: 'number',
                registerOptions: {
                    required,
                    valueAsNumber: true
                }
            });
        case 'BOOLEAN':
            return createCheckBox({...props});
        default:
            break;
    }
}
