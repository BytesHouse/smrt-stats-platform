import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getFavorites = createAsyncThunk(
  'user/get_favorites',
  async ({ page = 1, sort }, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/users/favorites/players/?page=${page}&ordering=${sort}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
