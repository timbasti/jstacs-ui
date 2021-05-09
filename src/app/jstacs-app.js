import {makeStyles} from '@material-ui/core';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {selectProcessing as selectFilesProcessing} from '../api/files/selectors';
import {JstacsHeader} from '../components/jstacs-header/component';
import {JstacsMainContent} from '../components/jstacs-main-content/component';
import {JstacsNavigation} from '../components/jstacs-navigation/component';
import {UploadDialog} from '../components/upload-dialog/component';

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
            <JstacsHeader />
            <JstacsNavigation />
            <JstacsMainContent />
        </div>
    );
};
