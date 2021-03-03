import {createFileParameterInput} from './file-parameter-factory';
import {createSelectionParameterInput} from './selection-parameter-factory';
import {createSimpleParameterInput} from './simple-parameter-factory';

export const createParameterInput = (parameter, inputItemClasses, parentName) => {
    const parameterType = parameter.type.split('.').pop();
    switch (parameterType) {
    case 'SimpleParameter':
        return createSimpleParameterInput(parameter, inputItemClasses, parentName);
    case 'FileParameter':
        return createFileParameterInput(parameter, inputItemClasses, parentName);
    case 'SelectionParameter':
        return createSelectionParameterInput(parameter, inputItemClasses, parentName);
    default:
        return undefined;
    }
};
