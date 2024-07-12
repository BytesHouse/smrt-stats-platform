import { configureStore } from '@reduxjs/toolkit';
import { translatesReducer } from 'store/languages/languagesSlice';
import { tournamentReducer } from 'store/tournament/tournamentSlice';
import { formationReducer } from 'store/formation/formationSlice';
import { favoritesReducer } from 'store/favorites/favoritesSlice';
import { useDispatch } from 'react-redux';
import { matchReducer } from '../../../store/match/matchSlice';
import { playerReducer } from '../../../store/player/playerSlice';
import { searchReducer } from '../../../store/search/searchSlice';
import { teamReducer } from '../../../store/team/teamSlice';
import { userReducer } from '../../../store/user/userSlice';
import { competitionReducer } from '../../../store/competition/competitionSlice';
import { seasonReducer } from '../../../store/season/seasonSlice';
import { videoCutsReducer } from '../../../store/video_cuts/videoCutsSlice';
import { playlistReducer } from '../../../store/playlist/playlistSlice';
import { pitchReducer } from '../../../store/pitch/pitchSlice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  reducer: {
    competiton: competitionReducer,
    favorites: favoritesReducer,
    formation: formationReducer,
    lexicon: translatesReducer,
    match: matchReducer,
    pitch: pitchReducer,
    player: playerReducer,
    playlist: playlistReducer,
    search: searchReducer,
    season: seasonReducer,
    team: teamReducer,
    tournament: tournamentReducer,
    user: userReducer,
    video_cuts: videoCutsReducer,
  },
});

export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
