import React from 'react';
import {useSelector} from 'react-redux';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
    LinearProgress
} from '@material-ui/core';
import {selectUploads} from '../../api/files/selectors';
import {useUploadDialogStyles, useUploadItemStyles} from './styles';

function UploadItem({fileName, progress}) {
    const classes = useUploadItemStyles();
    return (
        <Paper className={classes.root}>
            <Typography>{fileName}</Typography>
            <LinearProgress variant="determinate" value={progress} />
            <Typography>Uploaded: {progress}%</Typography>
        </Paper>
    );
}

function UploadList() {
    const uploads = useSelector(selectUploads);

    return (
        <DialogContent>
            {uploads.map((upload, uploadIndex) => (
                <UploadItem
                    key={uploadIndex}
                    fileName={upload.fileName}
                    progress={upload.progress}
                />
            ))}
        </DialogContent>
    );
}

export function UploadDialog({open, onClose}) {
    const classes = useUploadDialogStyles();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{className: classes.paper}}
        >
            <DialogTitle>Upload Progress</DialogTitle>
            <UploadList />
            <DialogActions>
                <Button variant="outlined" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}
