import axios from 'axios';

const filesEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/files`;

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

export const requests = {file: {post: postFile}};
