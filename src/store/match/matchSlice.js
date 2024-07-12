/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getMatchPlayers,
  getMatch,
  getMatchEvents,
  getMatchTimeline,
  getShortsData,
  getStatisticsMatch,
} from './matchService';

const initialState = {
  errorMatch: '',
  errorStatisticsMatch: '',
  errorTimeline: '',
  eventsMatch: [],
  loadginEvents: false,
  loadingMatch: false,
  loadingStatisticsMatch: false,
  loadingTimeline: false,
  match: {},
  matchPlayers: {},
  shortsData: [],
  statisticsMatch: {},
  timeline: [],
};

export const matchSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getMatch.pending, (state) => {
        state.errorMatch = '';
        state.loadingMatch = true;
      })
      .addCase(getMatch.fulfilled, (state, action) => {
        state.loadingMatch = false;
        state.match = action.payload;
      })
      .addCase(getMatch.rejected, (state, action) => {
        state.loadingMatch = false;
        state.errorMatch = action.payload;
      })
      .addCase(getStatisticsMatch.pending, (state) => {
        state.errorStatisticsMatch = '';
        state.loadingStatisticsMatch = true;
      })
      .addCase(getStatisticsMatch.fulfilled, (state, action) => {
        state.loadingStatisticsMatch = false;
        state.statisticsMatch = action.payload;
      })
      .addCase(getStatisticsMatch.rejected, (state, action) => {
        state.loadingStatisticsMatch = false;
        state.errorStatisticsMatch = action.payload;
      })
      .addCase(getMatchPlayers.pending, (state) => {
        state.errorStatisticsMatch = '';
        state.loadingStatisticsMatch = true;
      })
      .addCase(getMatchPlayers.fulfilled, (state, action) => {
        state.loadingStatisticsMatch = false;
        state.matchPlayers = action.payload;
      })
      .addCase(getMatchPlayers.rejected, (state, action) => {
        state.loadingStatisticsMatch = false;
        state.errorStatisticsMatch = action.payload;
      })
      .addCase(getShortsData.pending, (state) => {
        state.errorStatisticsMatch = '';
        state.loadingStatisticsMatch = true;
      })
      .addCase(getShortsData.fulfilled, (state, action) => {
        state.loadingStatisticsMatch = false;
        state.shortsData = action.payload;
      })
      .addCase(getShortsData.rejected, (state, action) => {
        state.loadingStatisticsMatch = false;
        state.errorStatisticsMatch = action.payload;
      })
      .addCase(getMatchEvents.pending, (state) => {
        state.errorStatisticsMatch = '';
        state.loadginEvents = true;
      })
      .addCase(getMatchEvents.fulfilled, (state, action) => {
        state.loadginEvents = false;
        state.eventsMatch = action.payload;
      })
      .addCase(getMatchEvents.rejected, (state, action) => {
        state.loadginEvents = false;
        state.errorStatisticsMatch = action.payload;
      })
      .addCase(getMatchTimeline.pending, (state) => {
        state.errorTimeline = '';
        state.loadingTimeline = true;
      })
      .addCase(getMatchTimeline.fulfilled, (state, action) => {
        state.loadingTimeline = false;
        state.timeline = action.payload;
      })
      .addCase(getMatchTimeline.rejected, (state, action) => {
        state.loadingTimeline = false;
        state.errorTimeline = action.payload;
      })
  },
  initialState,
  name: 'match',
  reducers: {
    setLoadingMatch: (state, action) => {
      state.loadingMatch = action.payload;
    },
    setMatch: (state, action) => {
      state.match = action.payload;
    },
    setMatchError: (state, action) => {
      state.errorMatch = action.payload;
    },
  },
});

export const { actions: matchActions } = matchSlice;
export const { reducer: matchReducer } = matchSlice;
