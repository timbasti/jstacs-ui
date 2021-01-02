import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import {makeStyles, useMediaQuery} from '@material-ui/core';
import {selectProcessing as selectFilesProcessing} from "../api/files/selectors";
import {JstacsHeader} from '../components/jstacs-header/component';
import {JstacsNavigation} from '../components/jstacs-navigation/component';
import {JstacsMainContent} from '../components/jstacs-main-content/component';
import {UploadDialog} from '../components/upload-dialog/component';
import {changeApplicationTheme} from '../api/theme/actions';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }
}));

export function JstacsApp() {
    const dispatch = useDispatch();
    const filesProcessing = useSelector(selectFilesProcessing);
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark), (prefers-color-scheme: no-preference)');
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (filesProcessing) {
            setOpenUploadDialog(true);
        }
    }, [filesProcessing]);

    useEffect(() => {
        const newPaletteType = prefersDarkMode ? 'dark' : 'light';
        dispatch(changeApplicationTheme(newPaletteType));
    }, [prefersDarkMode, dispatch]);

    const handleUploadDialogClose = () => {
        setOpenUploadDialog(false);
    }

    return (
        <div className={classes.root}>
            <UploadDialog open={openUploadDialog} onClose={handleUploadDialogClose} />
            <JstacsHeader />
            <Router>
                <JstacsNavigation />
                <JstacsMainContent />
            </Router>
        </div>
    );
}
