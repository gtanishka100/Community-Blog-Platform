'use client'
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { UserPlus, UserCheck, UserX, Loader2 } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { useEffect } from 'react';
import { 
  fetchConnectionRequests, 
  acceptConnectionRequest, 
  rejectConnectionRequest 
} from '@/store/slices/connectionApi';

const LeftSidebar = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { requests, loading, error } = useAppSelector((state) => state.connections);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchConnectionRequests());
    }
  }, [dispatch, isAuthenticated]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await dispatch(acceptConnectionRequest(requestId)).unwrap();
      
    } catch (error) {
      console.error('Failed to accept connection request:', error);
     
      dispatch(fetchConnectionRequests());
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await dispatch(rejectConnectionRequest(requestId)).unwrap();
     
    } catch (error) {
      console.error('Failed to reject connection request:', error);
     
      dispatch(fetchConnectionRequests());
    }
  };

  const userName = isAuthenticated && user 
    ? `${user.firstName} ${user.lastName}` 
    : "Guest User";

  if (!isAuthenticated) {
    return null;
  }

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
            <h2 className="font-bold mt-2">{userName}</h2>
            <p className="text-sm text-gray-500">
              {user?.email ? `${user.email}` : 'GDG Member'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              GDG Member
            </p>
            
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
              <Link href="/profile">
                <span className="text-xs">My Profile</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-sm">Connection Requests</h3>
            {loading && <Loader2 size={16} className="animate-spin text-blue-500" />}
          </div>
          
          {error && (
            <div className="text-xs text-red-500 mb-3 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
          
          <div className="space-y-3">
            {requests.length === 0 && !loading ? (
              <div className="text-xs text-gray-500 text-center py-4">
                No connection requests
              </div>
            ) : (
              requests.map((request) => (
                <div key={request._id} className="flex items-start justify-between space-x-2">
                  <div className="flex items-center flex-1 min-w-0">
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarFallback className="bg-white text-[#4285F4] font-medium text-xs border-2 border-[#4285F4] shadow-lg shadow-blue-200/50">
                        {getInitials(`${request.requester.firstName} ${request.requester.lastName}`)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">
                        {request.requester.firstName} {request.requester.lastName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {request.requester.email}
                      </p>
                      {request.message && (
                        <p className="text-xs text-gray-400 truncate mt-1">
                          "{request.message}"
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-1 flex-shrink-0">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-7 p-0 hover:bg-green-50 hover:text-green-600"
                      onClick={() => handleAcceptRequest(request._id)}
                      disabled={loading}
                    >
                      <UserCheck size={12} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-7 w-7 p-0 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleRejectRequest(request._id)}
                      disabled={loading}
                    >
                      <UserX size={12} />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          
          {requests.length > 0 && (
            <Button 
              className="w-full mt-3 text-xs" 
              variant="outline"
              onClick={() => dispatch(fetchConnectionRequests())}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeftSidebar;