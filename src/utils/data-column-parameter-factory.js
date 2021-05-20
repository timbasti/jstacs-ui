import React from 'react';

import {DataColumnField} from '../components/input-fields';
import {requiredValueErrorMessage} from './error-messages';

export const createDataColumnParameterInput = (parameter, parentName) => {
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    return (
        <DataColumnField
            defaultValue={parameter.value}
            fileFieldName={parameter.dataRef}
            helperText={parameter.comment}
            label={parameter.name}
            name={name}
            required={requiredRule}
        />
    );
};
