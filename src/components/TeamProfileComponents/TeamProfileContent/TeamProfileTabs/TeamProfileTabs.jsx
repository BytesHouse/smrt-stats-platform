import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useSearchParams,
  useParams,
  Link,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './TeamProfileTabs.module.css';

export const TeamProfileTabs = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  const { id } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const tabBtnStyles = useMemo(
    () => ({
      background: 'var(--main-midnight-blue)',
      // border: '1px solid #FFFFFF',
      color: 'var(--main-whitesmoke)',
      fontWeight: 'bold',
    }),
    [],
  );

  const idTeam = useMemo(() => {
    const searchTeamId = searchParams.get('team');
    if (id || searchTeamId) {
      return id || searchTeamId;
    }
    return null;
  }, [id, searchParams]);

  const selectedTab = useMemo(() => {
    const path = location?.pathname;
    if (path?.includes('team/players')) {
      return 'players';
    }
    if (path?.includes('team/events')) {
      return 'events';
    }
    if (path?.includes('team/')) {
      return 'matches';
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
        style={selectedTab === 'matches' ? tabBtnActiveStyles : tabBtnStyles}
        to={
          searchParams.get('season')
            ? `/team/${idTeam}/?season=${searchParams.get('season')}`
            : `/team/${idTeam}`
        }
      >
        {l(7)}
      </Link>
      <Link
        style={selectedTab === 'players' ? tabBtnActiveStyles : tabBtnStyles}
        to={
          searchParams.get('season')
            ? `/team/players/?team=${idTeam}&season=${searchParams.get(
              'season',
            )}`
            : `/team/players/?team=${idTeam}`
        }
      >
        {l(5)}
      </Link>

      <Link
        style={selectedTab === 'events' ? tabBtnActiveStyles : tabBtnStyles}
        to={
          searchParams.get('season')
            ? `/team/events/?team=${idTeam}&season=${searchParams.get(
              'season',
            )}`
            : `/team/events/?team=${idTeam}`
        }
      >
        {l(9)}
      </Link>
    </div>
  );
};
