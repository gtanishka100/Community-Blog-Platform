'use client';

import { useState } from 'react';
import { Image as ImageIcon, FileVideo, Paperclip, Send, Hash } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { createPost } from '@/store/slices/blogAPI';
import { useToast } from '@/hooks/use-toast';

const CreatePostCard = ({ onPostCreated }) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { user } = useAppSelector((state) => state.auth);
  const { isCreatingPost, error } = useAppSelector((state) => state.blog);
  
  const [postContent, setPostContent] = useState('');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);


  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0)?.toUpperCase() || ''}${lastName?.charAt(0)?.toUpperCase() || ''}`;
  };

  const handleCreatePost = async () => {
    const trimmedContent = postContent.trim();
    
    if (!trimmedContent) {
      toast({
        title: "Error",
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (trimmedContent.length < 10) {
      toast({
        title: "Error",
        description: "Content must be at least 10 characters long",
        variant: "destructive",
      });
      return;
    }

    if (trimmedContent.length > 10000) {
      toast({
        title: "Error",
        description: "Content must be between 10 and 10000 characters",
        variant: "destructive",
      });
      return;
    }

    if (!user) {
      toast({
        title: "Error", 
        description: "Please log in to create a post",
        variant: "destructive",
      });
      return;
    }

    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const postData = {
      content: postContent,
      tags: tagArray,
      isPublished: isPublished,
    };

    try {
      const result = await dispatch(createPost(postData));
      
      if (createPost.fulfilled.match(result)) {

        setPostContent('');
        setTags('');
        setIsPublished(true);
        setShowAdvanced(false);
        
        toast({
          title: "Success",
          description: "Post created successfully!",
        });

        if (onPostCreated) {
          onPostCreated(result.payload.post);
        }
      } else {
        toast({
          title: "Error",
          description: result.payload || "Failed to create post",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleAttachMedia = (type) => {
    toast({
      title: "Coming Soon",
      description: `${type} upload feature coming soon!`,
    });
  };

  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userInitials = user ? getInitials(user.firstName, user.lastName) : "U";

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <div className="flex items-start">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback className="bg-white text-[#4285F4] font-medium text-sm border-2 border-[#4285F4] shadow-lg shadow-blue-200/50">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <Textarea
              placeholder="What's on your mind? (minimum 10 characters)"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="min-h-[80px] resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
            />
            

            <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
              <span>
                {postContent.length < 10 && postContent.length > 0 && (
                  <span className="text-red-500">
                    {10 - postContent.length} more characters needed
                  </span>
                )}
                {postContent.length >= 10 && (
                  <span className="text-green-600">✓ Minimum length met</span>
                )}
              </span>
              <span className={postContent.length > 10000 ? 'text-red-500' : ''}>
                {postContent.length}/10000
              </span>
            </div>
            
            {showAdvanced && (
              <div className="mt-4 space-y-3 p-3 bg-gray-50 rounded-md">
                <div>
                  <Label htmlFor="tags" className="text-sm font-medium">
                    Tags (comma-separated)
                  </Label>
                  <Input
                    id="tags"
                    placeholder="javascript, react, web development"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="publish"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <Label htmlFor="publish" className="text-sm">
                    Publish immediately
                  </Label>
                </div>
              </div>
            )}
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
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <Hash size={18} className="mr-1" />
            <span className="hidden sm:inline">Tags</span>
          </Button>
        </div>
        <Button 
          onClick={handleCreatePost} 
          disabled={postContent.trim().length < 10 || postContent.length > 10000 || isCreatingPost || !user}
          className="bg-[#4285F4] hover:bg-[#3367d6] text-white disabled:opacity-50"
        >
          {isCreatingPost ? 'Posting...' : 'Post'}
          <Send size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostCard;