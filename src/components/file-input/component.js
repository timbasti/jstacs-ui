import React, {useState, useEffect, forwardRef} from 'react';
import {TextField, Box} from '@material-ui/core';
import {saveAs} from 'file-saver';
import {SplitButton} from '../split-button/component';

function getFileUrl(fileName) {
    return `${process.env.REACT_APP_SERVICE_HOST}/files/${fileName}`;
}

function saveFile(fileName) {
    if (!fileName) {
        return;
    }
    const fileUrl = getFileUrl(fileName);
    saveAs(fileUrl, fileName);
}

const options = ['Datei laden', 'Datei speichern'];

export const FileInput = forwardRef(
    ({label, fileName, comment, onChange}, inputRef) => {
        const [file, setFile] = useState({
            name: fileName
        });

        useEffect((updatedFile) => {
            onChange(updatedFile);
        }, [file, onChange]);

        const handleFileInputChanged = (evnt) => {
            const loadedFile = evnt.target.files[0];
            if (!loadedFile) {
                return;
            }
            setFile(loadedFile);
        };

        const handleOptionClick = (clickedOption) => {
            switch (clickedOption) {
                case 0:
                    inputRef.current.click();
                    break;
                case 1:
                    saveFile(file.name);
                    break;
                default:
                    break;
            }
        };

        return (
            <Box>
                <TextField
                    type="text"
                    value={file.name}
                    helperText={comment}
                    label={label}
                    disabled
                    variant="outlined"
                />
                <input
                    type="file"
                    ref={inputRef}
                    onChange={handleFileInputChanged}
                    hidden
                />
                <SplitButton
                    label="Select file operation"
                    options={options}
                    onClick={handleOptionClick}
                />
            </Box>
        );
    }
);
