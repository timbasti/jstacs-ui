import axios from 'axios';

const filesEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/files`;

const getFileUrl = (name) => `${filesEndpoint}/${name}`;

const loadFile = (file, onLoad, onDownloadProgress) => {
    if (!file.name) {
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
    const fileUrl = getFileUrl(file.name);
    axios.get(fileUrl, config).then((response) => {
        const loadedFile = response.data;
        onLoad(loadedFile);
    });
};

const postFile = async (file, onUploadProgress) => {
    const config = {
        headers: {'Content-Type': 'multipart/form-data'},
        onUploadProgress: (progressEvent) => {
            const maxInPercent = 100;
            const percentCompleted = Math.round(progressEvent.loaded * maxInPercent / progressEvent.total);
            onUploadProgress(percentCompleted);
        }
    };
    const formData = new FormData();
    formData.append('file', file);
    const response = await axios.post(filesEndpoint, formData, config);
    return response;
};

export const requests = {
    file: {
        load: loadFile,
        post: postFile
    },
    getFileUrl
};
