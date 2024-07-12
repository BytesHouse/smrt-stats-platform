import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useSearchParams,
  useParams,
  Link,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './TournamentTabs.module.css';

export const TournamentTabs = () => {
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

  const selectedTab = useMemo(() => {
    switch (true) {
      case location?.pathname?.includes('/matches'):
        return 'matches';
      case location?.pathname?.includes('/events'):
        return 'events';
      default:
        return 'teams';
    }
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
        to={`/tournament/teams/${id}`}
        style={selectedTab === 'teams' ? tabBtnActiveStyles : tabBtnStyles}
      >
        {l(3)}
      </Link>
      <Link
        to={`/tournament/matches/${id}`}
        style={selectedTab === 'matches' ? tabBtnActiveStyles : tabBtnStyles}
      >
        {l(7)}
      </Link>
      {/* раскомментировать, когда появится функционал events */}
      {/* <Link
        to={`events/${id}`}
        style={selectedTab === 'events' ? tabBtnActiveStyles : tabBtnStyles}
      >
        {l(9)}
      </Link> */}
    </div>
  );
};
