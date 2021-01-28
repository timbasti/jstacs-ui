import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import {selectProcessing as selectFilesProcessing} from '../api/files/selectors';
import {JstacsHeader} from '../components/jstacs-header/component';
import {JstacsNavigation} from '../components/jstacs-navigation/component';
import {JstacsMainContent} from '../components/jstacs-main-content/component';
import {UploadDialog} from '../components/upload-dialog/component';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }
}));

export function JstacsApp() {
    const filesProcessing = useSelector(selectFilesProcessing);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (filesProcessing) {
            setOpenUploadDialog(true);
        }
    }, [filesProcessing]);

    const handleUploadDialogClose = () => {
        setOpenUploadDialog(false);
    };

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
