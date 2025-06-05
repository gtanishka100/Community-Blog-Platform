import { createAsyncThunk } from '@reduxjs/toolkit';
import { SignupRequest, SignupResponse } from './authTypes';

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
      
      // Store tokens in localStorage
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);