import {createContext} from 'react';

export const FileItemContext = createContext();

export const fileItemReducer = (state, fileItem) => ({
    ...state,
    [fileItem.ref]: fileItem.file
});
