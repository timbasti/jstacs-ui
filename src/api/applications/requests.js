import axios from 'axios';

const applicationsEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/applications`;

const createSpecificEndpointForApplication = (applicationId) => `${applicationsEndpoint}/${applicationId}`;

export const listAvailableApplications = async () => {
    const response = await axios.get(applicationsEndpoint);
    return response;
};

export const createNewApplication = async (applicationName, toolTypes = []) => {
    const response = await axios.post(applicationsEndpoint, {
        data: {
            name: applicationName,
            toolTypes
        }
    });
    return response;
};

export const updateApplication = async (applicationId, toolTypes = []) => {
    const applicationEndpoint = createSpecificEndpointForApplication(applicationId);
    const response = await axios.put(applicationEndpoint, {data: {toolTypes}});
    return response;
};

export const deleteApplication = async (applicationId) => {
    const applicationEndpoint = createSpecificEndpointForApplication(applicationId);
    const response = await axios.delete(applicationEndpoint);
    return response;
};
