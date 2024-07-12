/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getFavorites } from './favoritesService';

const initialState = {
  errorfavorites: '',
  favorites: [],
  loadingFavorites: false,
  sort: '-created_at',
};

export const favoritesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getFavorites.pending, (state) => {
        state.errorfavorites = '';
        state.loadingFavorites = true;
      })
      .addCase(getFavorites.fulfilled, (state, action) => {
        state.loadingFavorites = false;
        state.favorites = action.payload;
      })
      .addCase(getFavorites.rejected, (state, action) => {
        state.loadingFavorites = false;
        state.errorfavorites = action.payload;
      });
  },
  initialState,
  name: 'favorites',
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const { actions: favoritesActions } = favoritesSlice;
export const { reducer: favoritesReducer } = favoritesSlice;
