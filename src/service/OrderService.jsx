import axios from 'axios';

const API_URL = 'http://localhost:8091/order';

export const placeOrder = (restId, itemList) => {
    return axios.post(`${API_URL}/place/${restId}`, itemList);
}

export const getOrderedItem = (restId, tableNumber) => {
    return axios.get(`${API_URL}/checkOrder/${restId}/${tableNumber}`); 
}