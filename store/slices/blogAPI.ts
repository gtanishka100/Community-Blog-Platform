import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  CreatePostRequest, 
  CreatePostResponse, 
  BlogPost,
  DiscoverPostsResponse 
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
      
      console.log('Auth token:', token ? 'Present' : 'Missing');
      console.log('Post data being sent:', postData);
      
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

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          return rejectWithValue(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        } catch {
          return rejectWithValue(`HTTP ${response.status}: ${errorText || response.statusText}`);
        }
      }

      const data: CreatePostResponse = await response.json();
      console.log('Success response:', data);
      return data;
    } catch (error: unknown) { 
      console.error('Network error:', error);
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      return rejectWithValue(`Network error: ${errorMessage}`);
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

export const fetchDiscoverPosts = createAsyncThunk<
  DiscoverPostsResponse,
  void,
  { rejectValue: string }
>(
  'blog/fetchDiscoverPosts',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      
      console.log('Fetching discover posts with token:', token ? 'Present' : 'Missing');
      
      if (!token) {
        return rejectWithValue('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/posts/discover`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Discover posts response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Discover posts error response:', errorText);
        
        try {
          const errorData = JSON.parse(errorText);
          return rejectWithValue(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        } catch {
          return rejectWithValue(`HTTP ${response.status}: ${errorText || response.statusText}`);
        }
      }

      const data: DiscoverPostsResponse = await response.json();
      console.log('Discover posts success response:', data);
      return data;
    } catch (error: unknown) {
      console.error('Discover posts network error:', error);
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      return rejectWithValue(`Network error: ${errorMessage}`);
    }
  }
);