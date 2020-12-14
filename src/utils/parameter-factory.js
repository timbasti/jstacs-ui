import {simpleParameterFactory} from './simple-parameter-factory';
import {fileParameterFactory} from './file-parameter-factory';

export function parameterFactory({type, ...properties}) {
    const parameterType = type.split('.').pop();
    switch (parameterType) {
        case 'SimpleParameter':
            return simpleParameterFactory(properties);
        case 'FileParameter':
            return fileParameterFactory(properties);
        default:
            break;
    }
}