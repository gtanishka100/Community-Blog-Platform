import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TagsState } from './tagsTypes';
import { fetchTrendingTags } from './tagsAPI';

const initialState: TagsState = {
  trendingTags: [],
  isLoading: false,
  error: null,
  selectedTag: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
    clearSelectedTag: (state) => {
      state.selectedTag = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trending tags
      .addCase(fetchTrendingTags.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingTags = action.payload;
        state.error = null;
      })
      .addCase(fetchTrendingTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch trending tags';
      });
  },
});

export const { setSelectedTag, clearSelectedTag, clearError } = tagsSlice.actions;
export default tagsSlice.reducer;