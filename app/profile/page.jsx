"use client";

import React, { useState } from 'react';
import { Camera, MapPin, Calendar, Edit3, Save, X, MoreHorizontal, Trash2, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Navbar from '@/components/Navbar';
import CommentDialog from '@/components/Comments';

const Profile = () => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bio, setBio] = useState("Passionate software developer with 5+ years of experience in React, TypeScript, and modern web technologies. Always eager to learn new technologies and contribute to meaningful projects.");
  const [editBio, setEditBio] = useState(bio);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postLikes, setPostLikes] = useState({});

  const handleSaveBio = () => {
    setBio(editBio);
    setIsEditingBio(false);
  };

  const handleCancelEdit = () => {
    setEditBio(bio);
    setIsEditingBio(false);
  };

  const [userPosts, setUserPosts] = useState([
    {
      id: 1,
      content: "Just finished an amazing project using React and TypeScript! The learning never stops in tech. 🚀",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 8,
      author: { name: "John Developer", title: "Senior Software Engineer" }
    },
    {
      id: 2,
      content: "Attending the GDG DevFest was incredible! Met so many talented developers and learned about the latest in AI and web development.",
      timestamp: "1 day ago",
      likes: 45,
      comments: 12,
      author: { name: "John Developer", title: "Senior Software Engineer" }
    },
    {
      id: 3,
      content: "Working on a new open source project. Excited to share it with the community soon! #OpenSource #Development",
      timestamp: "3 days ago",
      likes: 32,
      comments: 6,
      author: { name: "John Developer", title: "Senior Software Engineer" }
    }
  ]);


  const postComments = {
    1: [
      {
        id: '1',
        author: 'Sarah Chen',
        role: 'Frontend Developer',
        content: 'React and TypeScript is such a powerful combination! What was the most challenging part of your project?',
        time: '1h ago',
        likes: 3,
        isLiked: false
      },
      {
        id: '2',
        author: 'Mike Johnson',
        role: 'Full Stack Developer',
        content: 'Congrats on finishing the project! Would love to hear more about your tech stack.',
        time: '45m ago',
        likes: 1,
        isLiked: false
      }
    ],
    2: [
      {
        id: '3',
        author: 'Emily Davis',
        role: 'Product Manager',
        content: 'GDG DevFest events are always amazing! Which session was your favorite?',
        time: '20h ago',
        likes: 5,
        isLiked: false
      },
      {
        id: '4',
        author: 'Alex Rodriguez',
        role: 'AI Engineer',
        content: 'The AI sessions this year were incredible. Did you check out the machine learning workshop?',
        time: '18h ago',
        likes: 2,
        isLiked: false
      }
    ],
    3: [
      {
        id: '5',
        author: 'Lisa Wang',
        role: 'Open Source Contributor',
        content: 'Excited to see what you\'re building! Open source is the way to go 🚀',
        time: '2d ago',
        likes: 4,
        isLiked: false
      }
    ]
  };

  const handleEditPost = (postId, content) => {
    setEditingPostId(postId);
    setEditPostContent(content);
    setOpenDropdownId(null);
  };

  const handleSavePost = (postId) => {
    setUserPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { ...post, content: editPostContent }
          : post
      )
    );
    setEditingPostId(null);
    setEditPostContent('');
  };

  const handleCancelEditPost = () => {
    setEditingPostId(null);
    setEditPostContent('');
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setUserPosts(posts => posts.filter(post => post.id !== postId));
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
    setPostLikes(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
    
    setUserPosts(posts => 
      posts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: postLikes[postId] ? post.likes - 1 : post.likes + 1
            }
          : post
      )
    );
  };

  const handleAddComment = (commentContent) => {
    if (selectedPost) {
      setUserPosts(posts => 
        posts.map(post => 
          post.id === selectedPost.id 
            ? { ...post, comments: post.comments + 1 }
            : post
        )
      );
    }
  };

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
                  <AvatarFallback className="text-2xl bg-gray-300 text-gray-600">JD</AvatarFallback>
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
                <h1 className="text-3xl font-bold text-gray-900">John Developer</h1>
                <p className="text-xl text-gray-600 mt-1">Senior Software Engineer</p>
                <div className="flex items-center text-gray-500 mt-2 space-x-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">Mumbai, India</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="text-sm">Joined March 2020</span>
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
                <h2 className="text-lg font-semibold">Posts</h2>
              </CardHeader>
              <CardContent className="space-y-6">
                {userPosts.map((post) => (
                  <div key={post.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gray-300 text-gray-600">JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">John Developer</span>
                            <span className="text-gray-500 text-sm">•</span>
                            <span className="text-gray-500 text-sm">{post.timestamp}</span>
                          </div>
                          <div className="relative" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleDropdown(post.id)}
                              className="h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            {openDropdownId === post.id && (
                              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[120px]">
                                <button
                                  onClick={() => handleEditPost(post.id, post.content)}
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center"
                                >
                                  <Edit3 className="h-4 w-4 mr-2" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeletePost(post.id)}
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 flex items-center text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {editingPostId === post.id ? (
                          <div className="mt-2 space-y-3">
                            <Textarea
                              value={editPostContent}
                              onChange={(e) => setEditPostContent(e.target.value)}
                              className="min-h-[80px]"
                            />
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => handleSavePost(post.id)}>
                                <Save className="h-4 w-4 mr-2" />
                                Save
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
                        
                        <div className="flex items-center space-x-6 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLikePost(post.id)}
                            className={`flex items-center space-x-1 text-sm ${
                              postLikes[post.id] ? 'text-red-500' : 'text-gray-500'
                            } hover:text-red-500`}
                          >
                            <Heart className={`h-4 w-4 ${postLikes[post.id] ? 'fill-current' : ''}`} />
                            <span>{post.likes}</span>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCommentClick(post)}
                            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-blue-500"
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.comments}</span>
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
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <CommentDialog
        isOpen={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
        postAuthor={selectedPost?.author?.name}
        postContent={selectedPost?.content}
        comments={selectedPost ? postComments[selectedPost.id] || [] : []}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default Profile;