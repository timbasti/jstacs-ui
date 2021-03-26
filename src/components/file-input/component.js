import {Box, FormControl, FormHelperText, InputLabel, OutlinedInput} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {saveFile} from '../../helpers/file-helpers';
import {useFileItemContext} from '../../utils/file-context';
import {FilePreviewDialog} from '../file-preview-dialog/component';
import {SimpleMenu} from '../simple-menu/component';
import {useStyles} from './styles';

const options = [['load', 'Load File'], ['save', 'Save File'], ['open', 'Open File']];

const FileInput = ({name, label, defaultFile, helperText, onChange, className, required}) => {
    const inputRef = useRef();
    const labelRef = useRef();
    const {setFileItem} = useFileItemContext();
    const [labelWidth, setLabelWidth] = useState(0);
    const [file, setFile] = useState(defaultFile || {});
    const [openFilePreview, setOpenFilePreview] = useState(false);
    const classes = useStyles({labelWidth});

    const handleCloseFilePreview = useCallback(() => {
        setOpenFilePreview(false);
    }, [setOpenFilePreview]);

    const handleFileInputChanged = useCallback(
        (evnt) => {
            const [loadedFile] = evnt.target.files;
            if (!loadedFile) {
                return;
            }
            setFile(loadedFile);
        },
        [setFile]
    );

    const handleOptionClick = useCallback(
        (clickedOption) => {
            switch (clickedOption) {
            case 'load':
                inputRef.current.click();
                break;
            case 'save':
                saveFile(file);
                break;
            case 'open':
                setOpenFilePreview(true);
                break;
            default:
                break;
            }
        },
        [inputRef, file]
    );

    const handleFileOpenerClick = useCallback(() => {
        inputRef.current.click();
    }, [inputRef]);

    useEffect(() => {
        if (!file.name) {
            return;
        }
        setFileItem({
            file,
            ref: name
        });
        onChange({name: file.name});
    }, [file, name, onChange, setFileItem]);

    useEffect(() => {
        if (labelRef.current) {
            const padding = 28;
            const {clientWidth} = labelRef.current;
            const scalingFactor = 0.75;
            const scaledWidth = clientWidth * scalingFactor;
            setLabelWidth(scaledWidth + padding);
        }
    }, [labelRef, setLabelWidth]);

    return (
        <FormControl
            className={`${className} ${classes.root}`}
            required={required}
            variant="outlined"
        >
            <InputLabel
                htmlFor={name}
                ref={labelRef}
            >
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
                    value={file && file.name || ''}
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

            <input
                hidden
                onChange={handleFileInputChanged}
                ref={inputRef}
                type="file"
            />

            <FilePreviewDialog
                file={file}
                onClose={handleCloseFilePreview}
                open={openFilePreview}
            />
        </FormControl>
    );
};

FileInput.propTypes = {
    className: PropTypes.string,
    defaultFile: PropTypes.shape({name: PropTypes.string}),
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool.isRequired
};

FileInput.defaultProps = {
    className: '',
    defaultFile: {},
    helperText: '',
    label: '',
    name: '',
    onChange: () => {}
};

export {FileInput};
