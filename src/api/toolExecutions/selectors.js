import {createSelector} from 'reselect';

export const toolExecutionStates = {
    FULFILLED: 'FULFILLED',
    INITIALIZED: 'INITIALIZED',
    PENDING: 'PENDING',
    REJECTED: 'REJECTED'
};

export const selectState = (state) => state.toolExecutions;

export const selectError = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.error;
};

export const selectProcessing = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.processing;
};

export const selectCreatedToolExecution = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.created;
};

export const selectLoadedToolExecution = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.loaded;
};

export const selectAvailableToolExecutions = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.available;
};

export const selectUpdatedParameterSet = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.updatedParameterSet;
};

export const selectInitializedToolExecutions = createSelector(selectAvailableToolExecutions, (availableToolExecutions) => {
    return availableToolExecutions?.filter(({state}) => state === toolExecutionStates.INITIALIZED);
});

export const selectPendingToolExecutions = createSelector(selectAvailableToolExecutions, (availableToolExecutions) => {
    return availableToolExecutions?.filter(({state}) => state === toolExecutionStates.PENDING);
});

export const selectFulfilledToolExecutions = createSelector(selectAvailableToolExecutions, (availableToolExecutions) => {
    return availableToolExecutions?.filter(({state}) => state === toolExecutionStates.FULFILLED);
});

export const selectRejectedToolExecutions = createSelector(selectAvailableToolExecutions, (availableToolExecutions) => {
    return availableToolExecutions?.filter(({state}) => state === toolExecutionStates.REJECTED);
});
