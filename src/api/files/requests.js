import axios from 'axios';

const filesEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/files`;

export const getFileUrl = (name) => `${filesEndpoint}?file=${name}`;

export const loadFile = (fileName, onLoad, onDownloadProgress) => {
    if (!fileName) {
        return;
    }

    const config = {
        onDownloadProgress: (progressEvent) => {
            if (!onDownloadProgress) {
                return;
            }
            const maxInPercent = 100;
            const percentCompleted = Math.round(progressEvent.loaded * maxInPercent / progressEvent.total);
            onDownloadProgress(percentCompleted);
        },
        responseType: 'blob'
    };
    const fileUrl = getFileUrl(fileName);
    axios.get(fileUrl, config).then((response) => {
        const loadedFile = response.data;
        onLoad(loadedFile);
    });
};

export const saveFile = async (file, userId, toolExecutionId, onUploadProgress) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'user-id': userId
        },
        onUploadProgress: (progressEvent) => {
            const maxInPercent = 100;
            const percentCompleted = Math.round(progressEvent.loaded * maxInPercent / progressEvent.total);
            onUploadProgress(percentCompleted);
        }
    };
    const formData = new FormData();
    formData.append('file', file);
    formData.append('toolExecutionId', toolExecutionId);
    const response = await axios.post(filesEndpoint, formData, config);
    return response;
};
