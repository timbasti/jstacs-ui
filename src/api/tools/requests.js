import axios from 'axios';

const toolsEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/tools`;

const createSpecificToolEndpoint = (toolId) => `${toolsEndpoint}/${toolId}`;

const fetchTools = async () => {
    const response = await axios.get(toolsEndpoint);
    return response;
};

const fetchParameterSet = async (tool, userId) => {
    const response = await axios.get(`${toolsEndpoint}/${tool}`, {headers: {'user-id': userId}});
    return response;
};

const postParameterValues = async (tool, values, userId) => {
    const response = await axios.post(`${toolsEndpoint}/${tool}`, values, {headers: {'user-id': userId}});
    return response;
};

const fetchExecutionResults = async (tool, userId) => {
    const response = await axios.get(`${toolsEndpoint}/${tool}/results`, {headers: {'user-id': userId}});
    return response;
};

export const loadToolValues = async (toolId) => {
    const toolEndpoint = createSpecificToolEndpoint(toolId);
    const response = await axios.get(toolEndpoint);
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
