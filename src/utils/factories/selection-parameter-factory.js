import React from 'react';

import {EnrichedSelectField, FieldsetSelectField} from '../../components/input-fields';
import {ParameterGrid} from '../../components/parameter-grid/component';
import {requiredValueErrorMessage} from '../error-messages';

export const createSelectionForParameterSets = (parameter, parentName) => {
    const parameterName = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const options = parameter.parameters.map(({name: subName, parameters}) => {
        const innerParameterName = `${parameterName}.${subName}`;
        return {
            content: <ParameterGrid
                parameters={parameters}
                parentName={innerParameterName}
            />,
            label: subName,
            value: subName
        };
    });

    return (
        <FieldsetSelectField
            defaultValue={parameter.selected}
            helperText={parameter.comment}
            label={parameter.name}
            name={parameterName}
            options={options}
            required={requiredRule}
        />
    );
};

const createSimpleParameterSelection = (parameter, parentName) => {
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
            defaultValue={parameter.selected}
            helperText={parameter.comment}
            label={parameter.name}
            name={name}
            options={options}
            required={requiredRule}
            showEnrichedHelperText
        />
    );
};

export const createSelectionParameterInput = (parameter, parentName) => {
    switch (parameter.dataType) {
    case 'PARAMETERSET':
        return createSelectionForParameterSets(parameter, parentName);
    default:
        return createSimpleParameterSelection(parameter, parentName);
    }
};
