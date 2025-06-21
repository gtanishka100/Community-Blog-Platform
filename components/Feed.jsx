'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchDiscoverPosts } from '@/store/slices/blogAPI';
import {
  LoaderCircle,
  RefreshCw,
  Users,
  MessageSquare,
  Heart,
  PenTool,
  BookOpen,
  Sparkles,
  Filter,
  X,
} from 'lucide-react';

const Feed = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { posts, discoverPosts, isLoading, isLoadingDiscover, error } = useAppSelector((state) => state.blog);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { selectedTag } = useAppSelector((state) => state.tags);
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

  const transformedPosts = posts
    .filter((post) => post && post.author)
    .map((post) => ({
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

  console.log('=== DISCOVER POSTS DEBUG ===');
  console.log('Raw discoverPosts from Redux:', discoverPosts);
  console.log('Raw discoverPosts count:', discoverPosts.length);
  
  discoverPosts.forEach((post, index) => {
    console.log(`Post ${index + 1}:`, {
      id: post._id,
      createdAt: post.createdAt,
      content: post.content.substring(0, 50) + '...',
      author: post.author ? `${post.author.firstName} ${post.author.lastName}` : 'No author'
    });
  });

  const transformedDiscoverPosts = discoverPosts
    .filter((post) => {
      const hasPost = post && post.author;
      console.log('Filter check - Post exists and has author:', hasPost, post);
      return hasPost;
    })
    .map((post) => {
      const transformed = {
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
      };
      console.log('Transformed post:', transformed);
      return transformed;
    });

  // Filter posts based on selected tag
  const filterPostsByTag = (posts) => {
    if (!selectedTag) return posts;
    
    return posts.filter((post) => {
      // Check if post has tags and if the selected tag is included
      return post.tags && post.tags.some(tag => 
        tag.toLowerCase() === selectedTag.toLowerCase()
      );
    });
  };

  const filteredDiscoverPosts = filterPostsByTag(transformedDiscoverPosts);
  const filteredPosts = filterPostsByTag(transformedPosts);

  console.log('Selected tag:', selectedTag);
  console.log('Final transformedDiscoverPosts count:', transformedDiscoverPosts.length);
  console.log('Filtered discover posts count:', filteredDiscoverPosts.length);
  console.log('Final transformedDiscoverPosts:', transformedDiscoverPosts);
  console.log('=== END DEBUG ===');

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-25"></div>
              <div className="relative bg-white p-6 rounded-full border-2 border-blue-100">
                <Users className="h-16 w-16 text-blue-600 mx-auto" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Community</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators, thinkers, and storytellers sharing their ideas and connecting with like-minded people.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 p-3 rounded-xl w-fit mb-4">
                <PenTool className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Create & Share</h3>
              <p className="text-gray-600 leading-relaxed">
                Write engaging posts, share your thoughts, and express your creativity with our intuitive editor.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-purple-100 p-3 rounded-xl w-fit mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Engage & Connect</h3>
              <p className="text-gray-600 leading-relaxed">
                Like, comment, and interact with posts from creators around the world. Build meaningful connections.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="bg-green-100 p-3 rounded-xl w-fit mb-4">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Discover Content</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore curated content, discover new perspectives, and find inspiration from diverse voices.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">50K+</div>
                <div className="text-gray-600">Posts Shared</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100K+</div>
                <div className="text-gray-600">Interactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">Community Support</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-4 right-4 opacity-20">
              <Sparkles className="h-24 w-24" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
              <MessageSquare className="h-16 w-16" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Join the Conversation?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Sign in to start creating, sharing, and connecting with our amazing community of creators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => router.push('/signin')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
              What You'll Experience
            </h3>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 opacity-75">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-1">
                  <Heart className="h-4 w-4" />
                  <span className="text-sm">--</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">--</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentPosts = activeTab === 'discover' ? filteredDiscoverPosts : filteredPosts;
  const currentLoading = activeTab === 'discover' ? isLoadingDiscover : isLoading;
  const totalPosts = activeTab === 'discover' ? transformedDiscoverPosts.length : transformedPosts.length;

  return (
    <div className="py-4">
      <CreatePostCard onPostCreated={handlePostCreated} />

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('discover')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'discover'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Discover ({currentPosts.length} / {totalPosts})
            </button>
          </div>

          {selectedTag && (
            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
              <Filter className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700">
                Filtered by: <span className="font-medium">#{selectedTag}</span>
              </span>
            </div>
          )}
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
            currentPosts.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {selectedTag ? (
                  <>
                    No posts found with tag <span className="font-medium">#{selectedTag}</span>.
                    <br />
                    <span className="text-sm">Try selecting a different tag or clear the filter.</span>
                  </>
                ) : (
                  activeTab === 'discover'
                    ? 'No posts to discover yet.'
                    : 'No posts yet. Create your first post!'
                )}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Feed;