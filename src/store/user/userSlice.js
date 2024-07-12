/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  getFormationInfo,
  loginUser,
  regUser,
} from './userService';

const initialState = {
  errorLogin: '',
  errorRegistration: '',
  loading: false,
  token: '',
  userProfile: {},
};

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.errorLogin = '';
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.errorLogin = action.payload;
      })
      .addCase(regUser.pending, (state) => {
        state.errorRegistration = '';
        state.loading = true;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.loading = false;
        state.errorRegistration = action.payload;
      })
      .addCase(getFormationInfo.pending, (state) => {
        state.userProfile = {};
        state.loading = true;
      })
      .addCase(getFormationInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getFormationInfo.rejected, (state) => {
        state.loading = false;
      })
  },
  initialState,
  name: 'user',
  reducers: {
    changeOffsetBegin: (state, action) => {
      state.userProfile.offset_range_begin = Number(action.payload)
    },
    changeOffsetEnd: (state, action) => {
      state.userProfile.offset_range_end = Number(action.payload)
    },
    setPitchSettings: (state, action) => {
      state.userProfile.pitchSettings = action.payload
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
