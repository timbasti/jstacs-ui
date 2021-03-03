import {createAsyncThunk} from '@reduxjs/toolkit';
import {produce} from 'immer';

import {thunks as filesThunks} from '../files/thunks';
import {requests} from './requests';
import {selectParameters, selectParameterSet} from './selectors';

const updateSimpleParameter = (inputValue, simpleParameter) => ({
    updatedParameter: {
        ...simpleParameter,
        value: inputValue
    }
});

const updateFileParameter = (inputValue, fileParameter) => {
    const newFiles = [];
    if (inputValue > 0) {
        newFiles.push(inputValue);
    }
    const updatedParameter = {
        ...fileParameter,
        fileContents: {name: inputValue.name}
    };
    return {
        newFiles,
        updatedParameter
    };
};

const updateParameterSetContainer = (inputValues, parameterSetContainer) => {
    const selectedParameterSet = parameterSetContainer.value;
    const {newFiles, updatedParameters} = updateParameters(inputValues, selectedParameterSet.parameters);
    console.log('updateParameterSetContainer', newFiles, updatedParameters);
    const updatedParameterSet = {
        ...selectedParameterSet,
        parameters: updatedParameters
    };
    return {
        newFiles,
        updatedParameterSetContainer: {
            ...parameterSetContainer,
            value: updatedParameterSet
        }
    };
};

const updateSelectionParameter = (selectionParameterValue, selectionParameter) => {
    console.log('updateSelectionParameter >>>', selectionParameterValue, selectionParameter);

    if (selectionParameter.isAtomic) {
        return {
            updatedParameter: {
                ...selectionParameter,
                selectedName: selectionParameterValue
            }
        };
    }

    const {selected, selectedName, ...otherFormData} = selectionParameterValue;
    const nonAtomicParameterSet = selectionParameter.parametersInCollection;
    const selectedParameterSetContainer = nonAtomicParameterSet.parameters[selected];
    const {newFiles, updatedParameterSetContainer} = updateParameterSetContainer(otherFormData, selectedParameterSetContainer);
    const updatedParameters = produce(nonAtomicParameterSet.parameters, (parametersDraft) => {
        parametersDraft[selected] = updatedParameterSetContainer;
    });
    return {
        newFiles,
        updatedParameter: {
            ...selectionParameter,
            parametersInCollection: {
                ...nonAtomicParameterSet,
                parameters: updatedParameters
            },
            selected,
            selectedName
        }
    };
};

const updateParameter = (inputValue, parameter) => {
    const parameterType = parameter.type.split('.').pop();
    switch (parameterType) {
    case 'SimpleParameter':
        return updateSimpleParameter(inputValue, parameter);
    case 'FileParameter':
        return updateFileParameter(inputValue, parameter);
    case 'SelectionParameter':
        return updateSelectionParameter(inputValue, parameter);
    default:
        // TODO: Maybe throw an error or something
        return {
            newFiles: [],
            updatedParameter: parameter
        };
    }
};

const updateParameters = (formData, parameters) => {
    console.log('updateParameters', formData, parameters);
    const collectedNewFiles = [];
    const updatedParameters = parameters.map((parameter) => {
        const formInputValue = formData[parameter.name];
        // TODO: Maybe throw an error or something
        if (formInputValue === undefined) {
            return parameter;
        }
        const {newFiles = [], updatedParameter} = updateParameter(formInputValue, parameter);
        console.log('updateParameters', newFiles, updatedParameter);
        collectedNewFiles.push(...newFiles);
        return updatedParameter;
    });

    return {
        newFiles: collectedNewFiles,
        updatedParameters
    };
};

const fetchParameterSet = createAsyncThunk('test/parameterSet/fetch', async () => {
    const {data} = await requests.parameterSet.fetch();
    return {data};
});

const postParameterSet = createAsyncThunk('test/parameterSet/post', async (parameterSet) => {
    const {data} = await requests.parameterSet.post(parameterSet);
    return {data};
});

const updateParameterSet = createAsyncThunk('test/parameterSet/update', async (formData, {dispatch, getState}) => {
    console.log('updateParameterSet', formData);
    const state = getState();
    const parameters = selectParameters(state);
    const {updatedParameters, newFiles} = updateParameters(formData, parameters);
    console.log('updateParameterSet >>>', updatedParameters, newFiles);
    const parameterSet = selectParameterSet(state);
    const updatedParameterSet = {
        ...parameterSet,
        parameters: updatedParameters
    };
    if (newFiles.length > 0) {
        await dispatch(filesThunks.allFiles.post(newFiles));
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
