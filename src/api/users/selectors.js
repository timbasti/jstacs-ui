import {createSelector} from 'reselect';

import {toolExecutionStates} from '../toolExecutions/selectors';

export const selectState = (state) => state.user;

export const selectError = (state) => {
    const userState = selectState(state);
    return userState.error;
};

export const selectProcessing = (state) => {
    const userState = selectState(state);
    return userState.processing;
};

export const selectUserId = (state) => {
    const userState = selectState(state);
    return userState.id;
};

export const selectUserToolExecutions = (state) => {
    const userState = selectState(state);
    return userState.toolExecutions;
};

export const selectUserInitializedToolExecutions = createSelector(selectUserToolExecutions, (userToolExecutions) => {
    return userToolExecutions?.filter(({state}) => state === toolExecutionStates.INITIALIZED);
});

export const selectUserPendingToolExecutions = createSelector(selectUserToolExecutions, (userToolExecutions) => {
    return userToolExecutions?.filter(({state}) => state === toolExecutionStates.PENDING);
});

export const selectUserFulfilledToolExecutions = createSelector(selectUserToolExecutions, (userToolExecutions) => {
    return userToolExecutions?.filter(({state}) => state === toolExecutionStates.FULFILLED);
});

export const selectUserRejectedToolExecutions = createSelector(selectUserToolExecutions, (userToolExecutions) => {
    return userToolExecutions?.filter(({state}) => state === toolExecutionStates.REJECTED);
});

export const selectUserUsedTools = createSelector(selectUserToolExecutions, (userToolExecutions) => {
    const toolMap = userToolExecutions?.reduce((usedTools, currentExecution) => {
        const toolId = currentExecution.tool.id;
        const executionState = currentExecution.state;
        const currentExecutionCounts = {
            [toolExecutionStates.INITIALIZED]: usedTools[toolId]?.[toolExecutionStates.INITIALIZED] || 0,
            [toolExecutionStates.PENDING]: usedTools[toolId]?.[toolExecutionStates.PENDING] || 0,
            [toolExecutionStates.FULFILLED]: usedTools[toolId]?.[toolExecutionStates.FULFILLED] || 0,
            [toolExecutionStates.REJECTED]: usedTools[toolId]?.[toolExecutionStates.REJECTED] || 0
        };
        return {
            ...usedTools,
            [toolId]: {
                ...currentExecutionCounts,
                [executionState]: currentExecutionCounts[executionState] + 1,
                lastUsedAt: currentExecution.createdAt,
                name: currentExecution.tool.name
            }
        };
    }, {});

    return Object.keys(toolMap).map((toolId) => ({
        ...toolMap[toolId],
        id: toolId
    }));
});
