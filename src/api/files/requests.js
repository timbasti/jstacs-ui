import axios from 'axios';

const filesEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/files`;

async function postFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    return await axios.post(filesEndpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export const requests = {
    file: {
        post: postFile
    }
};
