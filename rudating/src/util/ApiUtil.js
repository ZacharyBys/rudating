import axios from 'axios';

const api = axios.create({
    baseURL: `http://${process.env.backend}`,
});

export const register = async ({ user }) => {
    return await api.post('/users', {
        user,
    });
};
