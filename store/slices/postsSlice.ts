// store/slices/postsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type {
  Post,
  PostsState,
  FetchPostsParams,
  FetchPostsResponse,
  UpdatePostParams,
  UpdatePostResponse,
  DeletePostParams,
  Pagination
} from "./postsTypes.js"

// Initial state
const initialState: PostsState = {
  posts: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    hasNext: false,
    hasPrev: false,
    limit: 10,
  },
  loading: false,
  error: null,
  postLikes: {},
};

// Async thunk for fetching posts
export const fetchPosts = createAsyncThunk<
  FetchPostsResponse,
  FetchPostsParams,
  { rejectValue: string }
>(
  'posts/fetchPosts',
  async ({ page = 1, limit = 10, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://tanishka-0cdp.onrender.com/api/posts/feed?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: FetchPostsResponse = await response.json();
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch posts';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for updating a post
export const updatePost = createAsyncThunk<
  { postId: string; content: string },
  UpdatePostParams,
  { rejectValue: string }
>(
  'posts/updatePost',
  async ({ postId, content, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://tanishka-0cdp.onrender.com/api/posts/${postId}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: UpdatePostResponse = await response.json();
      return { postId, content: data.post.content };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update post';
      return rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for deleting a post
export const deletePost = createAsyncThunk<
  string,
  DeletePostParams,
  { rejectValue: string }
>(
  'posts/deletePost',
  async ({ postId, token }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://tanishka-0cdp.onrender.com/api/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return postId;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete post';
      return rejectWithValue(errorMessage);
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const postId = action.payload;
      state.postLikes[postId] = !state.postLikes[postId];
      
      // Update the likes count in the posts array
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        if (state.postLikes[postId]) {
          // Add current user ID (you should replace 'current_user_id' with actual user ID)
          if (!post.likes.includes('current_user_id')) {
            post.likes.push('current_user_id');
          }
        } else {
          post.likes = post.likes.filter(id => id !== 'current_user_id');
        }
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    updatePostLocal: (state, action: PayloadAction<{ postId: string; content: string }>) => {
      const { postId, content } = action.payload;
      const post = state.posts.find(p => p._id === postId);
      if (post) {
        post.content = content;
      }
    },
    resetPosts: (state) => {
      state.posts = [];
      state.pagination = initialState.pagination;
      state.error = null;
      state.postLikes = {};
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch posts';
      })
      // Update post
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        const { postId, content } = action.payload;
        const post = state.posts.find(p => p._id === postId);
        if (post) {
          post.content = content;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update post';
      })
      // Delete post
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        const deletedPostId = action.payload;
        state.posts = state.posts.filter(post => post._id !== deletedPostId);
        // Clean up likes for deleted post
        delete state.postLikes[deletedPostId];
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to delete post';
      });
  },
});

export const { toggleLike, clearError, updatePostLocal, resetPosts } = postsSlice.actions;
export default postsSlice.reducer;