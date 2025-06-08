export interface BlogPost {
  _id: string;
  content: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  tags: string[];
  isPublished: boolean;
  readTime: number;
  likes: string[];
  comments: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface DiscoverBlogPost extends BlogPost {
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface CreatePostRequest {
  content: string;
  tags: string[];
  isPublished: boolean;
}

export interface CreatePostResponse {
  message: string;
  post: BlogPost;
}

export interface DiscoverPostsResponse {
  posts: DiscoverBlogPost[];
}

export interface BlogState {
  posts: BlogPost[];
  discoverPosts: DiscoverBlogPost[];
  isLoading: boolean;
  isLoadingDiscover: boolean;
  error: string | null;
  isCreatingPost: boolean;
}

export interface BlogError {
  message: string;
  status?: number;
}