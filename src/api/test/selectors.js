import {createSelector} from '@reduxjs/toolkit';

export const selectState = (state) => state.test;

export const selectError = (state) => {
    const testState = selectState(state);
    return testState.error;
};

export const selectProcessing = (state) => {
    const testState = selectState(state);
    return testState.processing;
};

export const selectParameterSet = (state) => {
    const testState = selectState(state);
    return testState.parameterSet;
};

export const selectHasError = createSelector([selectError], (error) => {
    return !!error;
});

export const selectToolName = createSelector([selectParameterSet], (parameterSet) => {
    return parameterSet && parameterSet.toolName;
});

export const selectParameters = createSelector([selectParameterSet], (parameterSet) => {
    return parameterSet && parameterSet.parameters;
});

export const selectNumberOfParameters = createSelector([selectParameters], (parameters) => {
    return parameters ? parameters.length : 0;
});
