import axios from 'axios';

const api = axios.create({
    baseURL: `http://127.0.0.1:5000`,
});

export const register = async (firstName, lastName, number, gender, lookingFor) => {
    return await api({
        method: 'post',
        url:'/users', 
        data: {
            firstName,
            lastName,
            number,
            gender,
            lookingFor,
        }
    });
};

export const uploadAvatar = async (id, file) => {
    const data = new FormData();
    data.append('photo', file);
    return await api({
        method: 'post',
        url: `/upload?id=${id}`,
        headers: {'Content-Type': 'multipart/form-data'},
        data,
    });
}

export const updateSId = async (id, sid) => {
    return await api({
        method: 'post',
        url: `/user/socket?id=${id}&sid=${sid}`
    });
}

export const activate = async (id) => {
    return await api({
        method: 'post',
        url: `/user/activate?id=${id}`
    });
}

export const login = async (phone) => {
    return await api({
        method: 'post',
        url: '/login',
        data: {
            number: phone
        }
    });
}
