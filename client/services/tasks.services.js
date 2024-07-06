import axios from 'axios';
import { getToken } from '../components/utils';

const BASE_URL = 'http://192.168.36.121:5000' // your ip address

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})

export const createTask = async(data) => {
  try {
    const token = await getToken();
    const response = await axiosInstance.post('/tasks/create-new', {data}, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
        throw error;
    }
} 

export const getTasksByStatus = async(status) => {
    try {
        const token = await getToken();
        const response = await axiosInstance.post('/tasks/status', {status}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        return response.data;
        
    } catch (error) {
        console.error('Error get task by status:', error);
        throw error;
    }
}

export const getAllTasks = async() => {
  try {
    const token = await getToken();
      const response = await axiosInstance.get('/tasks/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;

  } catch (error) {
    console.error('Error get all tasks:', error);
    throw error;
  }
}

export const updateTask = async(data) => {
  try {
    const token = await getToken();
      const response = await axiosInstance.put(`/tasks/update`,{data}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
  } catch (error) {
    console.error('Error update tasks:', error);
    throw error;
  }
}

export const deleteTask = async(userTaskId) => {
  try {
    const token = await getToken();
      const response = await axiosInstance.delete(`/tasks/${userTaskId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.data;
  } catch (error) {
    console.error('Error deleting tasks:', error);
    throw error;
  }
}