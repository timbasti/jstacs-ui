import axios from 'axios';

const applicationsEndpoint = `${process.env.REACT_APP_SERVICE_HOST}/applications`;

const createSpecificEndpointForApplication = (applicationId) => `${applicationsEndpoint}/${applicationId}`;

export const listApplications = async () => {
    const response = await axios.get(applicationsEndpoint);
    return response;
};

export const createApplication = async (applicationName, toolIds = []) => {
    const response = await axios.post(applicationsEndpoint, {
        data: {
            name: applicationName,
            toolIds: [...toolIds]
        }
    });
    return response;
};

export const updateApplication = async (applicationId, toolIds = []) => {
    const applicationEndpoint = createSpecificEndpointForApplication(applicationId);
    const response = await axios.put(applicationEndpoint, {data: {toolIds: [...toolIds]}});
    return response;
};

export const deleteApplication = async (applicationId) => {
    const applicationEndpoint = createSpecificEndpointForApplication(applicationId);
    const response = await axios.delete(applicationEndpoint);
    return response;
};
