/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedMarkers: {},
};

export const pitchSlice = createSlice({
  initialState,
  name: 'pitch',
  reducers: {
    setSelectedMarkers: (state, action) => {
      const key = Object.keys(action.payload)[0]
      if (!key && !action.payload) {
        state.selectedMarkers = {}
        return
      }

      const newState = { ...state.selectedMarkers }
      if (newState[key]) {
        delete newState[key]
      } else {
        newState[key] = action.payload[key]
      }
      state.selectedMarkers = newState
    },
  },
});

export const { actions: pitchActions } = pitchSlice;
export const { reducer: pitchReducer } = pitchSlice;
