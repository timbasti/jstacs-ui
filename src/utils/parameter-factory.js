import {createDataColumnParameter} from './data-column-parameter-factory';
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
    case 'EnumParameter':
    case 'SelectionParameter':
        return createSelectionParameterInput(parameter, inputItemClasses, parentName);
    case 'DataColumnParameter':
        return createDataColumnParameter(parameter, inputItemClasses, parentName);
    default:
        console.error('Not supported parameter type');
        return undefined;
    }
};
