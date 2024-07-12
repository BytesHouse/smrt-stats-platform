import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { TeamProfileWrapper } from '../../components/TeamProfileComponents/TeamProfileWrapper/TeamProfileWrapper';
import { VideoPlayer } from '../../components/VideoPlayer';
import { getMatch } from '../../store/match/matchService';
import { getTeamStatistics } from '../../store/team/teamService';
import cls from './TeamProfileMatchMistakesPage.module.css';

export const TeamProfileMatchMistakesPage = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const match = useSelector((state) => state.match.match);
  const l = useLexicon();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const idTeamParam = searchParams.get('team');
    const idSeason = searchParams.get('season');
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
          <Link to={`/video_cuts?action=79,2,26,36,76,58,50,45,44,97,53,65,70,34,30,38,50,45,54,28&match=${match?.id}&team=${team?.id}`}>
            <div>
              {l(326)}
            </div>
          </Link>
          <Link to={`/video_cuts?action=65,79&match=${match?.id}&team=${team?.id}`}>
            <div>
              G+A
            </div>
          </Link>
          <Link to={`/video_cuts?action=69,61&match=${match?.id}&team=${team?.id}`}>
            <div>
              {l(17)}
            </div>
          </Link>
          <div
            style={{
              backgroundColor: '#B4EB54',
              border: '1px solid #B4EB54',
              color: '#000',
            }}
          >
            {l(118)}
          </div>
          <Link to={`/team/match/formation?team=${team?.id}&match=${match?.id}`}>
            <div>
              {l(119)}
            </div>
          </Link>
        </div>
        <div className={cls.contentContainer}>
          <header>
            <span>{l(117)}</span>
          </header>
          <div className={cls.playerWrapper}>

            {match?.videos?.[0]?.link ? (
              <VideoPlayer
                videoInfo={match?.videos[0]}
                video={match?.videos[0].link}
              />
            ) : (
              <b>No video</b>
            )}
          </div>
        </div>
      </div>
    </TeamProfileWrapper>
  );
};
