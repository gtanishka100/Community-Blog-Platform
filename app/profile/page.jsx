"use client";

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Camera, MapPin, Calendar, Edit3, Save, X, MoreHorizontal, Trash2, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import CommentDialog from '@/components/Comments';
import { fetchPosts, updatePost, deletePost, toggleLike, updatePostLocal } from '@/store/slices/postsSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { posts, pagination, loading, error, postLikes } = useSelector(state => state.posts);
  const [currentUser, setCurrentUser] = useState(null);
  const [accessToken, setAccessToken] = useState('');

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState("Passionate software developer with 5+ years of experience in React, TypeScript, and modern web technologies. Always eager to learn new technologies and contribute to meaningful projects.");
  const [editBio, setEditBio] = useState(bio);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    setAccessToken(token);
    setCurrentUser(user);

    if (token) {
      dispatch(fetchPosts({ page: 1, limit: 10, token }));
    }
  }, [dispatch]);

  const handleSaveBio = () => {
    setBio(editBio);
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setEditBio(bio);
    setIsEditingBio(false);
  };

  const handleEditPost = (postId, content) => {
    setEditingPostId(postId);
    setEditPostContent(content);
    setOpenDropdownId(null);
  };

  const handleSavePost = async (postId) => {
    if (accessToken) {
      try {
        await dispatch(updatePost({ 
          postId, 
          content: editPostContent, 
          token: accessToken 
        })).unwrap();
        setEditingPostId(null);
        setEditPostContent('');
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    }
  };

  const handleCancelEditPost = () => {
    setEditingPostId(null);
    setEditPostContent('');
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      if (accessToken) {
        try {
          await dispatch(deletePost({ postId, token: accessToken })).unwrap();
        } catch (error) {
          console.error('Failed to delete post:', error);
        }
      }
    }
    setOpenDropdownId(null);
  };

  const toggleDropdown = (postId) => {
    setOpenDropdownId(openDropdownId === postId ? null : postId);
  };

  const handleCommentClick = (post) => {
    setSelectedPost(post);
    setIsCommentDialogOpen(true);
  };

  const handleLikePost = (postId) => {
    dispatch(toggleLike(postId));
  };

  const handleAddComment = (commentContent) => {
    if (selectedPost) {
      console.log('Adding comment:', commentContent);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600">Error loading posts: {error}</p>
            <Button 
              onClick={() => dispatch(fetchPosts({ page: 1, limit: 10, token: accessToken }))}
              className="mt-2"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" onClick={() => setOpenDropdownId(null)}>
      <div onClick={(e) => e.stopPropagation()}>
        <Navbar />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Card className="mb-6">
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg relative">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white"
              >
                <Camera className="h-4 w-4 mr-2" />
                Edit cover
              </Button>
            </div>

            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-gray-300 text-gray-600">
                    {currentUser ? getInitials(currentUser.firstName, currentUser.lastName) : 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-2 right-2 p-2 rounded-full bg-white hover:bg-gray-50"
                >
                  <Camera className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
          
          <CardContent className="pt-20 pb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User'}
                </h1>
                <p className="text-xl text-gray-600 mt-1">Software Engineer</p>
                <div className="flex items-center text-gray-500 mt-2 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">India</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">Joined 2024</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                  <span><strong>234</strong> followers</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline">Message</Button>
                <Button>Connect</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <h2 className="text-lg font-semibold">About</h2>
                {!isEditingBio && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingBio(true)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {isEditingBio ? (
                  <div className="space-y-4">
                    <Textarea
                      value={editBio}
                      onChange={(e) => setEditBio(e.target.value)}
                      placeholder="Write about yourself..."
                      className="min-h-[120px]"
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={handleSaveBio}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {bio || "No bio added yet. Click edit to add your bio."}
                  </p>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Skills</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'AWS'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h2 className="text-lg font-semibold">Posts ({pagination.totalPosts})</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {posts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No posts yet. Start sharing your thoughts!</p>
                  </div>
                ) : (
                  posts.map((post) => (
                    <div key={post._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gray-300 text-gray-600">
                            {getInitials(post.author?.firstName, post.author?.lastName)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900">
                                {post.author?.firstName} {post.author?.lastName}
                              </span>
                              <span className="text-gray-500 text-sm">•</span>
                              <span className="text-gray-500 text-sm">{formatDate(post.createdAt)}</span>
                              <span className="text-gray-500 text-sm">• {post.readTime} min read</span>
                            </div>
                            {currentUser && currentUser._id === post.author?._id && (
                              <div className="relative" onClick={(e) => e.stopPropagation()}>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => toggleDropdown(post._id)}
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                {openDropdownId === post._id && (
                                  <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                                    <button
                                      onClick={() => handleEditPost(post._id, post.content)}
                                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                                    >
                                      <Edit3 className="h-4 w-4 mr-2" />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeletePost(post._id)}
                                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600"
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          
                          {editingPostId === post._id ? (
                            <div className="mt-2 space-y-3">
                              <Textarea
                                value={editPostContent}
                                onChange={(e) => setEditPostContent(e.target.value)}
                                className="min-h-[80px]"
                              />
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSavePost(post._id)}
                                  disabled={loading}
                                >
                                  <Save className="h-4 w-4 mr-2" />
                                  {loading ? 'Saving...' : 'Save'}
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleCancelEditPost}>
                                  <X className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-gray-700 mt-2 leading-relaxed">{post.content}</p>
                          )}
                          
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags.map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-6 mt-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleLikePost(post._id)}
                              className={`flex items-center space-x-1 text-sm ${
                                postLikes[post._id] ? 'text-red-500' : 'text-gray-500'
                              } hover:text-red-500`}
                            >
                              <Heart className={`h-4 w-4 ${postLikes[post._id] ? 'fill-current' : ''}`} />
                              <span>{post.likes?.length || 0}</span>
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleCommentClick(post)}
                              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500"
                            >
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments?.length || 0}</span>
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-500"
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {pagination.hasNext && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      onClick={() => dispatch(fetchPosts({ 
                        page: pagination.currentPage + 1, 
                        limit: 10, 
                        token: accessToken 
                      }))}
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Load More Posts'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <CommentDialog
        isOpen={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
        postAuthor={selectedPost?.author?.firstName + ' ' + selectedPost?.author?.lastName}
        postContent={selectedPost?.content}
        comments={[]}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default Profile;