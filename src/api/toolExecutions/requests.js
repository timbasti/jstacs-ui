import axios from 'axios';

const toolExecutionsEndpoint = `${window.appEnv.SERVICE_HOST}/tool-executions`;

const createSpecificEndpointForToolExecution = (toolExecutionId) => `${toolExecutionsEndpoint}/${toolExecutionId}`;

export const createToolExecution = async (toolId, userId, executionInformation) => {
    const {name = '', notes = ''} = executionInformation;
    const response = await axios.post(
        toolExecutionsEndpoint,
        {
            executionName: name,
            executionNotes: notes,
            toolId
        },
        {headers: {'user-id': userId}}
    );
    return response;
};

export const loadToolExecution = async (toolExecutionId, userId) => {
    const toolExecutionEndpoint = createSpecificEndpointForToolExecution(toolExecutionId);
    const response = await axios.get(toolExecutionEndpoint, {headers: {'user-id': userId}});
    return response;
};

export const listToolExecutions = async (toolId, userId) => {
    const response = await axios.get(toolExecutionsEndpoint, {
        headers: {'user-id': userId},
        params: {'tool-id': toolId}
    });
    return response;
};

export const updateToolExecution = async (toolExecutionId, executionParameters, userId) => {
    const toolExecutionEndpoint = createSpecificEndpointForToolExecution(toolExecutionId);
    const response = await axios.put(toolExecutionEndpoint, executionParameters, {headers: {'user-id': userId}});
    return response;
};

export const deleteToolExecution = async (toolExecutionId, userId) => {
    const toolExecutionEndpoint = createSpecificEndpointForToolExecution(toolExecutionId);
    const response = await axios.delete(toolExecutionEndpoint, {headers: {'user-id': userId}});
    return response;
};
