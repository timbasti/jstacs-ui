import React from 'react';

import {EnrichedFileInput} from '../components/input-fields';
import {requiredValueErrorMessage} from './error-messages';

export const createFileParameterInput = (parameter, parentName) => {
    const accept = parameter?.acceptedExtensions
        .split(',')
        .map((extension) => (extension.startsWith('.') ? extension : `.${extension}`))
        .join(',') || '';
    const requiredRule = parameter.required ? requiredValueErrorMessage : false;
    const name = parentName ? `${parentName}.${parameter.name}` : parameter.name;
    return (
        <EnrichedFileInput
            accept={accept}
            helperText={parameter.comment}
            label={parameter.name}
            name={name}
            required={requiredRule}
        />
    );
};
