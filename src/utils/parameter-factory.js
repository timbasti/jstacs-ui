import {createFileParameterInput} from './file-parameter-factory';
import {createSelectionParameterInput} from './selection-parameter-factory';
import {createSimpleParameterInput} from './simple-parameter-factory';

export const createParameterInput = ({type, ...properties}) => {
    const parameterType = type.split('.').pop();
    switch (parameterType) {
    case 'SimpleParameter':
        return createSimpleParameterInput(properties);
    case 'FileParameter':
        return createFileParameterInput(properties);
    case 'SelectionParameter':
        return createSelectionParameterInput(properties);
    default:
        return undefined;
    }
};
