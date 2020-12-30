import {createSimpleParameterInput} from './simple-parameter-factory';
import {createFileParameterInput} from './file-parameter-factory';

export function createParameterInput({type, ...properties}) {
    const parameterType = type.split('.').pop();
    switch (parameterType) {
        case 'SimpleParameter':
            return createSimpleParameterInput(properties);
        case 'FileParameter':
            return createFileParameterInput(properties);
        default:
            break;
    }
}