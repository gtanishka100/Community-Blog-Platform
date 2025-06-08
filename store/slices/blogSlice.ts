import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogState, BlogPost, CreatePostResponse } from './blogTypes';
import { createPost} from './blogAPI';

const initialState: BlogState = {
  posts: [],
  isLoading: false,
  error: null,
  isCreatingPost: false,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
    addPost: (state, action: PayloadAction<BlogPost>) => {
      state.posts.unshift(action.payload); 
    },
    updatePost: (state, action: PayloadAction<BlogPost>) => {
      const index = state.posts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost: (state, action: PayloadAction<string>) => {
      state.posts = state.posts.filter(post => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isCreatingPost = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<CreatePostResponse>) => {
        state.isCreatingPost = false;
        state.posts.unshift(action.payload.post); 
        state.error = null;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isCreatingPost = false;
        state.error = action.payload || 'Failed to create post';
      })
      
  },
});

export const { 
  clearError, 
  clearPosts, 
  addPost, 
  updatePost, 
  removePost 
} = blogSlice.actions;

export default blogSlice.reducer;