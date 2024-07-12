import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api_lang } from 'config/api';

export const getTranslates = createAsyncThunk(
  'lexicon/get_lexic',
  async (lang = 'en', { rejectWithValue }) => {
    try {
      const lg = lang === 'es' ? 'sp' : lang;
      const response = await $api_lang.get(`/lexic?service=Platform&lang=${lg}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getLanguages = createAsyncThunk(
  'lexicon/get_language',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api_lang.get('/language/');
      return response.data;
    } catch (e) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
)
