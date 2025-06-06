import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

const LeftSidebar = () => {

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const suggestedConnections = [
    {
      id: 1,
      name: 'David Kim',
      title: 'ML Engineer',
      avatar: 'https://i.pravatar.cc/150?img=68',
    },
    {
      id: 2,
      name: 'Elena Martinez',
      title: 'Cloud Architect',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
    {
      id: 3,
      name: 'Rajiv Patel',
      title: 'Web Developer',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
  ];

  // const userGroups = [
  //   { id: 1, name: 'GDG Cloud', members: 1243 },
  //   { id: 2, name: 'Flutter Devs', members: 872 },
  //   { id: 3, name: 'Women Techmakers', members: 654 },
  //   { id: 4, name: 'Web Performance', members: 329 },
  // ];

  const userName = "Your Name"; 

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-0">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-20 rounded-t-lg" />
          <div className="p-4 pt-0 -mt-10">
            <Avatar className="h-16 w-16 border-4 border-white">
              <AvatarFallback className="bg-white text-[#4285F4] font-medium text-lg border-2 border-[#4285F4] shadow-lg shadow-blue-200/50">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <h2 className="font-bold mt-2">Your Name</h2>
            <p className="text-sm text-gray-500">GDG Member</p>
            
            <div className="mt-4 text-xs border-t border-b py-2">
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Profile views</span>
                <span className="font-medium">438</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Post impressions</span>
                <span className="font-medium">1,242</span>
              </div>
            </div>
            
            <Button asChild variant="ghost" className="w-full justify-start p-2 mt-2">
              <Link href="#">
                <span className="text-xs">My Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-3">Connect with developers</h3>
          <div className="space-y-3">
            {suggestedConnections.map((person) => (
              <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-white text-[#4285F4] font-medium text-xs border-2 border-[#4285F4] shadow-lg shadow-blue-200/50">
                      {getInitials(person.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-medium">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.title}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                  <UserPlus size={14} />
                </Button>
              </div>
            ))}
          </div>
          <Button className="w-full mt-3 text-xs" variant="outline">
            View More
          </Button>
        </CardContent>
      </Card>

      {/* <Card>
        <CardContent className="p-4">
          <h3 className="font-medium text-sm mb-3">My Groups</h3>
          <div className="space-y-2">
            {userGroups.map((group) => (
              <Link href="#" key={group.id} className="block">
                <div className="text-xs font-medium hover:text-blue-600 transition-colors">
                  {group.name}
                </div>
                <div className="text-xs text-gray-500">{group.members} members</div>
              </Link>
            ))}
          </div>
          <Button className="w-full mt-3 text-xs" variant="outline">
            Discover More Groups
          </Button>
        </CardContent>
      </Card> */}
    </div>
  );
};

export default LeftSidebar;