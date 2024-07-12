/* eslint-disable react/jsx-no-constructed-context-values */
import React, {
  Suspense,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Routes,
  Route,
  useSearchParams,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import '../../config/i18n/i18n';
import Stub from 'components/Stub/Stub';
import { getLanguages, getTranslates } from 'store/languages/languagesService';
import { TournamentTeamsPage } from 'pages/TournamentTeamsPage/TournamentTeamsPage';
import { TournamentMatchesPage } from 'pages/TournamentMatchesPage/TournamentMatchesPage';
import { FavoritesPage } from 'pages/FavoritesPage/FavoritesPage';
import { TournamentVideoPage } from 'pages/TournamentMatchPage/TournamentMatchPage';
// eslint-disable-next-line import/no-cycle
import ThemeProvider from 'providers/ThemeProvider/ThemeProvider';
// eslint-disable-next-line import/no-cycle
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegistrationPage } from '../../pages/RegistrationPage/RegistrationPage';
import { TeamProfilePage } from '../../pages/TeamProfilePage/TeamProfilePage';
import { TeamProfileMatchesPage } from '../../pages/TeamProfileMatchesPage/TeamProfileMatchesPage';
import { TeamProfileEventsPage } from '../../pages/TeamProfileEventsPage/TeamProfileEventsPage';
import { NotFoundPage } from '../../pages/NotFoundPage/NotFoundPage';
import { ProtectedRoute } from '../../providers/ProtectedRoute';
// eslint-disable-next-line import/no-cycle
import { HomePage } from '../../pages/HomePage/HomePage';
import { userActions } from '../../store/user/userSlice';
import { TeamProfileMatchPage } from '../../pages/TeamProfileMatchPage/TeamProfileMatchPage';
import { TeamProfileMatchFormationPage } from '../../pages/TeamProfileMatchFormationPage/TeamProfileMatchFormationPage';
import { TeamProfileMatchMistakesPage } from '../../pages/TeamProfileMatchMistakesPage/TeamProfileMatchMistakesPage';
import { PlayerProfilePage } from '../../pages/PlayerProfilePage/PlayerProfilePage';
import { PlayerProfileMatchesPage } from '../../pages/PlayerProfileMatchesPage/PlayerProfileMatchesPage';
import { PlayerProfileEventsPage } from '../../pages/PlayerProfileEventsPage/PlayerProfileEventsPage';
import { PlayerProfileMatchStatisticsPage } from '../../pages/PlayerProfileMatchStatisticsPage/PlayerProfileMatchStatisticsPage';
import { PlayerMatchFormationPage } from '../../pages/PlayerMatchFormationPage/PlayerMatchFormationPage';
import { Competitions } from '../../pages/Competitions/Competitions';
import { VideoCutsPage } from '../../pages/VideoCutsPage/VideoCutsPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { PlaylistPage } from '../../pages/PlaylistPage/PlaylistPage';
import { PlaylistItemPage } from '../../pages/PlaylistItemPage/PlaylistItemPage';
import { SharedPlaylistPage } from '../../pages/SharedPlaylistPage/SharedPlaylistPage';
import { getFormationInfo } from '../../store/user/userService';
import { $api, isProduction, TEST_HOST } from '../../config/api';
import { SystemSettings } from '../SystemSettings';

export const ThemeContext = createContext(null);
export const StubContext = createContext(null);

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [routePath, setRoutePath] = useState(location.pathname);
  const [searchParams] = useSearchParams();
  localStorage.setItem(
    'lexic',
    JSON.stringify(useSelector((state) => state.lexicon.translates)),
  );

  const checkUserToken = useCallback(() => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      dispatch(userActions.setToken(''));
      return;
    }
    dispatch(userActions.setToken(token));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getFormationInfo());
    dispatch(getLanguages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(getTranslates(localStorage.getItem('language') || 'en'));
  }, [dispatch]);

  useEffect(() => {
    checkUserToken();
  }, [checkUserToken]);
  useEffect(() => {
    if (!location.pathname.includes('/login')) {
      $api.get('/users/check_token/')
        .catch(() => {
          localStorage.setItem('token', '');
          checkUserToken();
        })
    }
    const path = searchParams.size ? `?${decodeURI(searchParams.toString())}` : '';
    $api.post('/users/activity/', {
      link_from: `https://platform.smrtstats.com${routePath}${path}`,
      link_to: `https://platform.smrtstats.com${location.pathname}${path}`,
      type: 1,
    }).finally(() => {
      setRoutePath(location.pathname)
    })
  }, [location])

  useEffect(() => {

  }, [])

  const [theme, setTheme] = useState('dark');
  const [modalActive, setModalActive] = useState(false);
  return (
  // TODO: исправить
    <StubContext.Provider value={{ modalActive, setModalActive }}>
      <div className='App' id={theme}>
        <Suspense fallback=''>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            {/* раскомментировать, когда отпадет надобность */}
            {/* <Route path='/registration' element={<RegistrationPage />} /> */}
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/playlist'
              element={
                <ProtectedRoute>
                  <PlaylistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/playlist/:id'
              element={
                <ProtectedRoute>
                  <PlaylistItemPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/records/:id'
              element={
                <ProtectedRoute>
                  <PlaylistItemPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/shared'
              element={
                <ProtectedRoute>
                  <SharedPlaylistPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile/shared_playlist/:id'
              element={<PlaylistItemPage type='shared' />}
            />
            <Route
              path='/profile/favorites'
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/player/:id'
              element={
                <ProtectedRoute>
                  <PlayerProfileMatchesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/player/matches/'
              element={
                <ProtectedRoute>
                  <PlayerProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/player/events/'
              element={
                <ProtectedRoute>
                  <PlayerProfileEventsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/player/match/statistics/'
              element={
                <ProtectedRoute>
                  <PlayerProfileMatchStatisticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/player/match/formation'
              element={
                <ProtectedRoute>
                  <PlayerMatchFormationPage />
                </ProtectedRoute>
              }
            />

            <Route
              path='/team/:id'
              element={
                <ProtectedRoute>
                  <TeamProfileMatchesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/team/players/'
              element={
                <ProtectedRoute>
                  <TeamProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/team/events/'
              element={
                <ProtectedRoute>
                  <TeamProfileEventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/team/match/'
              element={
                <ProtectedRoute>
                  <TeamProfileMatchPage matchId={searchParams.get('match')} teadId={searchParams.get('team')} />
                </ProtectedRoute>
              }
            />
            <Route
              path='/team/match/formation'
              element={
                <ProtectedRoute>
                  <TeamProfileMatchFormationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/team/match/mistakes'
              element={
                <ProtectedRoute>
                  <TeamProfileMatchMistakesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/tournament/matches/:id'
              element={(
                <ProtectedRoute>
                  <TournamentMatchesPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path='/tournament/video/:id'
              element={(
                <ProtectedRoute>
                  <TournamentVideoPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path='/tournament/teams/:id'
              element={(
                <ProtectedRoute>
                  <TournamentTeamsPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path='/competitions'
              element={
                <ProtectedRoute>
                  <Competitions />
                </ProtectedRoute>
              }
            />
            <Route
              path='/video_cuts'
              element={
                <ProtectedRoute>
                  <VideoCutsPage />
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
      {modalActive && <Stub setModalActive={setModalActive} />}
      {!isProduction && <SystemSettings />}
    </StubContext.Provider>
  );
};

export default App;
