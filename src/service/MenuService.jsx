import axios from 'axios';

const API_URL = 'https://928e-2409-40c4-ed-e3ad-649c-52fa-45f1-2e8a.ngrok-free.app';

export const getMenu = (restId) => {
    return axios.get(`${API_URL}/${restId}`);
}