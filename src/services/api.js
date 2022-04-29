import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/checklists',
    timeout: 100000,
    headers: {
        'Content-Type': "application/json",
        'Accept': "application/json",
        }
})

export default api;