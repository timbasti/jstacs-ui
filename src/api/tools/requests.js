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

const postParameterSet = async (tool, parameterSet) => {
    const response = await axios.post(`${toolsEndpoint}/${tool}`, parameterSet);
    return response;
};

export const requests = {
    parameterSet: {
        fetch: fetchParameterSet,
        post: postParameterSet
    },
    tools: {fetch: fetchTools}
};
