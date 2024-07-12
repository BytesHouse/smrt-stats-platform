/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  indexCurrent: -1,
  indexNext: 0,
  isLoading: true,
  nextVideo: {},
  selectedCuts: [],
  videoCuts: [],
};

export const videoCutsSlice = createSlice({
  initialState,
  name: 'video_cuts',
  reducers: {
    setIndexCurrent: (state, action) => {
      state.indexCurrent = action.payload;
    },
    setIndexNext: (state, action) => {
      state.indexNext = action.payload;
    },
    setLoading: (state) => {
      state.isLoading = true;
    },
    setNextVideo: (state, action) => {
      state.nextVideo = action.payload;
    },
    setVideoCuts: (state, action) => {
      state.videoCuts = action.payload;
      state.isLoading = false;
    },
    toggleCheckCut: (state, action) => {
      const cuts = [...state.videoCuts];
      const cutIndex = cuts.findIndex((tab) => tab.id === action.payload.id);
      if (cutIndex >= 0) {
        if (cutIndex >= 0) {
          cuts[cutIndex].checked = action.payload.checked;
          if (action.payload.checked) {
            state.selectedCuts = [...state.selectedCuts, cuts[cutIndex]];
          } else {
            state.selectedCuts = [...state.selectedCuts].filter(
              (item) => item.id !== action.payload.id,
            );
          }
        }
      }
      state.videoCuts = cuts;
      state.isLoading = false;
    },
  },
});

export const { actions: videoCutsActions } = videoCutsSlice;
export const { reducer: videoCutsReducer } = videoCutsSlice;
