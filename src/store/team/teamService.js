import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getTeamStatistics = createAsyncThunk(
  'platform/get_team_statistics',
  async ({ id, year_season_id }, { rejectWithValue }) => {
    try {
      const url = year_season_id ? `/statistics/team/${id}?year_season_id=${year_season_id}` : `/statistics/team/${id}`
      const response = await $api.get(url);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getMatchesStatistics = createAsyncThunk(
  'platform/get_matches_statistics',
  async ({ id, year_season_id }, { rejectWithValue }) => {
    try {
      const url = year_season_id ? `/statistics/team_matches/${id}?year_season_id=${year_season_id}` : `/statistics/team_matches/${id}`
      const response = await $api.get(url);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const filterPlayersByTeam = createAsyncThunk(
  'platform/filter_players_by_team',
  async (params, { rejectWithValue }) => {
    try {
      const response = await $api.get('/platform/player/', { params });
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
