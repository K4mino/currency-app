import axios from "axios";

export const BASE_URL = 'https://nationalbank.kz';

const axiosInstance = axios.create({
    baseURL: '/api',
    headers:{
        "Access-Control-Allow-Origin": "*"
    }
});

export default axiosInstance;