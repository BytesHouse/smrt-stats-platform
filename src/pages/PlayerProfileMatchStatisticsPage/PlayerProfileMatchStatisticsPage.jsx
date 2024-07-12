import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { PlayerProfileWrapper } from '../../components/PlayerProfileComponents/PlayerProfileWrapper/PlayerProfileWrapper';
import { getMatch, getStatisticsMatch } from '../../store/match/matchService';
import { getPlayerStatistics } from '../../store/player/playerService';
import cls from './PlayerProfileMatchStatisticsPage.module.css';
import { MatchStatPlayersTable } from '../../components/TeamProfileComponents/TeamProfileMatchComponents/MatchStatPlayersTable/MatchStatPlayersTable';

export const PlayerProfileMatchStatisticsPage = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const match = useSelector((state) => state.match.match);
  const matchStat = useSelector(
    (state) => state.match.statisticsMatch?.statistics,
  );
  const matchIdStat = useSelector(
    (state) => state.match.statisticsMatch?.match?.id,
  );
  const matchId = useSelector((state) => state.match?.match?.id);
  const loading = useSelector((state) => state.match.loadingStatisticsMatch);
  const l = useLexicon();
  useEffect(() => {
    const idPlayerParam = searchParams.get('player');
    const idMatchParam = searchParams.get('match');
    const idSeason = searchParams.get('season');
    if (+idPlayerParam) {
      dispatch(getPlayerStatistics({ id: idPlayerParam, year_season_id: idSeason }));
    }

    if (!matchId) {
      dispatch(getMatch(idMatchParam));
    } else if (+matchId !== +idMatchParam) {
      dispatch(getMatch(idMatchParam));
    }
  }, [searchParams, dispatch, matchId]);

  useEffect(() => {
    const idMatchParam = searchParams.get('match');
    if (!matchIdStat) {
      dispatch(getStatisticsMatch(idMatchParam));
    } else if (+matchIdStat !== +idMatchParam) {
      dispatch(getStatisticsMatch(idMatchParam));
    }
  }, [searchParams, dispatch, matchIdStat]);

  return (
    <PlayerProfileWrapper>
      <div className={cls.pageContainer}>
        <div className={cls.pageTabs}>
          <div
            onClick={() => navigate(
              `/player/match/formation?player=${searchParams.get(
                'player',
              )}&match=${match?.id}`,
            )}
          >
            {l(119)}
          </div>
        </div>
        <h3>{l(117)}</h3>
        <p>
          {loading ? (
            `${l(312)}`
          ) : (
            <>
              {match?.home_squad?.team?.name} {match?.home_team_score}:
              {match?.away_team_score} {match?.away_squad?.team?.name}{' '}
              {match?.date?.split('T')[0]}, {match?.season?.competition?.name}
            </>
          )}
        </p>
        <div className={cls.playersTablesContainer}>
          <MatchStatPlayersTable
            team={matchStat?.home_team}
            teamName={match?.home_squad?.team?.name}
          />
          <MatchStatPlayersTable
            team={matchStat?.away_team}
            teamName={match?.away_squad?.team?.name}
          />
        </div>
      </div>
    </PlayerProfileWrapper>
  );
};
