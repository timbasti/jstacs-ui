import {Button, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Paper, Typography} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';

import {selectUploads} from '../../api/files/selectors';
import {useUploadDialogStyles, useUploadItemStyles} from './styles';

const UploadItem = ({name, progress}) => {
    const classes = useUploadItemStyles();
    return (
        <Paper className={classes.root}>
            <Typography>
                {name}
            </Typography>

            <LinearProgress
                value={progress}
                variant="determinate"
            />

            <Typography>
                Uploaded:
                {progress}
                %
            </Typography>
        </Paper>
    );
};

// TODO: Change key of upload item: Use also tool name to identify uploaded file
const UploadList = () => {
    const uploads = useSelector(selectUploads);

    return (
        <DialogContent>
            {uploads.map((upload) => <UploadItem
                key={upload.name}
                name={upload.name}
                progress={upload.progress}
            />)}
        </DialogContent>
    );
};

const UploadDialog = ({open, onClose}) => {
    const classes = useUploadDialogStyles();

    const handleClose = useCallback(onClose, [onClose]);

    return (
        <Dialog
            PaperProps={{className: classes.paper}}
            onClose={handleClose}
            open={open}
        >
            <DialogTitle>
                Upload Progress
            </DialogTitle>

            <UploadList />

            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

UploadItem.propTypes = {
    name: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired
};

UploadDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};

UploadDialog.defaultProps = {
    onClose: undefined,
    open: false
};

export {UploadDialog};
