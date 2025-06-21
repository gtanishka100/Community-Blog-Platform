export interface ConnectionRequester {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }
  
  export interface ConnectionRequest {
    _id: string;
    requester: ConnectionRequester;
    recipient: string;
    status: 'pending' | 'accepted' | 'rejected';
    message: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface ConnectionState {
    requests: ConnectionRequest[];
    loading: boolean;
    error: string | null;
  }