import {createAsyncThunk} from '@reduxjs/toolkit';
import {requests} from './requests';
import {selectParameterSet, selectParameters} from './selectors';
import {thunks as filesThunks} from '../files/thunks';

function updateParameters() {}

function getUpdatedParameters(formData, parameters) {
    const files = [];
    const updatedParameters = parameters.map((parameter) => {
        const spaceLessIdentifier = parameter.name.replace(/ /g, '_');
        const parameterType = parameter.type.split('.').pop();
        switch (parameterType) {
            case 'SimpleParameter':
                return {...parameter, value: formData[spaceLessIdentifier]};
            case 'FileParameter':
                if (formData[spaceLessIdentifier].size !== undefined) {
                    files.push(formData[spaceLessIdentifier]);
                }
                return {
                    ...parameter,
                    fileContents: {fileName: formData[spaceLessIdentifier].name}
                };
            case 'SelectionParameter':
                const selectionParameterFormData = formData[spaceLessIdentifier];
                const parameterCollections = parameter.parametersInCollection;
                const selectedCollection = parameterCollections[selectionParameterFormData.selection];

                const {updatedParameters: updatedParametersInCollection, files: filesForCollection} = getUpdatedParameters(
                    selectionParameterFormData,
                    selectedCollection.parameters
                );
                if (filesForCollection.length > 0) {
                    files.push(...filesForCollection);
                }
                const updatedCollection = {...selectedCollection, parameters: updatedParametersInCollection};
                const updatedCollectionList = [...parameterCollections];
                updatedCollectionList[selectionParameterFormData.selection] = updatedCollection;
                const updatedParameter = {
                    ...parameter,
                    parametersInCollection: updatedCollectionList,
                    value: selectionParameterFormData.selection
                };
                return updatedParameter;
            default:
                return parameter;
        }
    });

    return {updatedParameters, files};
}

const fetchParameterSet = createAsyncThunk('test/parameterSet/fetch', async () => {
    const {data} = await requests.parameterSet.fetch();
    return {data};
});

const postParameterSet = createAsyncThunk('test/parameterSet/post', async (parameterSet) => {
    const {data} = await requests.parameterSet.post(parameterSet);
    return {data};
});

const updateParameterSet = createAsyncThunk('test/parameterSet/update', async (formData, {dispatch, getState}) => {
    const state = getState();
    const parameters = selectParameters(state);
    const {updatedParameters, files} = getUpdatedParameters(formData, parameters);
    const parameterSet = selectParameterSet(state);
    const updatedParameterSet = {
        ...parameterSet,
        parameters: updatedParameters
    };
    if (files.length > 0) {
        await dispatch(filesThunks.allFiles.post(files));
    }
    await dispatch(postParameterSet(updatedParameterSet));
});

export const thunks = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet,
        update: updateParameterSet
    }
};
