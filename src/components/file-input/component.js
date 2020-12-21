import React from 'react';
import {TextField, Box} from '@material-ui/core';
import {saveAs} from 'file-saver';
import {SplitButton} from '../split-button/component';

function saveFile(fileName) {
    if (!fileName) {
        return;
    }
    const fileUrl = `${process.env.REACT_APP_SERVICE_HOST}/files/${fileName}`;
    saveAs(fileUrl, fileName);
}

const options = ['Datei laden', 'Datei speichern', 'Zurücksetzen'];

// TODO: Check for name
export const FileInput = React.forwardRef(
    ({name, label, value, comment, onChange}, inputRef) => {
        const [file, setFile] = React.useState({
            name: value,
            content: null
        });

        React.useEffect(() => {
            if (file.content) {
                onChange(file.content);
            }
        });

        const handleFileInputChanged = (evnt) => {
            const loadedFile = evnt.target.files[0];
            if (!loadedFile) {
                return;
            }
            setFile({
                name: loadedFile.name,
                content: loadedFile
            });
        };

        const handleOptionClick = (clickedOption) => {
            switch (clickedOption) {
                case 0:
                    inputRef.current.click();
                    break;
                case 1:
                    saveFile(file.name);
                    break;
                case 2:
                    setFile({
                        name: value,
                        content: null
                    });
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
                    variant="filled"
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
