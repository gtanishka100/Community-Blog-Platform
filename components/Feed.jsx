'use client';

import { useEffect, useState } from 'react';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchDiscoverPosts } from '@/store/slices/blogAPI';
import { LoaderCircle, RefreshCw } from 'lucide-react';

const Feed = () => {
  const dispatch = useAppDispatch();
  const { posts, discoverPosts, isLoading, isLoadingDiscover, error } = useAppSelector((state) => state.blog);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('discover');

  useEffect(() => {
    if (isAuthenticated && activeTab === 'discover') {
      dispatch(fetchDiscoverPosts());
    }
  }, [dispatch, isAuthenticated, activeTab]);

  const handlePostCreated = (newPost) => {
    console.log('New post created:', newPost);
  };

  const handleRefresh = () => {
    if (activeTab === 'discover') {
      dispatch(fetchDiscoverPosts());
    }
  };

  // Transform posts with null checks
  const transformedPosts = posts
    .filter(post => post && post.author) // Filter out null posts or posts with null authors
    .map(post => ({
      id: post._id,
      author: {
        name: `${post.author.firstName || 'Unknown'} ${post.author.lastName || 'User'}`,
        title: 'Community Member', 
        avatar: `https://i.pravatar.cc/150?u=${post.author.email || 'default'}`, 
      },
      content: post.content || '',
      date: post.createdAt,
      likes: post.likes?.length || 0,
      comments: post.comments?.length || 0,
      tags: post.tags || [],
      readTime: post.readTime || 0,
      isPublished: post.isPublished || false,
    }));

  // Transform discover posts with null checks
  const transformedDiscoverPosts = discoverPosts
    .filter(post => post && post.author) // Filter out null posts or posts with null authors
    .map(post => ({
      id: post._id,
      author: {
        name: `${post.author.firstName || 'Unknown'} ${post.author.lastName || 'User'}`,
        title: 'Community Member', 
        avatar: `https://i.pravatar.cc/150?u=${post.author.email || 'default'}`, 
      },
      content: post.content || '',
      date: post.createdAt,
      likes: post.likesCount || 0,
      comments: post.commentsCount || 0,
      tags: post.tags || [],
      readTime: post.readTime || 0,
      isPublished: post.isPublished || false,
      isLiked: post.isLiked || false,
    }));

  if (!isAuthenticated) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-600">Please log in to view and create posts.</p>
      </div>
    );
  }

  const currentPosts = activeTab === 'discover' ? transformedDiscoverPosts : transformedPosts;
  const currentLoading = activeTab === 'discover' ? isLoadingDiscover : isLoading;

  return (
    <div className="py-4">
      <CreatePostCard onPostCreated={handlePostCreated} />
      
      <div className="mb-6 flex items-center justify-between">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('discover')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'discover'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Discover
          </button>
         
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={currentLoading}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw className={`h-4 w-4 ${currentLoading ? 'animate-spin' : ''}`} />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>
      
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">Error: {error}</p>
        </div>
      )}
      
      {currentLoading ? (
        <div className="flex justify-center items-center py-8">
          <LoaderCircle className="h-8 w-8 animate-spin text-blue-600" />
          <span className="ml-2 text-gray-600">
            {activeTab === 'discover' ? 'Loading discover posts...' : 'Loading posts...'}
          </span>
        </div>
      ) : (
        <div>
          {currentPosts.length > 0 ? (
            currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {activeTab === 'discover' 
                  ? 'No posts to discover yet.' 
                  : 'No posts yet. Create your first post!'}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;