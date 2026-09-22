import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';

// 1. Login User
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await authService.login({ email, password });
      const { accessToken, refreshToken, user } = res.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// 2. Register User
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await authService.register({ name, email, password });
      const { accessToken, refreshToken, user } = res.data;
      if (accessToken && refreshToken && typeof window !== 'undefined') {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
      }
      return { user, message: res.data?.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// 3. Fetch Profile (Check active session)
export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getProfile();
      return res.data.user || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

// 4. Logout User
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
      if (refreshToken) {
        await authService.logout(refreshToken);
      }
    } catch (err) {
      // Continue local cleanup even if server request fails
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }
  }
);

// 5. Forgot Password
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      const res = await authService.forgotPassword(email);
      return res.data.message || 'Password reset link sent to your email.';
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to send reset link');
    }
  }
);

// 6. Reset Password
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const res = await authService.resetPassword({ token, newPassword });
      return res.data.message || 'Password reset successful.';
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to reset password');
    }
  }
);

// 7. Change Password
export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const res = await authService.changePassword({ currentPassword, newPassword });
      return res.data.message || 'Password changed successfully.';
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to change password');
    }
  }
);

// 8. Verify Email
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token, { rejectWithValue }) => {
    try {
      const res = await authService.verifyEmail(token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Email verification failed');
    }
  }
);
