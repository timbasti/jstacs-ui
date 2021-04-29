import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import Editor from '@monaco-editor/react';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

import {selectPaletteType} from '../../api/theme/selectors';
import {readFile} from '../../helpers/file-helpers';
import {useStyles} from './styles';

export const FilePreviewDialog = ({file, onClose, open}) => {
    const classes = useStyles();
    const theme = useSelector(selectPaletteType);
    const [fileContent, setFileContent] = useState(null);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        setFileContent(null);
    }, [file, setFileContent]);

    useEffect(() => {
        if (!open) {
            return;
        }
        readFile(file, setFileContent);
    }, [file, open, setFileContent]);

    return (
        <Dialog
            PaperProps={{className: classes.previewDialog}}
            fullWidth
            maxWidth="xl"
            onBackdropClick={handleClose}
            open={open}
        >
            <DialogTitle>
                {file && file.name}
            </DialogTitle>
            <DialogContent>
                <Editor
                    height="100%"
                    language="plaintext"
                    options={{readOnly: true}}
                    theme={theme === 'dark' ? 'vs-dark' : theme}
                    value={fileContent ? fileContent : 'Content not loaded'}
                    width="100%"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    size="small"
                >
                    Close Preview
                </Button>
            </DialogActions>
        </Dialog>
    );
};
