import React from 'react';

import {EnrichedSelectField} from '../../components/input-fields';
import {requiredValueErrorMessage} from '../error-messages';

const createEnumParameterSelection = (parameter, parentName) => {
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const options = parameter.parameters.map(({name, value}) => {
        return {
            assignment: value,
            label: name,
            value: name
        };
    });
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    return (
        <EnrichedSelectField
            defaultValue={parameter.value}
            helperText={parameter.comment}
            label={parameter.name}
            name={name}
            options={options}
            required={requiredRule}
        />
    );
};

export const createEnumParameterInput = (parameter, parentName) => {
    return createEnumParameterSelection(parameter, parentName);
};
