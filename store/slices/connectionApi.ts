import { createAsyncThunk } from '@reduxjs/toolkit';
import { ConnectionRequest } from './connectionTypes';
import { RootState } from '../../lib/store';

const BASE_URL = 'https://tanishka-0cdp.onrender.com/api';

export const fetchConnectionRequests = createAsyncThunk<
  ConnectionRequest[],
  void,
  { rejectValue: string; state: RootState }
>('connections/fetchRequests', async (_, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.auth.tokens?.accessToken;

    if (!token) {
      return rejectWithValue('No access token available');
    }

    const response = await fetch(`${BASE_URL}/connections/requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch connection requests: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to fetch connection requests'
    );
  }
});

export const acceptConnectionRequest = createAsyncThunk<
  ConnectionRequest,
  string,
  { rejectValue: string; state: RootState }
>('connections/acceptRequest', async (requestId, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.auth.tokens?.accessToken;

    if (!token) {
      return rejectWithValue('No access token available');
    }

    const response = await fetch(`${BASE_URL}/connections/${requestId}/accept`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to accept connection request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to accept connection request'
    );
  }
});

export const rejectConnectionRequest = createAsyncThunk<
  ConnectionRequest,
  string,
  { rejectValue: string; state: RootState }
>('connections/rejectRequest', async (requestId, { rejectWithValue, getState }) => {
  try {
    const state = getState();
    const token = state.auth.tokens?.accessToken;

    if (!token) {
      return rejectWithValue('No access token available');
    }

    const response = await fetch(`${BASE_URL}/connections/${requestId}/decline`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to reject connection request: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Failed to reject connection request'
    );
  }
});