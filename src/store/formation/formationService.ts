/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { $api } from '../../config/api';
import {
  FormationSplitResponse,
  MatchMarkersResponse,
  MatchPlacementResponse,
} from './formationTypes';

export const getMatchPlacementData = createAsyncThunk<
MatchPlacementResponse,
number
>(
  'formation/get_match_placement',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/registrator/placement/${id}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getMatchFormationData = createAsyncThunk<
FormationSplitResponse,
number
>(
  'formation/get_match_formation_data',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/platform/formation/split/${id}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);

export const getMatchMarkers = createAsyncThunk<
MatchMarkersResponse,
number
>(
  'formation/get_match_markers',
  async (id, { rejectWithValue }) => {
    try {
      const response = await $api.get(`/registrator/match_markers_fast/${id}`);
      return response.data;
    } catch (e: any) {
      return rejectWithValue(`${e.response.data.message}`);
    }
  },
);
