import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RightSidebar = () => {
  const trendingTopics = [
    { id: 1, name: 'Flutter', posts: 124 },
    { id: 2, name: 'TensorFlow', posts: 89 },
    { id: 3, name: 'Firebase', posts: 76 },
    { id: 4, name: 'Angular', posts: 65 },
    { id: 5, name: 'Kotlin', posts: 52 },
  ];

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
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((topic) => (
              <Badge key={topic.id} variant="secondary" className="px-3 py-1 cursor-pointer hover:bg-secondary/80">
                #{topic.name}
                <span className="ml-1 text-xs text-muted-foreground">({topic.posts})</span>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

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