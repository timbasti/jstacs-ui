import React from 'react';

import {DataColumnField} from '../../components/input-fields';
import {requiredValueErrorMessage} from '../error-messages';

export const createDataColumnParameterInput = (parameter, parentName) => {
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    const dataRef = parentName ? `${parentName}.${parameter.dataRef}` : parameter.dataRef;
    return (
        <DataColumnField
            defaultValue={parameter.value}
            fileFieldName={dataRef}
            helperText={parameter.comment}
            label={parameter.name}
            name={name}
            required={requiredRule}
        />
    );
};
