/* eslint-disable */
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Skeleton } from '../../../ui';
import cls from './TournamentInfo.module.css';
import smrtPlaceholder from '../../../../images/smrt_placeholder.jpg';
import { useLexicon } from 'lib/hooks/useTranslates';

export const TournamentInfo = () => {
  const { t } = useTranslation();
  const loading = useSelector((state) => state.tournament.loadingTournaments);
  const curr = useSelector((state) => state.tournament.currentPageLoading)
  const tournament = useSelector((state) => state.tournament.tournaments)
  const title = useSelector((state)=> state.tournament.tournamentTitle);
  const l = useLexicon();
  const tournamentLogo = useMemo(() => {
    if (tournament?.competition) {
      return tournament.competition.logo;
    }
    return smrtPlaceholder;
  }, [tournament.title]);

  const tournamentName = useMemo(() => {
    if (tournament?.competition) {
      return tournament.competition.name;
    }
    return "Name of competition";
  }, [tournament.title]);

  return (
    <article className={cls.teamInfoContainer}>
      {loading && curr ?  (
        <Skeleton width={258} height={200} />
      ) : (
        <img
          // eslint-disable-next-line no-return-assign
          onError={(e) => (e.target.src = smrtPlaceholder)}
          src={tournamentLogo}
          alt='tournament logo'
        />
      )}

      {loading && curr ? <h3 className={cls.teamInfoContainerLink}>Loading...</h3> : <Link className={cls.teamInfoContainerLink}>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <h3
        >
          {tournamentName}
        </h3>
      </Link>}
    </article>
  );
};