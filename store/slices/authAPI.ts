
import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  SignupRequest, 
  SignupResponse, 
  LoginRequest, 
  LoginResponse 
} from './authTypes';

const API_BASE_URL = 'https://tanishka-640x.onrender.com/api';


export const signupUser = createAsyncThunk<
  SignupResponse,
  SignupRequest,
  { rejectValue: string }
>(
  'auth/signup',
  async (signupData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Signup failed');
      }

      const data: SignupResponse = await response.json();
      

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  'auth/login',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      

      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', data.tokens.accessToken);
        localStorage.setItem('refreshToken', data.tokens.refreshToken);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // a logout endpoint-later
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
      }
    } catch (error) {
      return rejectWithValue('Logout failed');
    }
  }
);