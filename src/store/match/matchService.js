import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getMatch = createAsyncThunk(
  'platform/get_match',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/platform/match/${id}/`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getShortsData = createAsyncThunk(
  'platform/shorts_details',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/shorts/teams_params/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getMatchPlayers = createAsyncThunk(
  'platform/match_players',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/stats/match_players/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getMatchEvents = createAsyncThunk(
  'platform/match_events',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/platform/match_detail/${id}/events`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getMatchTimeline = createAsyncThunk(
  'platform/match_timeline',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/platform/match_detail/${id}/timeline`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getStatisticsMatch = createAsyncThunk(
  'platform/get_statistics_match',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/statistics/match/${id}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
