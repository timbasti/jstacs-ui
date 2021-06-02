import {makeStyles} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {selectProcessing as selectFilesProcessing} from '../api/files/selectors';
import {UploadDialog} from '../components/upload-dialog/component';
import {AppHeaderControlsProvider} from '../utils/contexts/app-header-controls-context';
import {JstacsHeader} from './jstacs-header';
import {JstacsMainContent} from './jstacs-main-content';
import {JstacsNavigation} from './jstacs-navigation';

const useStyles = makeStyles((theme) => ({root: {display: 'flex'}}));

export const JstacsApp = () => {
    const filesProcessing = useSelector(selectFilesProcessing);
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        if (filesProcessing) {
            setOpenUploadDialog(true);
        }
    }, [filesProcessing]);

    const handleUploadDialogClose = useCallback(() => {
        setOpenUploadDialog(false);
    }, [setOpenUploadDialog]);

    return (
        <div className={classes.root}>
            <UploadDialog
                onClose={handleUploadDialogClose}
                open={openUploadDialog}
            />
            <AppHeaderControlsProvider>
                <JstacsHeader />
                <JstacsNavigation />
                <JstacsMainContent />
            </AppHeaderControlsProvider>
        </div>
    );
};
