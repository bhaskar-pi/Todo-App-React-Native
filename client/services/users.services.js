import axios from 'axios';
import { getToken } from '../components/utils';

const BASE_URL = 'http://192.168.36.121:5000'  // your ip address

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})

export const registerApi = async (data) => {
    try {
        const response = await axiosInstance.post('/user/register', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const loginApi = async (data) => {
    try {
        const response = await axiosInstance.post('/user/login', data);
        return response.data;
        
    } catch (error) {
        console.error('Error login user:', error);
        throw error;
    }
};

export const getUserDetail = async () => {
    try {
        const token = await getToken();
        const response = await axiosInstance.get('/user/',{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
        
    } catch (error) {
        console.error('Error get user user:', error);
        throw error;
    }
};
