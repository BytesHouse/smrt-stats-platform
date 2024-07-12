import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const searchTeam = createAsyncThunk(
  'platform/search_team',
  async ({ page, search }, { rejectWithValue }) => {
    try {
      const response = await $api.get('/platform/team/', {
        params: { page, search },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const searchPlayer = createAsyncThunk(
  'platform/search_player',
  async ({ page, search }, { rejectWithValue }) => {
    try {
      const response = await $api.get('/platform/player/', {
        params: { page, search },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
