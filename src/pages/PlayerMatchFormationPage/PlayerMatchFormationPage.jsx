import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { MatchFormation } from 'pages/TeamProfileMatchFormationPage/MatchFormation';
import { Pitch } from '../../components/Pitch/ui/Pitch';
import { PlayerProfileWrapper } from '../../components/PlayerProfileComponents/PlayerProfileWrapper/PlayerProfileWrapper';
import { getMatch } from '../../store/match/matchService';
import { getPlayerStatistics } from '../../store/player/playerService';
import cls from './PlayerMatchFormationPage.module.css';

export const PlayerMatchFormationPage = () => {
  const dispatch = useDispatch();
  const match = useSelector((state) => state.match.match);
  const matchId = useSelector((state) => state.match?.match?.id);
  const [searchParams] = useSearchParams();
  const l = useLexicon();
  useEffect(() => {
    const idPlayerParam = searchParams.get('player');
    const idMatchParam = searchParams.get('match');
    const idSeason = searchParams.get('season');
    if (+idPlayerParam) {
      dispatch(getPlayerStatistics({ id: idPlayerParam, years_season_id: idSeason }));
    }

    if (!matchId) {
      dispatch(getMatch(idMatchParam));
    } else if (+matchId !== +idMatchParam) {
      dispatch(getMatch(idMatchParam));
    }
  }, [searchParams, dispatch, matchId]);

  return (
    <PlayerProfileWrapper>
      <div className={cls.pageContainer}>
        <div className={cls.pageTabs}>
          <div
            style={{
              backgroundColor: '#BEFF4C',
              border: '1px solid #BEFF4C',
              color: '#000',
            }}
          >
            {l(119)}
          </div>
        </div>
        <div className={cls.contentContainer}>
          <header>
            <span>{l(117)}</span>
          </header>
          <MatchFormation
            match={match}
          />
        </div>
      </div>
    </PlayerProfileWrapper>
  );
};
