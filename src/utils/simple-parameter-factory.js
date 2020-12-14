import React from 'react';
import {Controller} from 'react-hook-form';
import {TextField, FormHelperText, FormControl, FormControlLabel, Checkbox} from '@material-ui/core';

function getSpaceLessIdentifier(identifier) {
    return identifier.replace(/ /g, '_');
}

function TextFieldController({name, value, comment, required, control, inputItemClasses, rules, inputType}) {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);
    return (
        <Controller
            as={TextField}
            control={control}
            name={spaceLessIdentifier}
            label={name}
            defaultValue={value}
            helperText={comment}
            type={inputType}
            required={required}
            variant="filled"
            className={inputItemClasses}
            rules={rules}
        />
    );
}

function CheckBoxController({name, value, comment, control, inputItemClasses}) {
    const spaceLessIdentifier = getSpaceLessIdentifier(name);
    return (
        <FormControl className={inputItemClasses}>
            <FormControlLabel
                label={name}
                control={
                    <Controller
                        control={control}
                        name={spaceLessIdentifier}
                        defaultValue={value}
                        render={({onChange, value}) => <Checkbox onChange={(e) => onChange(e.target.checked)} checked={value} />}
                    />
                }
            />
            <FormHelperText>{comment}</FormHelperText>
        </FormControl>
    );
}

export function simpleParameterFactory({dataType, required, ...props}) {
    switch (dataType) {
        case 'CHAR':
        case 'STRING':
            return (
                <TextFieldController
                    {...props}
                    required={required}
                    inputType="text"
                    rules={{
                        required
                    }}
                />
            );
        case 'LONG':
        case 'INT':
        case 'BYTE':
        case 'SHORT':
            return (
                <TextFieldController
                    {...props}
                    required={required}
                    inputType="number"
                    rules={{
                        required,
                        valueAsNumber: true
                    }}
                />
            );
        case 'FLOAT':
        case 'DOUBLE':
            return (
                <TextFieldController
                    {...props}
                    required={required}
                    inputType="number"
                    rules={{
                        required,
                        valueAsNumber: true
                    }}
                />
            );
        case 'BOOLEAN':
            return <CheckBoxController {...props} />;
        default:
            break;
    }
}
