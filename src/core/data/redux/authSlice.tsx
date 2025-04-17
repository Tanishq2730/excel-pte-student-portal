import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { AuthState, LoginPayload, LoginResponse } from './auth';
import { api_url } from '../../../environment';

const API_URL = `${api_url}auth/login`; // Replace with actual API endpoint

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(API_URL, credentials);

      // Extract roles array
      const userRoles = response.data.user.roles;

      // Check if any role has the name "student"
      if (userRoles.some((role: { name: string }) => role.name.toLowerCase() === 'student')) {        
        localStorage.setItem('token', response.data.token);
        return response.data;
      }else{
        return rejectWithValue('You are not authorized to access this system.');
      }

     
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
