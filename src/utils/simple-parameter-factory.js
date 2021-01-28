import React from 'react';
import {TextField} from '@material-ui/core';
import {ControlledCheckbox} from '../components/controlled-checkbox/component';
import {minMaxErrorMessage, patternErrorMessage, requiredValueErrorMessage, singleCharErrorMessage} from './error-messages';
import {ErrorMessage} from '@hookform/error-message';

const queryObject = (object, path) =>
    path.split('.').reduce((currentObject, key) => (currentObject && currentObject[key] ? currentObject[key] : undefined), object);

function createNumberField({name, fieldName, value, comment, required, register, inputItemClasses, minValue, maxValue, errors}) {
    const registerOptions = {
        required: requiredValueErrorMessage(),
        valueAsNumber: true,
        min: {value: minValue, message: minMaxErrorMessage(minValue, maxValue)},
        max: {value: maxValue, message: minMaxErrorMessage(minValue, maxValue)}
    };

    return (
        <React.Fragment>
            <ErrorMessage style={{color: '#f44336'}} name={fieldName} errors={errors} as="span" />
            <TextField
                inputRef={register(registerOptions)}
                name={fieldName}
                label={name}
                defaultValue={value}
                helperText={comment}
                type="number"
                variant="filled"
                className={inputItemClasses}
                error={!!queryObject(errors, fieldName)}
            />
        </React.Fragment>
    );
}

function createTextField({
    name,
    fieldName,
    value,
    comment,
    required,
    register,
    inputItemClasses,
    patternExpression,
    maxLength,
    errors
}) {
    const registerOptions = {
        required: requiredValueErrorMessage(),
        pattern: {
            value: patternExpression,
            message: patternErrorMessage(patternErrorMessage)
        },
        maxLength: {
            value: maxLength,
            message: singleCharErrorMessage()
        }
    };

    return (
        <React.Fragment>
            <ErrorMessage style={{color: '#f44336'}} name={fieldName} errors={errors} as="span" />
            <TextField
                inputRef={register(registerOptions)}
                name={fieldName}
                label={name}
                defaultValue={value}
                helperText={comment}
                type="text"
                variant="filled"
                className={inputItemClasses}
                error={!!queryObject(errors, fieldName)}
            />
        </React.Fragment>
    );
}

function createCheckBox(props) {
    return <ControlledCheckbox {...props} />;
}

export function createSimpleParameterInput({dataType, validator, ...otherProps}) {
    switch (dataType) {
        case 'CHAR': {
            const patternExpression = (validator && validator.regExp) || '';
            return createTextField({
                ...otherProps,
                patternExpression,
                maxLength: 1
            });
        }
        case 'STRING': {
            const patternExpression = (validator && validator.regExp) || '';
            return createTextField({...otherProps, patternExpression});
        }
        case 'LONG': {
            const {lowerBound, upperBound} = validator || {};
            const minValue = typeof lowerBound === 'number' ? lowerBound : Number.MIN_SAFE_INTEGER;
            const maxValue = typeof upperBound === 'number' ? upperBound : Number.MAX_SAFE_INTEGER;
            return createNumberField({...otherProps, minValue, maxValue});
        }
        case 'INT': {
            const {lowerBound, upperBound} = validator || {};
            const minValue = typeof lowerBound === 'number' ? lowerBound : -2147483648;
            const maxValue = typeof upperBound === 'number' ? upperBound : 2147483647;
            return createNumberField({...otherProps, minValue, maxValue});
        }
        case 'SHORT': {
            const {lowerBound, upperBound} = validator || {};
            const minValue = typeof lowerBound === 'number' ? lowerBound : -32768;
            const maxValue = typeof upperBound === 'number' ? upperBound : 32767;
            return createNumberField({...otherProps, minValue, maxValue});
        }
        case 'BYTE': {
            const {lowerBound, upperBound} = validator || {};
            const minValue = typeof lowerBound === 'number' ? lowerBound : -128;
            const maxValue = typeof upperBound === 'number' ? upperBound : 127;
            return createNumberField({...otherProps, minValue, maxValue});
        }
        case 'DOUBLE': {
            const {lowerBound, upperBound} = validator || {};
            const minValue = typeof lowerBound === 'number' ? lowerBound : Number.MIN_VALUE;
            const maxValue = typeof upperBound === 'number' ? upperBound : Number.MAX_VALUE;
            return createNumberField({...otherProps, minValue, maxValue});
        }
        case 'FLOAT': {
            const {lowerBound, upperBound} = validator || {};
            const minValue = typeof lowerBound === 'number' ? lowerBound : 1.4e-45;
            const maxValue = typeof upperBound === 'number' ? upperBound : 3.4028235e38;
            return createNumberField({...otherProps, minValue, maxValue});
        }
        case 'BOOLEAN':
            return createCheckBox(otherProps);
        default:
            break;
    }
}
