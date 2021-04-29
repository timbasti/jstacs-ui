import React, {createContext, useContext, useEffect, useMemo, useReducer} from 'react';

const fileItemReducer = (state, fileItem) => {
    return {
        ...state,
        [fileItem.ref]: fileItem.file
    };
};

const initialState = {};

export const FileItemContext = createContext({
    fileItems: initialState,
    setFileItem: () => {}
});

export const FileItemProvider = ({children, onChange}) => {
    const [fileItems, setFileItem] = useReducer(fileItemReducer, initialState);
    const fileItemContext = useMemo(
        () => ({
            fileItems,
            setFileItem
        }),
        [fileItems, setFileItem]
    );

    useEffect(() => {
        onChange(fileItems);
    }, [fileItems, onChange]);

    return <FileItemContext.Provider value={fileItemContext}>
        {children}
    </FileItemContext.Provider>;
};

export const useFileItemContext = () => useContext(FileItemContext);
