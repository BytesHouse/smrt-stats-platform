import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { Formation } from 'components/Formation';
import { TeamProfileWrapper } from '../../components/TeamProfileComponents/TeamProfileWrapper/TeamProfileWrapper';
import { getMatch } from '../../store/match/matchService';
import { getTeamStatistics } from '../../store/team/teamService';
import cls from './TeamProfileMatchFormationPage.module.css';
import { MatchFormation } from './MatchFormation';

export const TeamProfileMatchFormationPage = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const match = useSelector((state) => state.match.match);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const l = useLexicon();

  useEffect(() => {
    const idSeason = searchParams.get('season');
    const idTeamParam = searchParams.get('team');
    if (idTeamParam && Number(team?.id) !== Number(idTeamParam)) {
      dispatch(getTeamStatistics({ id: idTeamParam, year_season_id: idSeason }));
    }
  }, [searchParams, dispatch, team]);

  useEffect(() => {
    const idMatchParam = searchParams.get('match');
    if (Number(idMatchParam) !== Number(match?.id)) {
      dispatch(getMatch(idMatchParam));
    }
  }, [searchParams, dispatch, match]);

  return (
    <TeamProfileWrapper>
      <div className={cls.pageContainer}>
        <div className={cls.pageTabs}>
          <div
            onClick={() => navigate(
              `/video_cuts?action=79,2,26,36,76,58,50,45,44,97,53,65,70,34,30,38,50,45,54,28&match=${match?.id}&team=${team.id}`,
            )}
          >
            {l(326)}
          </div>
          <div
            onClick={() => navigate(
              `/video_cuts?action=65,79&match=${match?.id}&team=${team.id}`,
            )}
          >
            G+A
          </div>
          <div
            onClick={() => navigate(
              `/video_cuts?action=69,61&match=${match?.id}&team=${team.id}`,
            )}
          >
            {l(17)}
          </div>
          <div
            onClick={() => navigate(
              `/team/match/mistakes?team=${team?.id}&match=${match?.id}`,
            )}
          >
            {l(118)}
          </div>
          <div
            style={{
              backgroundColor: '#B4EB54',
              border: '1px solid #B4EB54',
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
          <MatchFormation match={match} />
        </div>
      </div>
    </TeamProfileWrapper>
  );
};
