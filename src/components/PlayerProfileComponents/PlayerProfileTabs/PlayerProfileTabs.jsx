import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useParams,
  useSearchParams,
  Link,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './PlayerProfileTabs.module.css';

export const PlayerProfileTabs = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  const location = useLocation();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const idPlayer = useMemo(() => {
    const searchPlayerId = searchParams.get('player');
    if (id || searchPlayerId) {
      return id || searchPlayerId;
    }
    return null;
  }, [id, searchParams]);

  const tabBtnStyles = useMemo(
    () => ({
      background: 'var(--main-midnight-blue)',
      // border: '1px solid #FFFFFF',
      color: 'var(--main-whitesmoke)',
      fontWeight: 'bold',
    }),
    [],
  );

  const selectedTab = useMemo(() => {
    const path = location?.pathname;
    if (path?.includes('player/matches')) {
      return 'matches';
    }
    if (path?.includes('player/events')) {
      return 'events';
    }
    if (path?.includes('player/')) {
      return 'player';
    }
    return '';
  }, [location]);

  const tabBtnActiveStyles = useMemo(
    () => ({
      backgroundColor: 'var(--main-light-blue)',
      // border: '1px solid #B4EB54',
      color: 'var(--main-midnight-blue)',
      fontWeight: 'bold',
    }),
    [],
  );

  return (
    <div className={cls.matchEventLinks}>
      <Link
        to={
          searchParams.has('season')
            ? `/player/${idPlayer}/?season=${searchParams.get('season')}`
            : `/player/${idPlayer}`
        }
        style={selectedTab === 'player' ? tabBtnActiveStyles : tabBtnStyles}
      >
        {l(8)}
      </Link>
      <Link
        to={
          searchParams.has('season')
            ? `/player/matches?player=${idPlayer}&season=${searchParams.get(
              'season',
            )}`
            : `/player/matches?player=${idPlayer}`
        }
        style={selectedTab === 'matches' ? tabBtnActiveStyles : tabBtnStyles}
      >
        {l(7)}
      </Link>

      <Link
        to={
          searchParams.has('season')
            ? `/player/events/?player=${idPlayer}&season=${searchParams.get(
              'season',
            )}`
            : `/player/events/?player=${idPlayer}`
        }
        style={selectedTab === 'events' ? tabBtnActiveStyles : tabBtnStyles}
      >
        {l(9)}
      </Link>
    </div>
  );
};
