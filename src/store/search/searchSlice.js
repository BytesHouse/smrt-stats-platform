/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { searchPlayer, searchTeam } from './searchService';

const initialState = {
  errorSearchPlayersRequest: '',
  errorSearchTeamsRequest: '',
  loadingPlayers: false,
  loadingTeams: false,
  nextPlayer: '',
  nextTeams: '',
  players: [],
  playersCount: 0,
  teams: [],
  teamsCount: 0,
};

export const userSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(searchPlayer.pending, (state) => {
        state.errorSearchPlayersRequest = '';
        state.loadingPlayers = true;
      })
      .addCase(searchPlayer.fulfilled, (state, action) => {
        state.loadingPlayers = false;
        state.players = action.payload.results;
        state.playersCount = action.payload.count;
        state.nextPlayer = action.payload.next?.split('?')[1] ?? '';
      })
      .addCase(searchPlayer.rejected, (state, action) => {
        state.loadingPlayers = false;
        state.errorSearchPlayersRequest = action.payload;
      })
      .addCase(searchTeam.pending, (state) => {
        state.errorSearchTeamsRequest = '';
        state.loadingTeams = true;
      })
      .addCase(searchTeam.fulfilled, (state, action) => {
        state.loadingTeams = false;
        state.teams = action.payload.results;
        state.teamsCount = action.payload.count;
        state.nextTeams = action.payload.next?.split('?')[1] ?? '';
      })
      .addCase(searchTeam.rejected, (state, action) => {
        state.loadingTeams = false;
        state.errorSearchTeamsRequest = action.payload;
      });
  },
  initialState,
  name: 'user',
  reducers: {
    setLoadingPlayers: (state, action) => {
      state.loadingPlayers = action.payload;
    },
    setLoadingTeams: (state, action) => {
      state.loadingTeams = action.payload;
    },
  },
});

export const { actions: searchActions } = userSlice;
export const { reducer: searchReducer } = userSlice;
