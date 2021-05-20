import {createDataColumnParameterInput} from './data-column-parameter-factory';
import {createFileParameterInput} from './file-parameter-factory';
import {createSelectionParameterInput} from './selection-parameter-factory';
import {createSimpleParameterInput} from './simple-parameter-factory';

export const createParameterInput = (parameter, parentName) => {
    const parameterType = parameter.type.split('.').pop();
    switch (parameterType) {
    case 'SimpleParameter':
        return createSimpleParameterInput(parameter, parentName);
    case 'FileParameter':
        return createFileParameterInput(parameter, parentName);
    case 'EnumParameter':
    case 'SelectionParameter':
        return createSelectionParameterInput(parameter, parentName);
    case 'DataColumnParameter':
        return createDataColumnParameterInput(parameter, parentName);
    default:
        console.error('Not supported parameter type');
        return undefined;
    }
};
