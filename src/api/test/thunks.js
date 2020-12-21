import {createAsyncThunk} from '@reduxjs/toolkit';
import {requests} from './requests';
import {selectParameterSet, selectParameters} from './selectors';
import {actions as filesActions} from '../files/actions';
import {thunks as filesThunks} from '../files/thunks';

function getUpdatedParameters(formData, state) {
    const files = [];
    const parameters = selectParameters(state);
    const updatedParameters = parameters.map((parameter) => {
        const spaceLessIdentifier = parameter.name.replace(/ /g, '_');
        const parameterType = parameter.type.split('.').pop();
        switch (parameterType) {
            case 'SimpleParameter':
                return {...parameter, value: formData[spaceLessIdentifier]};
            case 'FileParameter':
                files.push(formData[spaceLessIdentifier]);
                return {
                    ...parameter,
                    fileContents: {fileName: formData[spaceLessIdentifier].name}
                };
            default:
                return {};
        }
    });
    return {updatedParameters, files};
}

const fetchParameterSet = createAsyncThunk(
    'test/parameterSet/fetch',
    async () => {
        const response = await requests.parameterSet.fetch();
        return response.data;
    }
);

const postParameterSet = createAsyncThunk(
    'test/parameterSet/post',
    async (parameterSet) => {
        const response = await requests.parameterSet.post(parameterSet);
        return response.data;
    }
);

const updateParameterSet = createAsyncThunk(
    'test/parameterSet/update',
    async (formData, {dispatch, getState}) => {
        const state = getState();
        const {updatedParameters, files} = getUpdatedParameters(
            formData,
            state
        );
        const parameterSet = selectParameterSet(state);
        const updatedParameterSet = {
            ...parameterSet,
            parameters: updatedParameters
        };
        if (files.length > 0) {
            const fileNames = files.map((file) => file.name);
            dispatch(filesActions.allFiles.init(fileNames));
            await dispatch(filesThunks.allFiles.post(files));
        }
        await dispatch(postParameterSet(updatedParameterSet));
    }
);

export const thunks = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet,
        update: updateParameterSet
    }
};
