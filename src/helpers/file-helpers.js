import {saveAs} from 'file-saver';

import {getFileUrl, loadFile} from '../api/files/requests';

export const saveFile = (file) => {
    if (!file.name) {
        return;
    }
    if (file.size && typeof file.size === 'number') {
        saveAs(file);
    } else {
        const fileUrl = getFileUrl(file.name);
        saveAs(fileUrl, file.name);
    }
};

export const readFile = (file, onRead) => {
    if (!file.name) {
        return;
    }
    if (file.size && typeof file.size === 'number') {
        file.text().then((fileContent) => {
            onRead(fileContent);
        });
    } else {
        const readContent = (loadedFile) => {
            loadedFile.text().then((fileContent) => {
                onRead(fileContent);
            });
        };
        loadFile(file, readContent);
    }
};

export const selectAllFiles = (mixedValues) => {
    const files = [];
    Object.values(mixedValues).forEach((value) => {
        console.log('selectAllFiles', value);
        if (value instanceof File) {
            files.push(value);
        } else if (value instanceof Object && Object.keys(value).length > 0) {
            const nestedFiles = selectAllFiles(value);
            files.push(...nestedFiles);
        }
    });
    return files;
};

export const extractAllFiles = (mixedValues, parentObjectKey) => {
    const extractedFiles = [];
    const updatedValues = {};
    Object.keys(mixedValues).forEach((key) => {
        const value = mixedValues[key];
        console.log('selectAllFiles', value);
        if (value instanceof File) {
            extractedFiles.push(value);
            updatedValues[key] = {name: value.name};
        } else if (value instanceof Object && Object.keys(value).length > 0) {
            const {files: nestedFiles, values: nestedValues} = extractAllFiles(value);
            extractedFiles.push(...nestedFiles);
            updatedValues[key] = nestedValues;
        }
    });
    return {
        files: extractedFiles,
        values: {
            ...mixedValues,
            ...updatedValues
        }
    };
};
