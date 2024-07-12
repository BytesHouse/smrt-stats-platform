import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getPlayerStatistics = createAsyncThunk(
  'platform/get_player_statistics',
  async ({ id, year_season_id }, { rejectWithValue }) => {
    try {
      const url = year_season_id ? `/statistics/player/${id}?year_season_id=${year_season_id}` : `/statistics/player/${id}`
      const response = await $api.get(url);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getPlayerStatisticMatches = createAsyncThunk(
  'platform/get_player_statistics_matches',
  async ({ id, year_season_id }, { rejectWithValue }) => {
    try {
      const url = year_season_id ? `/statistics/player_matches/${id}?year_season_id=${year_season_id}` : `/statistics/player_matches/${id}`
      const response = await $api.get(url);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
