'use client';

import { useState } from 'react';
import CreatePostCard from './CreatePostCard';
import PostCard from './PostCard'; 

const samplePosts = [
  {
    id: 1,
    author: {
      name: 'Sarah Chen',
      title: 'Frontend Developer at Google',
      avatar: 'https://i.pravatar.cc/150?img=44',
    },
    content: 'Just published my first article on web performance optimization. Check it out on the GDG blog!',
    date: '2025-04-10T14:30:00Z',
    likes: 42,
    comments: 8,
  },
  {
    id: 2,
    author: {
      name: 'Michael Rodriguez',
      title: 'Android Developer',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    content: 'Excited to announce our upcoming GDG event on Flutter development. Join us next Saturday for hands-on workshops and networking!',
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-04-09T09:15:00Z',
    likes: 78,
    comments: 23,
  },
  {
    id: 3,
    author: {
      name: 'Priya Sharma',
      title: 'UX Designer',
      avatar: 'https://i.pravatar.cc/150?img=28',
    },
    content: 'Just redesigned the community portal for better accessibility. Would love your feedback on the new navigation system!',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: '2025-04-08T16:45:00Z',
    likes: 56,
    comments: 14,
  },
];

const Feed = () => {
  const [posts, setPosts] = useState(samplePosts);

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="py-4">
      <CreatePostCard onPostCreated={handlePostCreated} />
      
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;