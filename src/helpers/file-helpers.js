import {saveAs} from 'file-saver';

import {requests} from '../api/files/requests';

const {
    getFileUrl,
    file: {load}
} = requests;

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
        load(file, readContent);
    }
};
