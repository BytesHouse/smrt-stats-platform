/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getCompetition } from './competitionService';

const initialState = {
  competitions: {},
  errorCompetitions: '',
  loadingCompetitions: false,
};

export const competitionSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getCompetition.pending, (state) => {
        state.errorCompetitions = '';
        state.loadingCompetitions = true;
      })
      .addCase(getCompetition.fulfilled, (state, action) => {
        state.loadingCompetitions = false;
        state.competitions = action.payload;
      })
      .addCase(getCompetition.rejected, (state, action) => {
        state.loadingCompetitions = false;
        state.errorCompetitions = action.payload;
      });
  },
  initialState,
  name: 'competition',
  reducers: {},
});

export const { actions: competiotionActions } = competitionSlice;
export const { reducer: competitionReducer } = competitionSlice;
