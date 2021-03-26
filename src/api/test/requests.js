import axios from 'axios';

const testEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/test`;

const fetchParameterSet = async () => {
    const response = await axios.get(testEndpoint);
    return response;
};

const postParameterValues = async (formData) => {
    const response = await axios.post(testEndpoint, formData);
    return response;
};

export const requests = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterValues
    }
};
