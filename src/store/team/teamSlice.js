/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  filterPlayersByTeam,
  getMatchesStatistics,
  getTeamStatistics,
} from './teamService';

const teamSettingsInitState = {
  competitions: [{
    checked: true,
    label: 'all competitions',
    value: 'all competitions',
  }],
  seasons: [],
  selectedCountMatches: [
    {
      checked: true,
      label: 'All matches selected',
      value: 1000,
    }, {
      checked: false,
      label: 'last 3 matches',
      value: 3,
    },
    {
      checked: false,
      label: 'last 5 matches',
      value: 5,
    },
    {
      checked: false,
      label: 'last 10 matches',
      value: 10,
    },
    {
      checked: false,
      label: 'custom select',
      value: 1,
    },
  ],
}

const initialState = {
  activeTab: 1,
  currentPlayersPage: 1,
  errorPlayers: '',
  errorTeamStatistic: '',
  eventTabs: [],
  loadingMatchesStatistic: false,
  loadingPlayers: false,
  loadingTeamStatistic: false,
  matchesStatistic: {},
  parametrs: {},
  players: [],
  selectedActions: [],
  selectedMatches: [],
  teamMatchesPlayed: [],
  teamSettings: teamSettingsInitState,
  teamStatistic: {},
  totalPlayers: 0,
};

export const teamSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(filterPlayersByTeam.pending, (state) => {
        state.errorPlayers = '';
        state.totalPlayers = 0;
        state.loadingPlayers = true;
      })
      // .addCase(filterPlayersByTeam.fulfilled, (state, action) => {
      //   state.loadingPlayers = false;
      //   state.totalPlayers = action.payload.count;
      //   state.players = action.payload.results;
      // })
      // .addCase(filterPlayersByTeam.rejected, (state, action) => {
      //   state.loadingPlayers = false;
      //   state.errorPlayers = action.payload;
      // })
      .addCase(getTeamStatistics.pending, (state) => {
        state.errorTeamStatistic = '';
        state.loadingTeamStatistic = true;
      })
      .addCase(getTeamStatistics.fulfilled, (state, action) => {
        state.loadingTeamStatistic = false;
        state.teamStatistic = action.payload;
        state.players = action.payload.players_list;
      })
      .addCase(getTeamStatistics.rejected, (state, action) => {
        state.loadingTeamStatistic = false;
        state.errorTeamStatistic = action.payload;
      })
      .addCase(getMatchesStatistics.pending, (state) => {
        state.loadingMatchesStatistic = true;
      })
      .addCase(getMatchesStatistics.fulfilled, (state, action) => {
        state.loadingMatchesStatistic = false;
        state.matchesStatistic = action.payload;
      })
      .addCase(getMatchesStatistics.rejected, (state) => {
        state.loadingMatchesStatistic = false;
      });
  },
  initialState,
  name: 'team',
  reducers: {
    resetSelectedAction: (state) => {
      state.selectedActions = []
    },
    resetTeamSettings: (state, action) => {
      state.teamSettings = { ...teamSettingsInitState, ...action.payload };
    },
    setActiveTab: (state, action) => {
      // const checkOutTabsOptions = [...state.eventTabs].map((item) => ({
      //   ...item,
      //   options:
      //     item?.options?.length > 0
      //       ? item.options.map((option) => ({ ...option, checked: false }))
      //       : [],
      // }));
      state.activeTab = action.payload;
      // state.eventTabs = checkOutTabsOptions;
      // state.selectedActions = [];
    },
    setCustomSelect: (state, action) => {
      const selectedCountMatches = state.selectedCountMatches.map((item) => {
        if (item.label === 'custom select') {
          return {
            ...item,
            value: action.payload.length,
          };
        }
        // eslint-disable-next-line no-unused-expressions
        item.label === 'custom select'
        return {
          ...item,
          value: action.payload.length,
        };
      });
      state.selectedCountMatches = selectedCountMatches;
    },
    setEventTabs: (state, action) => {
      state.eventTabs = action.payload;
    },
    setParametrs: (state, action) => {
      state.parametrs = action.payload;
    },
    setPlayersPage: (state, action) => {
      state.currentPlayersPage = action.payload;
    },
    setSelectedMatches: (state, action) => {
      let newSelectedMatches = [...state.selectedMatches];
      if (action.payload.checked) {
        newSelectedMatches = [...newSelectedMatches, action.payload.id];
      } else {
        newSelectedMatches = newSelectedMatches.filter(
          (item) => item !== action.payload.id,
        );
      }
      state.selectedMatches = Array.from(new Set(newSelectedMatches));
    },
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    setTeamSettings: (state, action) => {
      state.teamSettings = action.payload;
    },
    toggleCheckEvent: (state, action) => {
      const tabs = [...state.eventTabs];
      const tabIndex = tabs.findIndex((tab) => tab.id === action.payload.id);
      if (tabIndex >= 0) {
        const eventIndex = tabs[tabIndex].options.findIndex(
          (option) => option.id === action.payload.option_id,
        );
        if (eventIndex >= 0) {
          tabs[tabIndex].options[eventIndex].checked = action.payload.checked;
          if (action.payload.checked) {
            state.selectedActions = [
              ...state.selectedActions,
              tabs[tabIndex].options[eventIndex].id,
            ];
          } else {
            state.selectedActions = [...state.selectedActions].filter(
              (item) => +item !== +action.payload.option_id,
            );
          }
        }
      }
      state.eventTabs = tabs;
    },
    toggleCheckParametrs: (state, action) => {
      const parametrs = [...state.parametrs];
      const parametrIndex = parametrs.findIndex(
        (parametr) => parametr.id === action.payload.id,
      );
      if (parametrIndex >= 0) {
        parametrs[parametrIndex].checked = action.payload.checked;
      }
      state.parametrs = parametrs;
    },
  },
});

export const { actions: teamActions } = teamSlice;
export const { reducer: teamReducer } = teamSlice;
