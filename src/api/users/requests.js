import axios from 'axios';

const userEndpoint = `${window._env_.SERVICE_HOST}/users`;

const checkUserEndpoint = `${userEndpoint}/check`;

export const checkUser = async (userId) => {
    const response = await axios.get(checkUserEndpoint, {params: {'user-id': userId || ''}});
    return response;
};
