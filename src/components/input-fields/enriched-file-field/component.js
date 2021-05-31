import {Box, FormControl, FormHelperText, InputLabel, OutlinedInput} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useFormContext, useWatch} from 'react-hook-form';

import {FilePreviewDialog} from '../../file-preview-dialog/component';
import {ErrorNotification} from '../../notifications';
import {SimpleMenu} from '../../simple-menu/component';
import {useStyles} from './styles';

const HiddenSingleFileInput = ({accept, name, required, open, onOpen}) => {
    const inputRef = useRef(null);
    const {register, setValue} = useFormContext();

    useEffect(() => {
        register(name, {required});
    }, [name, register, required]);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.click();
            onOpen();
        }
    }, [onOpen, open]);

    const handleChange = useCallback(() => {
        setValue(name, inputRef.current.files[0], {shouldValidate: true});
    }, [name, setValue]);

    return <input
        accept={accept}
        hidden
        onChange={handleChange}
        ref={inputRef}
        type="file"
    />;
};

HiddenSingleFileInput.propTypes = {
    accept: PropTypes.string,
    name: PropTypes.string.isRequired,
    onOpen: PropTypes.func,
    open: PropTypes.bool,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

HiddenSingleFileInput.defaultProps = {
    accept: '',
    onOpen: () => {},
    open: false,
    required: false
};

const options = [
    ['load', 'Load File'],
    ['open', 'Open File']
];

const EnrichedFileInput = ({accept, name, label, helperText, required}) => {
    const [fileInputOpen, setFileInputOpen] = useState(false);
    const [filePreviewOpen, setFilePreviewOpen] = useState(false);
    const labelRef = useRef(null);
    const classes = useStyles();

    const {control} = useFormContext();
    const selectedFile = useWatch({
        control,
        name
    });

    const handleCloseFilePreview = useCallback(() => {
        setFilePreviewOpen(false);
    }, [setFilePreviewOpen]);

    const handleOptionClick = useCallback(
        (clickedOption) => {
            switch (clickedOption) {
            case 'load':
                setFileInputOpen(true);
                break;
            case 'open':
                if (selectedFile) {
                    setFilePreviewOpen(true);
                }
                break;
            default:
                break;
            }
        },
        [selectedFile]
    );

    const handleFileOpenerClick = useCallback(() => {
        setFileInputOpen(true);
    }, []);

    const handleFileInputOpen = useCallback(() => {
        setFileInputOpen(false);
    }, []);

    return (
        <FormControl
            className={classes.root}
            fullWidth
            innerRef={labelRef}
            required={Boolean(required)}
            variant="outlined"
        >
            <ErrorNotification
                anchorEl={labelRef.current}
                name={name}
            />
            <InputLabel htmlFor={name}>
                {label}
            </InputLabel>
            <Box className={classes.input}>
                <OutlinedInput
                    className={classes.fileDisplay}
                    id={name}
                    inputProps={{className: classes.nameInput}}
                    label={label}
                    onClick={handleFileOpenerClick}
                    readOnly
                    type="text"
                    value={selectedFile?.name || ''}
                />
                <SimpleMenu
                    className={classes.fileAction}
                    onClick={handleOptionClick}
                    options={options}
                />
            </Box>
            <FormHelperText className={classes.fileComment}>
                {helperText}
            </FormHelperText>
            <HiddenSingleFileInput
                accept={accept}
                name={name}
                onOpen={handleFileInputOpen}
                open={fileInputOpen}
                required={required}
            />
            <FilePreviewDialog
                file={selectedFile}
                onClose={handleCloseFilePreview}
                open={filePreviewOpen}
            />
        </FormControl>
    );
};

EnrichedFileInput.propTypes = {
    accept: PropTypes.string,
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
};

EnrichedFileInput.defaultProps = {
    accept: '',
    helperText: '',
    label: '',
    name: '',
    required: false
};

export {EnrichedFileInput};
