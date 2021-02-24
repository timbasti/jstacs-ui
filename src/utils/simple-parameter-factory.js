import {ErrorMessage} from '@hookform/error-message';
import {TextField} from '@material-ui/core';
import React from 'react';

import {ControlledCheckbox} from '../components/controlled-checkbox/component';
import {minMaxErrorMessage, patternErrorMessage, requiredValueErrorMessage, singleCharErrorMessage} from './error-messages';

const numberTypeMinMaxDefaultMap = {
    BYTE: {
        maxValue: 127,
        minValue: -128
    },
    DOUBLE: {
        maxValue: Number.MAX_VALUE,
        minValue: Number.MIN_VALUE
    },
    FLOAT: {
        maxValue: 3.4028235e38,
        minValue: 1.4e-45
    },
    INT: {
        maxValue: 2147483647,
        minValue: -2147483648
    },
    LONG: {
        maxValue: Number.MAX_SAFE_INTEGER,
        minValue: Number.MIN_SAFE_INTEGER
    },
    SHORT: {
        maxValue: 32767,
        minValue: -32768
    }
};

const queryObject = (object, path) => path
    .split('.')
    .reduce((currentObject, key) => (currentObject && currentObject[key] ? currentObject[key] : undefined), object);

const createNumberField = ({dataType, name, fieldName, value, comment, register, inputItemClasses, errors, validator}) => {
    const {lowerBound, upperBound} = validator || {};
    const minValue = typeof lowerBound === 'number' ? lowerBound : numberTypeMinMaxDefaultMap[dataType].minValue;
    const maxValue = typeof upperBound === 'number' ? upperBound : numberTypeMinMaxDefaultMap[dataType].maxValue;
    const registerOptions = {
        max: {
            message: minMaxErrorMessage(minValue, maxValue),
            value: maxValue
        },
        min: {
            message: minMaxErrorMessage(minValue, maxValue),
            value: minValue
        },
        required: requiredValueErrorMessage(),
        valueAsNumber: true
    };

    return (
        <>
            <ErrorMessage
                as="span"
                errors={errors}
                name={fieldName}
                style={{color: '#f44336'}}
            />

            <TextField
                className={inputItemClasses}
                defaultValue={value}
                error={Boolean(queryObject(errors, fieldName))}
                helperText={comment}
                inputRef={register(registerOptions)}
                label={name}
                name={fieldName}
                type="number"
                variant="filled"
            />
        </>
    );
};

const createTextField = ({dataType, name, fieldName, value, comment, register, inputItemClasses, errors, validator}) => {
    const maxCharacterLength = dataType === 'CHAR' ? 1 : undefined;
    const patternExpression = validator && validator.regExp || '';
    const registerOptions = {
        maxLength: {
            message: singleCharErrorMessage(),
            value: maxCharacterLength
        },
        pattern: {
            message: patternErrorMessage(patternErrorMessage),
            value: patternExpression
        },
        required: requiredValueErrorMessage()
    };

    return (
        <>
            <ErrorMessage
                as="span"
                errors={errors}
                name={fieldName}
                style={{color: '#f44336'}}
            />

            <TextField
                className={inputItemClasses}
                defaultValue={value}
                error={Boolean(queryObject(errors, fieldName))}
                helperText={comment}
                inputRef={register(registerOptions)}
                label={name}
                name={fieldName}
                type="text"
                variant="filled"
            />
        </>
    );
};

const createCheckBox = ({name, fieldName, value, comment, control, inputItemClasses}) => {
    const controlledCheckbox =
        <ControlledCheckbox
            comment={comment}
            control={control}
            fieldName={fieldName}
            inputItemClasses={inputItemClasses}
            name={name}
            value={value}
        />;
    return controlledCheckbox;
};

export const createSimpleParameterInput = ({dataType, ...otherProps}) => {
    switch (dataType) {
    case 'CHAR':
    case 'STRING': {
        return createTextField({
            dataType,
            ...otherProps
        });
    }
    case 'LONG':
    case 'INT':
    case 'SHORT':
    case 'BYTE':
    case 'DOUBLE':
    case 'FLOAT': {
        return createNumberField({
            dataType,
            ...otherProps
        });
    }
    case 'BOOLEAN':
        return createCheckBox({
            dataType,
            ...otherProps
        });
    default:
        return undefined;
    }
};
