import axios from 'axios';

const testEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/test`;

const fetchParameterSet = async () => {
    const response = await axios.get(testEndpoint);
    return response;
};

const postParameterSet = async (parameterSet) => {
    const response = await axios.post(testEndpoint, parameterSet);
    return response;
};

export const requests = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet
    }
};
