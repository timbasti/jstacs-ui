import React from 'react';

import {EnrichedCheckbox, EnrichedNumberField, EnrichedTextField} from '../../components/input-fields';
import {
    maxErrorMessage,
    maxLengthErrorMessage,
    minErrorMessage,
    minLengthErrorMessage,
    requiredValueErrorMessage
} from '../error-messages';

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

const textTypeMinMaxLengthDefaultMap = {
    CHAR: {
        maxLength: 1,
        minLength: 0
    },
    STRING: {
        maxLength: Number.MAX_SAFE_INTEGER,
        minLength: 0
    }
};

const createTextField = (parameter, parentName) => {
    const dataType = parameter.dataType;
    const minMaxLengths = textTypeMinMaxLengthDefaultMap[dataType];
    const minLengthRule = minLengthErrorMessage(minMaxLengths.minLength);
    const maxLengthRule = maxLengthErrorMessage(minMaxLengths.maxLength);
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    return (
        <EnrichedTextField
            defaultValue={parameter.value}
            helperText={parameter.comment}
            label={parameter.name}
            maxLength={maxLengthRule}
            minLength={minLengthRule}
            name={name}
            required={requiredRule}
        />
    );
};

const createNumberField = (parameter, parentName) => {
    const dataType = parameter.dataType;
    const minMaxValues = numberTypeMinMaxDefaultMap[dataType];
    const minRule = minErrorMessage(minMaxValues.minValue);
    const maxRule = maxErrorMessage(minMaxValues.maxValue);
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    return (
        <EnrichedNumberField
            defaultValue={parameter.value}
            helperText={parameter.comment}
            label={parameter.name}
            max={maxRule}
            min={minRule}
            name={name}
            required={requiredRule}
        />
    );
};

const createCheckbox = (parameter, parentName) => {
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    return (
        <EnrichedCheckbox
            defaultChecked={parameter.value}
            helperText={parameter.comment}
            label={parameter.name}
            name={name}
        />
    );
};

export const createSimpleParameterInput = (parameter, parentName) => {
    switch (parameter.dataType) {
    case 'CHAR':
    case 'STRING': {
        return createTextField(parameter, parentName);
    }
    case 'LONG':
    case 'INT':
    case 'SHORT':
    case 'BYTE':
    case 'DOUBLE':
    case 'FLOAT': {
        return createNumberField(parameter, parentName);
    }
    case 'BOOLEAN':
        return createCheckbox(parameter, parentName);
    default:
        console.error('Not supported data type');
        return undefined;
    }
};
