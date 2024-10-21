
import axiosClient from './axiosClient';
import { UserCredentials, AuthResponse } from '@models/authTypes';

// Login API call
export const login = async (credentials: UserCredentials): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>('/api/auth/login', credentials);
  // Assuming token is part of response and needs to be stored in cookies
  // if (typeof window !== 'undefined') {
  //   Cookies.set('authToken', data.token, { expires: 7 }); // Store token in cookies for 7 days
  // }
  return data;
};

// Signup API call
export const signup = async (credentials: UserCredentials): Promise<AuthResponse> => {
  const { data } = await axiosClient.post<AuthResponse>('/api/auth/register', credentials);
  // Store token in cookies after successful signup
  return data;
};

