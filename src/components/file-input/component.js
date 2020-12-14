import React from 'react';
import {TextField, Box} from '@material-ui/core';
import {saveAs} from 'file-saver';
import {SplitButton} from '../split-button/component';

function saveFile(file) {
    if (!file) {
        return;
    }
    const fileObject = new Blob([file.content], {type: file.type});
    saveAs(fileObject, file.fileName);
}

const options = ['Datei laden', 'Datei speichern', 'Zurücksetzen'];

export const FileInput = React.forwardRef(({name, label, value, comment, onChange}, inputRef) => {
    console.log(name, label, value, comment, onChange, inputRef);
    const nativeFileInput = React.useRef(null);
    const [file, setFile] = React.useState(value);
    console.log(file);

    React.useEffect(() => {
        onChange(file);
      });

    const handleFileInputChanged = (evnt) => {
        const loadedFile = evnt.target.files[0];
        if (!loadedFile) {
            return;
        }
        loadedFile.text().then((fileContent) => {
            const fileName = loadedFile.name;
            // const fileType = loadedFile.type;
            setFile({
                fileName,
                // type: fileType,
                content: fileContent
            });
        });
    };

    const handleFileDataChanged = (evnt) => {
        console.log('handleFileDataChanged', evnt.target.value);
        onChange(evnt.target.value);
    };

    const handleOptionClick = (clickedOption) => {
        switch (clickedOption) {
            case 0:
                nativeFileInput.current.click();
                break;
            case 1:
                saveFile(file);
                break;
            case 2:
                setFile(file);
                break;
            default:
                break;
        }
    };

    return (
        <Box>
            <TextField
                type="text"
                value={file && file.fileName ? file.fileName : ''}
                helperText={comment}
                label={label}
                disabled
                variant="filled"
            />
            <input
                type="file"
                ref={nativeFileInput}
                onChange={handleFileInputChanged}
                hidden
            />
            {/* <input
                type="hidden"
                name={name}
                value={file}
                ref={inputRef}
            /> */}
            <SplitButton
                label="Select file operation"
                options={options}
                onClick={handleOptionClick}
            />
        </Box>
    );
});
