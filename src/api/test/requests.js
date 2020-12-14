import axios from 'axios';

const testEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/test`

async function fetchParameterSet() {
    console.log(testEndpoint);
    return await axios.get(testEndpoint);
}

async function postParameterSet(parameterSet) {
    console.log(testEndpoint);
    return await axios.post(testEndpoint, parameterSet);
}

export const requests = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet
    }
};
