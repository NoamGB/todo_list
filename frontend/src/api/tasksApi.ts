import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000/api';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export const getTasks = async (): Promise<Task[]> => {
    try {
        const res = await axios.get(`${API_URL}/tasks`);
        return res.data.data;
    } catch (error) {
        // toast.error('Error fetching tasks:', error);
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

export const createTask = async (task: Partial<Task>) => {
    try {
        const res = await axios.post(`${API_URL}/tasks`, task);
        return res.data.data;
    } catch (error) {
        console.error('Error creating task:', error);
        // toast.error('Error creating task:', error);
        throw error;
    }
};

export const updateTask = async (id: number, task: Partial<Task>) => {
    try {
        const res = await axios.put(`${API_URL}/tasks/${id}`, task);
        return res.data.data;
    } catch (error) {
        console.error('Error updating task:', error);
        // toast.error('Error updating task:', error);
        throw error;
    }
};

export const deleteTask = async (id: number) => {
    try {
        const res = await axios.delete(`${API_URL}/tasks/${id}`);
        return res.data.message;
    } catch (error) {
        console.error('Error deleting task:', error);
        // toast.error('Error deleting task:', error);
        throw error;
    }
};
