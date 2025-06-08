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

export interface CreatePostRequest {
  content: string;
  tags: string[];
  isPublished: boolean;
}

export interface CreatePostResponse {
  message: string;
  post: BlogPost;
}

export interface BlogState {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  isCreatingPost: boolean;
}

export interface BlogError {
  message: string;
  status?: number;
}