import React, {createContext, useContext, useLayoutEffect, useMemo, useState} from 'react';
import {useLocation} from 'react-router';

export const AppHeaderControlsContext = createContext({
    controls: [],
    setControls: (newControls = []) => {}
});

export const AppHeaderControlsProvider = ({children}) => {
    const [controls, setControls] = useState([]);

    const {pathname} = useLocation();

    const appHeaderControlsContext = useMemo(
        () => ({
            controls,
            setControls
        }),
        [controls, setControls]
    );

    useLayoutEffect(() => {
        setControls([]);
    }, [setControls, pathname]);

    return <AppHeaderControlsContext.Provider value={appHeaderControlsContext}>
        {children}
    </AppHeaderControlsContext.Provider>;
};

export const useAppHeaderControlsContext = () => useContext(AppHeaderControlsContext);
