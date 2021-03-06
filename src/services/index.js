import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

const get = async (endpoint) => {
    return axios.get(`${baseURL}/${endpoint}`);
}

const post = async (endpoint, data) => {
    return axios.post(`${baseURL}/${endpoint}`,  data);
}

const contabilidadPost = async (data) => {
    return axios.post(`/api/AccountingSeat/InsertAccountingSeats`, data);
}

const corsContabilidadPost = async (data) => {
    return axios.post(`https://cors-anywhere.herokuapp.com/https://plutus.azure-api.net/api/AccountingSeat/InsertAccountingSeats`, data)
}

const put = async (endpoint, data) => {
    return axios.put(`${baseURL}/${endpoint}`,  data);
}

const onDelete = async (endpoint, id) => {
    return axios.delete(`${baseURL}/${endpoint}/${id}`);
}

export { get, post, put, onDelete, contabilidadPost, corsContabilidadPost };