import axios from 'axios';

const api = axios.create({
    baseURL: `http://127.0.0.1:5000`,
});

export const register = async (firstName, lastName, number, gender) => {
    return await api({
        method: 'post',
        url:'/users', 
        data: {
            firstName,
            lastName,
            number,
            gender,
        }
    });
};
