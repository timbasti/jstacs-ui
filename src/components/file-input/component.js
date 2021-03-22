import {Box, FormControl, FormHelperText, InputLabel, OutlinedInput} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';

import {saveFile} from '../../helpers/file-helpers';
import {FileItemContext} from '../../utils/file-context';
import {FilePreviewDialog} from '../file-preview-dialog/component';
import {SplitButton} from '../split-button/component';
import {useStyles} from './styles';

const options = ['Load File', 'Save File', 'Open File'];

const FileInput = ({name, label, file, helperText, onChange, className}) => {
    const inputRef = useRef();
    const labelRef = useRef();
    const {setFileItem} = useContext(FileItemContext);
    const [labelWidth, setLabelWidth] = useState(0);
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
            onChange(loadedFile);
        },
        [onChange]
    );

    const handleOptionClick = useCallback(
        (clickedOption) => {
            switch (clickedOption) {
            case 0:
                inputRef.current.click();
                break;
            case 1:
                saveFile(file);
                break;
            case 2:
                setOpenFilePreview(true);
                break;
            default:
                break;
            }
        },
        [inputRef, file]
    );

    useEffect(() => {
        setFileItem({
            file,
            ref: name
        });
    }, [file, name, setFileItem]);

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
                    label={label}
                    readOnly
                    type="text"
                    value={file && file.name}
                />

                <SplitButton
                    className={classes.fileAction}
                    defaultSelected={file && file.name ? 1 : 0}
                    label="Select file operation"
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
    file: PropTypes.shape({
        name: PropTypes.string.isRequired,
        size: PropTypes.number
    }),
    helperText: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

FileInput.defaultProps = {
    className: '',
    file: {name: ''},
    helperText: '',
    label: '',
    name: '',
    onChange: () => {}
};

export {FileInput};
