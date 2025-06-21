import { createSlice } from '@reduxjs/toolkit';
import { ConnectionState } from './connectionTypes';
import { 
  fetchConnectionRequests, 
  acceptConnectionRequest, 
  rejectConnectionRequest 
} from './connectionApi';

const initialState: ConnectionState = {
  requests: [],
  loading: false,
  error: null,
};

const connectionSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetConnectionState: (state) => {
      state.requests = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConnectionRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConnectionRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
        state.error = null;
      })
      .addCase(fetchConnectionRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch connection requests';
      })
      
    
      .addCase(acceptConnectionRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(acceptConnectionRequest.fulfilled, (state, action) => {
        state.loading = false;
        const requestId = action.meta.arg; 
        state.requests = state.requests.filter(
          request => request._id !== requestId
        );
        state.error = null;
      })
      .addCase(acceptConnectionRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to accept connection request';
      })
      
      // Reject connection request
      .addCase(rejectConnectionRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectConnectionRequest.fulfilled, (state, action) => {
        state.loading = false;
        const requestId = action.meta.arg; 
        state.requests = state.requests.filter(
          request => request._id !== requestId
        );
        state.error = null;
      })
      .addCase(rejectConnectionRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reject connection request';
      });
  },
});

export const { clearError, resetConnectionState } = connectionSlice.actions;
export default connectionSlice.reducer;