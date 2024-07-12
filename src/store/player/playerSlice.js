/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getPlayerStatisticMatches,
  getPlayerStatistics,
} from './playerService';

const initialState = {
  errorMatches: '',
  errorPlayerStatistic: '',
  loadingMatches: false,
  loadingPlayerStatistic: false,
  matches: [],
  matchesPlayed: [],
  matchesPlayerStat: {},
  playerStatistic: {},
  position: [],
  quality: 720,
};

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getPlayerStatistics.pending, (state) => {
        state.errorPlayerStatistic = '';
        state.loadingPlayerStatistic = true;
      })
      .addCase(getPlayerStatistics.fulfilled, (state, action) => {
        state.loadingPlayerStatistic = false;
        state.playerStatistic = action.payload;
      })
      .addCase(getPlayerStatistics.rejected, (state, action) => {
        state.loadingPlayerStatistic = false;
        state.errorPlayerStatistic = action.payload;
      })
      .addCase(getPlayerStatisticMatches.pending, (state) => {
        state.errorMatches = '';
        state.loadingMatches = true;
        state.position = [];
      })
      .addCase(getPlayerStatisticMatches.fulfilled, (state, action) => {
        state.loadingMatches = false;
        state.matchesPlayerStat = action.payload;
        state.position = action.payload.player.position;
        // state.matches = action.payload.matches;
      })
      .addCase(getPlayerStatisticMatches.rejected, (state, action) => {
        state.loadingMatches = false;
        state.errorMatches = action.payload;
        state.position = [];
      });
  },
  initialState,
  name: 'user',
  reducers: {
    setQuality: (state, action) => {
      state.quality = action.payload;
    },
  },
});

export const { actions: playerActions } = userSlice;
export const { reducer: playerReducer } = userSlice;
