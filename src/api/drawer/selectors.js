export const selectState = (state) => state.drawer;

export const selectDrawerOpenState = (state) => {
    const drawerState = selectState(state);
    return drawerState.open;
};
