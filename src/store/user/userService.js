import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const loginUser = createAsyncThunk(
  'user/login',
  async (body, { rejectWithValue }) => {
    try {
      const response = await $api.post('/auth/login/', body);
      localStorage.setItem('token', response.data.token)
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const regUser = createAsyncThunk(
  'user/registration',
  async (body, { rejectWithValue }) => {
    try {
      const response = await $api.post('/auth/registration/', body);
      localStorage.setItem('token', response.data.token)
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getFormationInfo = createAsyncThunk(
  'user/user_profile',
  async (body, { rejectWithValue }) => {
    try {
      const response = await $api.get('/users/user_profile/', { headers: { Authorization: `Token ${localStorage.getItem('token')}` } });
      return response.data
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
)
