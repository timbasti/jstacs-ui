export const changeApplicationTheme = (state, action) => {
    const paletteType = action.payload;
    state.paletteType = paletteType;
};
