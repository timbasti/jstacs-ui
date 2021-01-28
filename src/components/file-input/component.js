import React, {useRef, useState, useEffect} from 'react';
import {FormControl, InputLabel, FormHelperText, OutlinedInput, Box} from '@material-ui/core';
import {saveAs} from 'file-saver';
import {SplitButton} from '../split-button/component';
import {useStyles} from './styles';

function getFileUrl(fileName) {
    return `${process.env.REACT_APP_SERVICE_HOST}/files/${fileName}`;
}

function saveFile(file) {
    if (!file.name) {
        return;
    }
    if (file.hasOwnProperty('size')) {
        saveAs(file);
    } else {
        const fileUrl = getFileUrl(file.name);
        saveAs(fileUrl, file.name);
    }
}

const options = ['Load file', 'Save file'];

export function FileInput({name, label, value, comment, onChange, className}) {
    const inputRef = useRef();
    const labelRef = useRef();
    const [labelWidth, setLabelWidth] = useState(0);
    const classes = useStyles({labelWidth});

    const handleFileInputChanged = (evnt) => {
        const loadedFile = evnt.target.files[0];
        if (!loadedFile) {
            return;
        }
        onChange(loadedFile);
    };

    const handleOptionClick = (clickedOption) => {
        switch (clickedOption) {
            case 0:
                inputRef.current.click();
                break;
            case 1:
                saveFile(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (labelRef.current) {
            const padding = 28;
            const labelWidth = labelRef.current.clientWidth;
            const scaledWidth = labelWidth * 0.75;
            setLabelWidth(scaledWidth + padding);
        }
    }, [labelRef, setLabelWidth]);

    return (
        <FormControl variant="outlined" className={`${className} ${classes.root}`}>
            <InputLabel htmlFor={name} ref={labelRef}>
                {label}
            </InputLabel>
            <Box className={classes.input}>
                <OutlinedInput
                    id={name}
                    className={classes.fileDisplay}
                    type="text"
                    value={value.name}
                    readOnly={true}
                    label={label}
                />
                <SplitButton
                    defaultSelected={value && value.name ? 1 : 0}
                    className={classes.fileAction}
                    label="Select file operation"
                    options={options}
                    onClick={handleOptionClick}
                />
            </Box>
            <FormHelperText className={classes.fileComment}>{comment}</FormHelperText>
            <input type="file" ref={inputRef} onChange={handleFileInputChanged} hidden />
        </FormControl>
    );
}
