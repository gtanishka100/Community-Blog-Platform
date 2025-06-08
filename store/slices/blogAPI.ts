import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  CreatePostRequest, 
  CreatePostResponse, 
  BlogPost 
} from './blogTypes';

const API_BASE_URL = 'https://tanishka-0cdp.onrender.com/api';

const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

export const createPost = createAsyncThunk<
  CreatePostResponse,
  CreatePostRequest,
  { rejectValue: string }
>(
  'blog/createPost',
  async (postData, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to create post');
      }

      const data: CreatePostResponse = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

export const fetchPosts = createAsyncThunk<
  BlogPost[],
  void,
  { rejectValue: string }
>(
  'blog/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch posts');
      }

      const data = await response.json();
      return data.posts || data; 
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);