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
    return toolExecutionState.created || [];
};

export const selectLoadedToolExecution = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.loaded || [];
};

export const selectUpdatedParameterSet = (state) => {
    const toolExecutionState = selectState(state);
    return toolExecutionState.updatedParameterSet || [];
};
