"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MoreHorizontal, Send } from 'lucide-react';

const CommentDialog = ({
  isOpen,
  onClose,
  postAuthor,
  postContent,
  comments = [],
  onAddComment
}) => {
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState(comments);
  const getInitials = (name) => {
    if (!name || typeof name !== 'string') return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'You',
        role: 'Developer',
        content: newComment,
        time: 'now',
        likes: 0,
        isLiked: false
      };
      setCommentsList([...commentsList, comment]);
      if (onAddComment) {
        onAddComment(newComment);
      }
      setNewComment('');
    }
  };

  const handleLikeComment = (commentId) => {
    setCommentsList(commentsList.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        {postAuthor && postContent && (
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {getInitials(postAuthor)}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{postAuthor}</h4>
                <p className="text-sm text-gray-600 mt-1">{postContent}</p>
              </div>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {commentsList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            commentsList.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    {getInitials(comment.author)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                      {comment.role && (
                        <span className="text-xs text-gray-500">{comment.role}</span>
                      )}
                      <span className="text-xs text-gray-400">• {comment.time}</span>
                    </div>
                    <p className="text-sm text-gray-800">{comment.content}</p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className={`flex items-center space-x-1 text-xs ${
                        comment.isLiked ? 'text-red-600' : 'text-gray-500'
                      } hover:text-red-600 transition-colors`}
                    >
                      <Heart className={`h-3 w-3 ${comment.isLiked ? 'fill-current' : ''}`} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                      Reply
                    </button>
                    <button className="text-xs text-gray-500 hover:text-gray-700 transition-colors">
                      <MoreHorizontal className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="border-t border-gray-200 pt-4">
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">Y</span>
            </div>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[60px] resize-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleSubmitComment();
                  }
                }}
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Post</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;