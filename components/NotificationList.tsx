'use client';

import React from 'react';
import { MoreHorizontal, Heart, MessageCircle, User, Share2 } from 'lucide-react';

interface NotificationListProps {
  activeFilter: string;
}

const NotificationList: React.FC<NotificationListProps> = ({ activeFilter }) => {
  const notifications = [
    {
      id: 1,
      type: 'like',
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Sarah Johnson liked your blog',
      description: 'Your blog post received a new like',
      time: '2h',
      category: 'All',
      blogText: 'Building Modern Web Applications with React and Next.js...',
      userName: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'comment',
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      title: 'Mike Chen commented on your blog',
      description: '"Great insights on performance optimization! Really helpful for my current project."',
      time: '4h',
      category: 'Comments',
      blogText: '10 Essential Tips for Optimizing React Performance...',
      userName: 'Mike Chen'
    },
    {
      id: 3,
      type: 'like',
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Emma Wilson liked your blog',
      description: 'Your blog post received a new like',
      time: '6h',
      category: 'All',
      blogText: 'Understanding TypeScript: A Comprehensive Guide...',
      userName: 'Emma Wilson'
    },
    {
      id: 4,
      type: 'comment',
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      title: 'Alex Rodriguez commented on your blog',
      description: '"This tutorial saved me hours of debugging. Thank you for sharing!"',
      time: '8h',
      category: 'Comments',
      blogText: 'Debugging Common JavaScript Errors: A Developer\'s Guide...',
      userName: 'Alex Rodriguez'
    },
    {
      id: 5,
      type: 'share',
      icon: <Share2 className="w-5 h-5 text-green-600" />,
      title: 'David Kim shared your blog',
      description: 'Your blog post was shared with their network',
      time: '12h',
      category: 'Shares',
      blogText: 'The Future of Web Development: Trends to Watch in 2025...',
      userName: 'David Kim'
    },
    {
      id: 6,
      type: 'like',
      icon: <Heart className="w-5 h-5 text-red-500" />,
      title: 'Lisa Park and 5 others liked your blog',
      description: 'Your blog post received multiple new likes',
      time: '1d',
      category: 'All',
      blogText: 'CSS Grid vs Flexbox: When to Use Which Layout Method...',
      userName: 'Lisa Park'
    },
    {
      id: 7,
      type: 'comment',
      icon: <MessageCircle className="w-5 h-5 text-blue-600" />,
      title: 'James Taylor commented on your blog',
      description: '"Could you write a follow-up post about advanced hooks? This was fantastic!"',
      time: '1d',
      category: 'Comments',
      blogText: 'React Hooks Explained: useState, useEffect, and Beyond...',
      userName: 'James Taylor'
    },
    {
      id: 8,
      type: 'follow',
      icon: <User className="w-5 h-5 text-purple-600" />,
      title: 'Maria Garcia started following you',
      description: 'After reading your blog posts',
      time: '2d',
      category: 'Followers',
      blogText: 'Getting Started with Node.js and Express...',
      userName: 'Maria Garcia'
    }
  ];

  const filteredNotifications = notifications.filter(notification => 
    activeFilter === 'All' || notification.category === activeFilter
  );

  return (
    <div className="divide-y divide-gray-100">
      {filteredNotifications.map((notification) => (
        <div key={notification.id} className="p-4 hover:bg-gray-50 transition-colors">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
         
            <div className="flex-shrink-0 mt-1">
              {notification.icon}
            </div>
         
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    {notification.title}
                  </h4>
                  {notification.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {notification.description}
                    </p>
                  )}
                  
                  {notification.blogText && (
                    <div className="bg-gray-100 rounded-lg p-3 mb-2">
                      <p className="text-xs text-gray-500 mb-1">Blog post:</p>
                      <p className="text-sm text-gray-700 italic">
                        "{notification.blogText}"
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className="text-xs text-gray-500">{notification.time}</span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                    {/* <MoreHorizontal className="w-4 h-4" /> */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;