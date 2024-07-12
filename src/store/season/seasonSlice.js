/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getSeason } from './seasonService';

const initialState = {
  errorSeason: '',
  loadingSeason: false,
  season: [],
};

export const seasonSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getSeason.pending, (state) => {
        state.errorSeason = '';
        state.loadingSeason = true;
      })
      .addCase(getSeason.fulfilled, (state, action) => {
        state.loadingSeason = false;
        state.season = action.payload;
      })
      .addCase(getSeason.rejected, (state, action) => {
        state.loadingSeason = false;
        state.errorSeason = action.payload;
      });
  },
  initialState,
  name: 'season',
  reducers: {},
});

export const { actions: seasonActions } = seasonSlice;
export const { reducer: seasonReducer } = seasonSlice;
