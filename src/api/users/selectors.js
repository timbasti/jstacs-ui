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

export const selectUserExecutions = (state) => {
    const userState = selectState(state);
    return userState.executions;
};
