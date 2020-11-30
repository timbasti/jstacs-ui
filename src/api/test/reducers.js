export const getParameterSetStart = (state) => {
    state.error = null;
    state.processing = true;
};

export const getParameterSetSuccess = (state, action) => {
    const {type, toolName, errorMessage, parameters} = action.payload;
    state.processing = false;
    state.parameterSet = {type, toolName, errorMessage, parameters};
};

export const getParameterSetFailure = (state, action) => {
    state.error = action.payload;
    state.processing = false;
};
