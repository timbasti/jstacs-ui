import axios from 'axios';

const toolExecutionsEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/tool-executions`;

const createSpecificEndpointForToolExecution = (toolExecutionId) => `${toolExecutionsEndpoint}/${toolExecutionId}`;

export const createToolExecution = async (toolId, userId) => {
    const response = await axios.post(
        toolExecutionsEndpoint,
        {toolId},
        {headers: {'user-id': userId}}
    );
    return response;
};

export const loadToolExecution = async (toolExecutionId, userId) => {
    const toolExecutionEndpoint = createSpecificEndpointForToolExecution(toolExecutionId);
    const response = await axios.get(toolExecutionEndpoint, {headers: {'user-id': userId}});
    return response;
};

export const updateToolExecution = async (toolExecutionId, values, userId) => {
    const toolExecutionEndpoint = createSpecificEndpointForToolExecution(toolExecutionId);
    const response = await axios.put(
        toolExecutionEndpoint,
        values,
        {headers: {'user-id': userId}}
    );
    return response;
};

export const deleteToolExecution = async (toolExecutionId, userId) => {
    const toolExecutionEndpoint = createSpecificEndpointForToolExecution(toolExecutionId);
    const response = await axios.delete(
        toolExecutionEndpoint,
        {headers: {'user-id': userId}}
    );
    return response;
};
