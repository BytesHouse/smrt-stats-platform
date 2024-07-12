/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  createPlaylist,
  getPlaylist,
  // deletePlaylistEvents,
  // deletePlaylist,
} from './playlistService';

const initialState = {
  currentPage: 1,
  errorPlaylist: '',
  loadingPlaylist: false,
  playlist: [],
  totalCountPlaylist: 0,
};

export const playlistSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getPlaylist.pending, (state) => {
        state.playlist = [];
        state.totalCountPlaylist = 0;
        state.loadingPlaylist = true;
      })
      .addCase(getPlaylist.fulfilled, (state, action) => {
        state.loadingPlaylist = false;
        state.playlist = action.payload.results;
        state.totalCountPlaylist = action.payload.count;
      })
      .addCase(getPlaylist.rejected, (state, action) => {
        state.loadingPlaylist = false;
        state.errorPlaylist = action.payload;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.playlist = [action.payload, ...state.playlist];
        state.totalCountPlaylist += 1;
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.errorPlaylist = action.payload;
      })
    // .addCase(deletePlaylist.pending, (state, action) => {})
    // .addCase(deletePlaylist.fulfilled, (state, action) => {})
    // .addCase(deletePlaylist.rejected, (state, action) => {});
  },
  initialState,
  name: 'playlist',
  reducers: {
    addPlayLists: (state, action) => {
      state.playlist = [...state.playlist, ...action.payload];
    },
    setCurrentPlaylistPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLoadingPlaylist: (state, action) => {
      state.loadingPlaylist = action.payload;
    },
    setTotalPlaylist: (state, action) => {
      state.totalCountPlaylist = action.payload;
    },
  },
});

export const { actions: playlistActions } = playlistSlice;
export const { reducer: playlistReducer } = playlistSlice;
