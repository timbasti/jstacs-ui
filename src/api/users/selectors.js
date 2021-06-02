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
