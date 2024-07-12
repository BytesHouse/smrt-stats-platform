import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TacticI } from 'components/Formation/ui/types/tacticTypes';
import { PitchCircleI } from '../../components/Formation/ui/Formation';
import {
  getMatchFormationData,
  getMatchMarkers,
  getMatchPlacementData,
} from './formationService';
import {
  FormationSchema,
  FormationSplitResponse,
  MatchMarkersResponse,
  MatchPlacementResponse,
} from './formationTypes';

const initialState: FormationSchema = {
  away_tactic: [],
  away_tactic_key: '3-5-2',
  change_side: false,
  formation_split_data: {} as FormationSplitResponse,
  home_tactic: [],
  home_tactic_key: '3-5-2',
  loading_placement_data: false,
  match_markers: [],
  match_placement_data: {} as MatchPlacementResponse,
};

export const formationSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getMatchPlacementData.pending, (state) => {
        state.loading_placement_data = true;
      })
      .addCase(getMatchPlacementData.fulfilled, (
        state,
        action: PayloadAction<MatchPlacementResponse>,
      ) => {
        state.loading_placement_data = false;
        state.match_placement_data = action.payload;
      })
      .addCase(getMatchPlacementData.rejected, (state) => {
        state.loading_placement_data = false;
      })
      .addCase(getMatchMarkers.fulfilled, (
        state,
        action: PayloadAction<MatchMarkersResponse>,
      ) => {
        state.match_markers = action.payload.markers;
      })
      .addCase(getMatchFormationData.fulfilled, (
        state,
        action: PayloadAction<FormationSplitResponse>,
      ) => {
        state.formation_split_data = action.payload;
      })
  },
  initialState,
  name: 'formation',
  reducers: {
    setAwayTactic: (state, action: PayloadAction<Array<PitchCircleI>>) => {
      state.away_tactic = action.payload;
    },
    setAwayTacticKey: (state, action: PayloadAction<keyof TacticI>) => {
      state.away_tactic_key = action.payload;
    },
    setChangeSide: (state, action: PayloadAction<boolean>) => {
      state.change_side = action.payload;
    },
    setHomeTactic: (state, action: PayloadAction<Array<PitchCircleI>>) => {
      state.home_tactic = action.payload;
    },
    setHomeTacticKey: (state, action: PayloadAction<keyof TacticI>) => {
      state.home_tactic_key = action.payload;
    },
    setLoadingPlacementData: (state, action) => {
      state.loading_placement_data = action.payload;
    },
    setMatchPlacementData: (state, action: PayloadAction<MatchPlacementResponse>) => {
      state.match_placement_data = action.payload;
    },
  },
});

export const { actions: formationActions } = formationSlice;
export const { reducer: formationReducer } = formationSlice;
