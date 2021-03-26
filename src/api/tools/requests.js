import axios from 'axios';

const toolsEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/tools`;

const fetchTools = async () => {
    const response = await axios.get(toolsEndpoint);
    return response;
};

const fetchParameterSet = async (tool) => {
    const response = await axios.get(`${toolsEndpoint}/${tool}`);
    return response;
};

const postParameterValues = async (tool, formData) => {
    const response = await axios.post(`${toolsEndpoint}/${tool}`, formData);
    return response;
};

const fetchExecutionResults = async (tool) => {
    const response = await axios.get(`${toolsEndpoint}/${tool}/results`);
    return response;
};

export const requests = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterValues
    },
    results: {fetch: fetchExecutionResults},
    tools: {fetch: fetchTools}
};
