import axios from "axios";

const API_URL = "http://localhost:8080/api/parking/";

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
    } else {
    return {};
    }
};

const getAll = () => {
    return axios.get(API_URL, { headers: getAuthHeader() });
};

const get = id => {
    return axios.get(API_URL + id, { headers: getAuthHeader() });
};

const create = data => {
    return axios.post(API_URL, data, { headers: getAuthHeader() });
};

const update = (id, data) => {
    return axios.put(API_URL + id, data, { headers: getAuthHeader() });
};

const remove = id => {
    return axios.delete(API_URL + id, { headers: getAuthHeader() });
};

const findByLicensePlate = licensePlate => {
    return axios.get(API_URL + `?licensePlate=${licensePlate}`, { headers: getAuthHeader() });
};

export default {
    getAll,
    get,
    create,
    update,
    remove,
    findByLicensePlate
};