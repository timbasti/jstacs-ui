export const selectState = (state) => state.route;

export const selectView = (state) => {
    const routeState = selectState(state);
    return routeState.view;
};

export const selectSection = (state) => {
    const routeState = selectState(state);
    return routeState.view;
};

export const selectOpenApplication = (state) => {
    const routeState = selectState(state);
    return routeState.view;
};
