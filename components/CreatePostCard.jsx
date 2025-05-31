'use client';

import { useState } from 'react';
import { Image as ImageIcon, FileVideo, Paperclip, Send } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const CreatePostCard = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to get initials from a name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast.error('Post content cannot be empty');
      return;
    }

    setIsSubmitting(true);
    
 
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        author: {
          name: 'Sarah Chen',
          title: 'GDG Member',
          avatar: 'https://i.pravatar.cc/150?img=32',
        },
        content: postContent,
        date: new Date().toISOString(),
        likes: 0,
        comments: 0,
      };
      
      if (onPostCreated) {
        onPostCreated(newPost);
      }
      
      setPostContent('');
      setIsSubmitting(false);
      toast.success('Post created successfully!');
    }, 1000);
  };

  const handleAttachMedia = (type) => {
    toast.info(`${type} upload feature coming soon!`);
  };

  const userName = "Sarah Chen"; 

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback className="bg-white text-[#4285F4] font-medium text-sm border-2 border-[#4285F4] shadow-lg shadow-blue-200/50">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[80px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-blue-600"
            onClick={() => handleAttachMedia('Image')}
          >
            <ImageIcon size={18} className="mr-1" />
            <span className="hidden sm:inline">Photo</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-blue-600"
            onClick={() => handleAttachMedia('Video')}
          >
            <FileVideo size={18} className="mr-1" />
            <span className="hidden sm:inline">Video</span>
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-blue-600"
            onClick={() => handleAttachMedia('Document')}
          >
            <Paperclip size={18} className="mr-1" />
            <span className="hidden sm:inline">Document</span>
          </Button>
        </div>
        <Button 
          onClick={handleCreatePost} 
          disabled={!postContent.trim() || isSubmitting}
          className="bg-[#4285F4] hover:bg-[#3367d6] text-white"
        >
          {isSubmitting ? 'Posting...' : 'Post'}
          <Send size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostCard;