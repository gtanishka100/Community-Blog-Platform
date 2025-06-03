'use client';

import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import CommentDialog from './Comments';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [currentComments, setCurrentComments] = useState(post?.comments || 0);
  const sampleComments = [
    {
      id: '1',
      author: 'Sarah Chen',
      role: 'Frontend Developer',
      content: 'Great insights! Jetpack Compose has really changed the game for Android development.',
      time: '1h ago',
      likes: 5,
      isLiked: false
    },
    {
      id: '2',
      author: 'David Wilson',
      role: 'Product Manager',
      content: 'Looking forward to your presentation at the meetup!',
      time: '45m ago',
      likes: 2,
      isLiked: false
    }
  ];

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? 'Post unliked' : 'Post liked');
  };

  const handleSave = () => {
    setSaved(!saved);
    toast.success(saved ? 'Post unsaved' : 'Post saved');
  };

  const handleComment = () => {
    setIsCommentDialogOpen(true);
  };

  const handleShare = () => {
    toast.info('Share feature coming soon!');
  };

  const handleCommentClick = () => {
    setIsCommentDialogOpen(true);
  };

  const handleAddComment = (commentContent) => {
    setCurrentComments(prev => prev + 1);
  };
  if (!post) {
    return null;
  }

  return (
    <>
      <Card className="mb-4 overflow-hidden">
        <div className="p-4 flex items-start justify-between">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarFallback className="bg-white text-[#4285F4] font-medium text-sm border-2 border-[#4285F4] shadow-lg shadow-blue-200/50">
                {getInitials(post.author?.name || 'Anonymous')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">{post.author?.name || 'Anonymous'}</h3>
              <p className="text-xs text-gray-500">{post.author?.title || ''}</p>
              <p className="text-xs text-gray-500">
                {post.date ? formatDistanceToNow(new Date(post.date), { addSuffix: true }) : ''}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal size={16} className="text-gray-500" />
          </Button>
        </div>

        {post.content && (
          <div className="px-4 pb-3">
            <p className="text-sm">{post.content}</p>
          </div>
        )}

        {post.image && (
          <div className="relative w-full aspect-video">
            <Image
              src={post.image}
              alt="Post image"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <CardFooter className="flex justify-between p-2 border-t">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center text-xs ${liked ? 'text-red-500' : 'text-gray-600'}`}
            onClick={handleLike}
          >
            <Heart size={16} className={`mr-1 ${liked ? 'fill-red-500' : ''}`} />
            Like
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-xs text-gray-600"
            onClick={handleComment}
          >
            <MessageCircle size={16} className="mr-1" />
            Comment
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center text-xs text-gray-600"
            onClick={handleShare}
          >
            <Share2 size={16} className="mr-1" />
            Share
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center text-xs ${saved ? 'text-blue-500' : 'text-gray-600'}`}
            onClick={handleSave}
          >
            <Bookmark size={16} className={`mr-1 ${saved ? 'fill-blue-500' : ''}`} />
            Save
          </Button>
        </CardFooter>
      </Card>

      <CommentDialog
        isOpen={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
        comments={sampleComments}
        onAddComment={handleAddComment}
      />
    </>
  );
};

export default PostCard;