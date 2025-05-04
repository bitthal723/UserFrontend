import axios from 'axios';

const API_URL = 'http://localhost:8091/menu';

export const getMenu = (restId) => {
    return axios.get(`${API_URL}/${restId}`);
}