import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrendingTag } from './tagsTypes';

const API_BASE_URL = 'https://tanishka-0cdp.onrender.com/api';

export const fetchTrendingTags = createAsyncThunk<
  TrendingTag[],
  void,
  { rejectValue: string }
>(
  'tags/fetchTrendingTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/trending/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to fetch trending tags');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'An unknown error occurred'
      );
    }
  }
);