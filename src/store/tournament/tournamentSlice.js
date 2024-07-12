/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getStatistics,
  getStatisticsPaginate,
  getTournamentStat,
} from './tournamentService';

const initialState = {
  currentPageLoading: true,
  errorTournaments: '',
  loadingTournaments: false,
  paginateLoading: false,
  tournamentId: '',
  tournamentTitle: '',
  tournaments: [],
};

export const tournamentSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.errorTournaments = '';
        state.loadingTournaments = true;
        state.tournamentId = '';
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.loadingTournaments = false;
        state.currentPageLoading = true;
        state.tournaments = action.payload;
        state.tournamentId = action.payload.id;
        state.tournamentTitle = action.payload.title;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.loadingTournaments = false;
        state.errorTournaments = action.payload;
      })
      .addCase(getStatisticsPaginate.pending, (state) => {
        state.errorTournaments = '';
        state.tournamentId = '';
        state.paginateLoading = true;
      })
      .addCase(getStatisticsPaginate.fulfilled, (state, action) => {
        state.paginateLoading = false;
        state.tournaments = action.payload;
        state.tournamentId = action.payload.id;
        state.tournamentTitle = action.payload.title;
      })
      .addCase(getStatisticsPaginate.rejected, (state, action) => {
        state.loadingTournaments = false;
        state.errorTournaments = action.payload;
      });
  },
  initialState,
  name: 'tournament',
  reducers: {
    setLoadingFalse: (state) => {
      state.currentPageLoading = false;
    },
    setLoadingTrue: (state) => {
      state.currentPageLoading = true;
    },
  },
});

export const { actions: tournamentActions } = tournamentSlice;
export const { reducer: tournamentReducer } = tournamentSlice;
