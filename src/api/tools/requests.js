import axios from 'axios';

const toolsEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/tools`;

const createSpecificToolEndpoint = (toolId) => `${toolsEndpoint}/${toolId}`;

export const listTools = async () => {
    const response = await axios.get(toolsEndpoint);
    return response;
};

export const loadTool = async (toolId) => {
    const toolEndpoint = createSpecificToolEndpoint(toolId);
    const response = await axios.get(toolEndpoint);
    return response;
};
