import axios from 'axios';
import { FormResponse, UserData } from '../types/form';

const BASE_URL = 'https://dynamic-form-generator-9rl7.onrender.com';

export const registerUser = async (userData: UserData) => {
  const response = await axios.post(`${BASE_URL}/register-user`, userData);
  return response.data;
};

export const createUser = async (userData: UserData) => {
  const response = await axios.post(`${BASE_URL}/create-user`, userData);
  return response.data;
};

export const getForm = async (rollNumber: string): Promise<FormResponse> => {
  const response = await axios.get(`${BASE_URL}/get-form`, {
    params: { rollNumber }
  });
  return response.data;
}; 