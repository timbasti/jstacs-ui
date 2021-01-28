import axios from 'axios';

const filesEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/files`;

async function postFile(file, onUploadProgress) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(percentCompleted);
        }
    };
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post(filesEndpoint, formData, config);
}

export const requests = {
    file: {
        post: postFile
    }
};
