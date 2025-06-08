import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogState, BlogPost, CreatePostResponse, DiscoverBlogPost, DiscoverPostsResponse } from './blogTypes';
import { createPost, fetchDiscoverPosts } from './blogAPI';

const initialState: BlogState = {
  posts: [],
  discoverPosts: [],
  isLoading: false,
  isLoadingDiscover: false,
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
    clearDiscoverPosts: (state) => {
      state.discoverPosts = [];
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
    updateDiscoverPost: (state, action: PayloadAction<DiscoverBlogPost>) => {
      const index = state.discoverPosts.findIndex(post => post._id === action.payload._id);
      if (index !== -1) {
        state.discoverPosts[index] = action.payload;
      }
    },
    toggleLikeDiscoverPost: (state, action: PayloadAction<{ postId: string; isLiked: boolean; likesCount: number }>) => {
      const { postId, isLiked, likesCount } = action.payload;
      const index = state.discoverPosts.findIndex(post => post._id === postId);
      if (index !== -1) {
        state.discoverPosts[index].isLiked = isLiked;
        state.discoverPosts[index].likesCount = likesCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Post
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
      
      // Fetch Discover Posts
      .addCase(fetchDiscoverPosts.pending, (state) => {
        state.isLoadingDiscover = true;
        state.error = null;
      })
      .addCase(fetchDiscoverPosts.fulfilled, (state, action: PayloadAction<DiscoverPostsResponse>) => {
        state.isLoadingDiscover = false;
        state.discoverPosts = action.payload.posts;
        state.error = null;
      })
      .addCase(fetchDiscoverPosts.rejected, (state, action) => {
        state.isLoadingDiscover = false;
        state.error = action.payload || 'Failed to fetch discover posts';
      });
  },
});

export const { 
  clearError, 
  clearPosts, 
  clearDiscoverPosts,
  addPost, 
  updatePost, 
  removePost,
  updateDiscoverPost,
  toggleLikeDiscoverPost
} = blogSlice.actions;

export default blogSlice.reducer;