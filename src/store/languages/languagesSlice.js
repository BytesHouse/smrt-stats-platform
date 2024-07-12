/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { getLanguages, getTranslates } from './languagesService';

const initialState = {
  errorLanguages: '',
  errorTranslates: '',
  languages: [],
  loadingTranslates: true,
  loagingLanguages: true,
  translates: [],
}

export const translatesSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getTranslates.pending, (state) => {
        state.loadingTranslates = true;
      })
      .addCase(getTranslates.fulfilled, (state, action) => {
        state.loadingTranslates = false;
        state.translates = action.payload;
      })
      .addCase(getTranslates.rejected, (state, action) => {
        state.loadingTranslates = false;
        state.errorTranslates = action.payload;
      })
      .addCase(getLanguages.pending, (state) => {
        state.loagingLanguages = true;
      })
      .addCase(getLanguages.fulfilled, (state, action) => {
        state.loagingLanguages = false;
        state.languages = action.payload;
      })
      .addCase(getLanguages.rejected, (state, action) => {
        state.loagingLanguages = false;
        state.errorLanguages = action.payload;
      })
  },
  initialState,
  name: 'lexicon',
  reducers: {},
});

export const { actions: translatesActions } = translatesSlice;
export const { reducer: translatesReducer } = translatesSlice;
