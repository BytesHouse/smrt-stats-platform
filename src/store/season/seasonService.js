import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getSeason = createAsyncThunk(
  'platform/get_season',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.get('/platform/season/');
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const handleCompetition = createAsyncThunk(
  'platform/handle_competition',
  async (searchQuery, { rejectedWithValue }) => {
    try {
      const response = await $api.get(`/platform/competition/?search=${searchQuery}`)
      return response.data.results
    } catch (e) {
      return rejectedWithValue(`${e.response.data.message}`)
    }
  },
)

export const handleCompetitionDefault = createAsyncThunk(
  'platform/handle_competition_default',
  async (_, { rejectedWithValue }) => {
    try {
      const response = await $api.get('/platform/competition/?default=true&page_size=14')
      return response.data.results
    } catch (e) {
      return rejectedWithValue(`${e.response.data.message}`)
    }
  },
)

export const getSeasonById = createAsyncThunk(
  'platform/get_season_by_id',
  async (
    season_id,
    { rejectWithValue },
  ) => {
    try {
      const response = await $api.get(`/platform/season/${season_id}/`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
