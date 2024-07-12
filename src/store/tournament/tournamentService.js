import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';

export const getStatistics = createAsyncThunk(
  'statistics/get_statistics',
  async ({
    id,
    page = 1,
    year_season_id,
  }, { rejectWithValue }) => {
    try {
      const response = await $api.get(year_season_id ? `/statistics/season/${id}?page=${page}&year_season_id=${year_season_id}` : `/statistics/season/${id}?page=${page}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getStatisticsPaginate = createAsyncThunk(
  'statistics/get_statistics_paginate',
  async ({
    id,
    page = 1,
    year_season_id,
  }, { rejectWithValue }) => {
    try {
      const response = await $api.get(year_season_id ? `/statistics/season/${id}?page=${page}&year_season_id=${year_season_id}` : `/statistics/season/${id}?page=${page}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getTournamentStat = createAsyncThunk(
  'statistics/get_tournament',
  async ({ id, stage }, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/statistics/season/${id}?stage=${stage}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
