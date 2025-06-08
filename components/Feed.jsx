'use client';

import { useEffect } from 'react';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchPosts } from '@/store/slices/blogAPI';
import { LoaderCircle } from 'lucide-react';

const Feed = () => {
  const dispatch = useAppDispatch();
  const { posts, isLoading, error } = useAppSelector((state) => state.blog);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchPosts());
    }
  }, [dispatch, isAuthenticated]);

  const handlePostCreated = (newPost) => {
    console.log('New post created:', newPost);
  };
  const transformedPosts = posts.map(post => ({
    id: post._id,
    author: {
      name: `${post.author.firstName} ${post.author.lastName}`,
      title: 'Community Member', 
      avatar: `https://i.pravatar.cc/150?u=${post.author.email}`, 
    },
    content: post.content,
    date: post.createdAt,
    likes: post.likes.length,
    comments: post.comments.length,
    tags: post.tags,
    readTime: post.readTime,
    isPublished: post.isPublished,

  }));

  if (!isAuthenticated) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">Please log in to view and create posts.</p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <CreatePostCard onPostCreated={handlePostCreated} />
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">Error: {error}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">Loading posts...</span>
        </div>
      ) : (
        <div>
          {transformedPosts.length > 0 ? (
            transformedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">No posts yet. Create your first post!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;