// types/index.ts
export interface User {
    _id: string;
    username: string;
    email: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Post {
    _id: string;
    content: string;
    author: User;
    likes: string[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
    images?: string[];
  }
  
  export interface Comment {
    _id: string;
    content: string;
    author: User;
    post: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNext: boolean;
    hasPrev: boolean;
    limit: number;
  }
  
  export interface FetchPostsResponse {
    posts: Post[];
    pagination: Pagination;
    success: boolean;
    message?: string;
  }
  
  export interface UpdatePostResponse {
    post: Post;
    success: boolean;
    message?: string;
  }
  
  export interface FetchPostsParams {
    page?: number;
    limit?: number;
    token: string;
  }
  
  export interface UpdatePostParams {
    postId: string;
    content: string;
    token: string;
  }
  
  export interface DeletePostParams {
    postId: string;
    token: string;
  }
  
  export interface PostsState {
    posts: Post[];
    pagination: Pagination;
    loading: boolean;
    error: string | null;
    postLikes: Record<string, boolean>;
  }
  
  