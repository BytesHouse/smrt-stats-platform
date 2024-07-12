import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getCompetition = createAsyncThunk(
  'platform/get_competitions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get('/platform/competition/');
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

