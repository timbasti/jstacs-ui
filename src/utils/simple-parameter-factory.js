import {ErrorMessage} from '@hookform/error-message';
import {TextField} from '@material-ui/core';
import React, {useCallback} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import NumberFormat from 'react-number-format';

import {UncontrolledCheckbox} from '../components/controlled-checkbox/component';
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

const CreateNumberField = ({parameter, inputItemClasses, parentName}) => {
    const {errors, control} = useFormContext();

    const {lowerBound, upperBound} = parameter.validator || {};
    const minValue = typeof lowerBound === 'number' ? lowerBound : numberTypeMinMaxDefaultMap[parameter.dataType].minValue;
    const maxValue = typeof upperBound === 'number' ? upperBound : numberTypeMinMaxDefaultMap[parameter.dataType].maxValue;
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

    const createNumberFormatTextField = useCallback(
        () => ({onChange, value}) => {
            const createChangeHanlder = (handleChange) => (values) => handleChange(values.floatValue);
            return (
                <NumberFormat
                    className={inputItemClasses}
                    customInput={TextField}
                    error={Boolean(queryObject(errors, parentName ? `${parentName}.${parameter.name}` : parameter.name))}
                    helperText={parameter.comment}
                    isNumericString
                    label={parameter.name}
                    onValueChange={createChangeHanlder(onChange)}
                    thousandSeparator
                    value={value}
                    variant="filled"
                />
            );
        },
        [errors, inputItemClasses, parameter, parentName]
    );

    return (
        <>
            <ErrorMessage
                as="span"
                errors={errors}
                name={parentName ? `${parentName}.${parameter.name}` : parameter.name}
                style={{color: '#f44336'}}
            />

            <Controller
                control={control}
                defaultValue={parameter.value}
                name={parentName ? `${parentName}.${parameter.name}` : parameter.name}
                render={createNumberFormatTextField()}
                rules={registerOptions}
            />
        </>
    );
};

const CreateTextField = ({parameter, inputItemClasses, parentName}) => {
    const {errors, register} = useFormContext();

    const maxCharacterLength = parameter.dataType === 'CHAR' ? 1 : undefined;
    const patternExpression = parameter.validator && parameter.validator.regExp || '';
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
                name={parentName ? `${parentName}.${parameter.name}` : parameter.name}
                style={{color: '#f44336'}}
            />

            <TextField
                className={inputItemClasses}
                defaultValue={parameter.value}
                error={Boolean(queryObject(errors, parentName ? `${parentName}.${parameter.name}` : parameter.name))}
                helperText={parameter.comment}
                inputRef={register(registerOptions)}
                label={parameter.name}
                name={parentName ? `${parentName}.${parameter.name}` : parameter.name}
                type="text"
                variant="filled"
            />
        </>
    );
};

const createCheckbox = (parameter, inputItemClasses, parentName) => {
    const controlledCheckbox =
        <UncontrolledCheckbox
            defaultChecked={parameter.value}
            helperText={parameter.comment}
            inputItemClasses={inputItemClasses}
            name={parentName ? `${parentName}.${parameter.name}` : parameter.name}
        />;
    return controlledCheckbox;
};

// TODO: We need the parent name of selection parameter here
export const createSimpleParameterInput = (parameter, inputItemClasses, parentName) => {
    switch (parameter.dataType) {
    case 'CHAR':
    case 'STRING': {
        return <CreateTextField
            inputItemClasses={inputItemClasses}
            parameter={parameter}
            parentName={parentName}
        />;
    }
    case 'LONG':
    case 'INT':
    case 'SHORT':
    case 'BYTE':
    case 'DOUBLE':
    case 'FLOAT': {
        return <CreateNumberField
            inputItemClasses={inputItemClasses}
            parameter={parameter}
            parentName={parentName}
        />;
    }
    case 'BOOLEAN':
        return createCheckbox(parameter, inputItemClasses, parentName);
    default:
        return undefined;
    }
};
