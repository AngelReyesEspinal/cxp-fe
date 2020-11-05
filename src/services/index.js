import axios from 'axios';

const baseURL = 'http://localhost:3000';

const get = async (endpoint) => {
    return axios.get(`${baseURL}/${endpoint}`);
}

const post = async (endpoint, data) => {
    return axios.post(`${baseURL}/${endpoint}`,  data);
}

const put = async (endpoint, data) => {
    return axios.put(`${baseURL}/${endpoint}`,  data);
}

const onDelete = async (endpoint, id) => {
    return axios.delete(`${baseURL}/${endpoint}/${id}`);
}

export { get, post, put, onDelete };