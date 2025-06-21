'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';
import { fetchTrendingTags } from '@/store/slices/tagsAPI';
import { setSelectedTag, clearSelectedTag } from '@/store/slices/tagsSlice';
import { LoaderCircle } from 'lucide-react';

const RightSidebar = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { trendingTags, isLoading, error, selectedTag } = useAppSelector((state) => state.tags);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchTrendingTags());
    }
  }, [dispatch, isAuthenticated]);

const handleTagClick = (tagName) => {
    if (selectedTag === tagName) {
      // If clicking the same tag, clear the selection
      dispatch(clearSelectedTag());
    } else {
      // Select the new tag
      dispatch(setSelectedTag(tagName));
    }
  };

  // Get top 5 trending tags
  const topTrendingTags = trendingTags.slice(0, 5);

  const upcomingEvents = [
    {
      id: 1,
      title: 'Flutter Dev Summit',
      date: 'Apr 15, 2025',
      location: 'Virtual',
    },
    {
      id: 2,
      title: 'Android Workshop',
      date: 'Apr 22, 2025',
      location: 'San Francisco',
    },
  ];

  return (
    <div className="space-y-4">
      {isAuthenticated && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Trending Topics</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <LoaderCircle className="h-4 w-4 animate-spin text-blue-600" />
                <span className="ml-2 text-sm text-gray-600">Loading trending tags...</span>
              </div>
            ) : error ? (
              <div className="text-sm text-red-600 py-2">
                Error loading trending tags: {error}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {topTrendingTags.map((topic) => (
                  <Badge
                    key={topic.tag}
                    variant={selectedTag === topic.tag ? "default" : "secondary"}
                    className={`px-3 py-1 cursor-pointer transition-colors ${
                      selectedTag === topic.tag 
                        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                        : 'hover:bg-secondary/80'
                    }`}
                    onClick={() => handleTagClick(topic.tag)}
                  >
                    #{topic.tag}
                    <span className={`ml-1 text-xs ${
                      selectedTag === topic.tag 
                        ? 'text-blue-100' 
                        : 'text-muted-foreground'
                    }`}>
                      ({topic.count})
                    </span>
                  </Badge>
                ))}
              </div>
            )}
            {selectedTag && (
              <div className="mt-3 pt-3 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Filtering by: <span className="font-medium">#{selectedTag}</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dispatch(clearSelectedTag())}
                    className="h-6 px-2 text-xs"
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Optional: Show upcoming events to everyone */}
      {/* <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-sm">{event.title}</h3>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{event.date}</span>
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
            <Button className="w-full mt-2 text-sm" variant="outline">
              View All Events
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default RightSidebar;