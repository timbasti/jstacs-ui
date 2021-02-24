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

export const selectHasError = createSelector([selectError], (error) => Boolean(error));

export const selectToolName = createSelector([selectParameterSet], (parameterSet) => parameterSet && parameterSet.toolName);

export const selectParameters = createSelector([selectParameterSet], (parameterSet) => parameterSet && parameterSet.parameters);

export const selectNumberOfParameters = createSelector([selectParameters], (parameters) => (parameters ? parameters.length : 0));
