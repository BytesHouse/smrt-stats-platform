import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { MatchPlayers } from 'components/TeamProfileComponents/TeamProfileMatchComponents/MatchPlayers/MatchPlayers';
import { GearIcon } from 'components/ui/GearIcon/GearIcon';
import { ShortStats } from 'components/TeamProfileComponents/TeamProfileMatchComponents/ShortStats/ShortStats';
import { Timeline } from 'components/TeamProfileComponents/TeamProfileMatchComponents/Timeline/Timeline';
import { $api, API_URL } from 'config/api';
import { teamActions } from 'store/team/teamSlice';
import { TeamProfileWrapper } from '../../components/TeamProfileComponents/TeamProfileWrapper/TeamProfileWrapper';
import {
  getMatch,
  getMatchEvents,
  getMatchPlayers,
  getMatchTimeline,
  getShortsData,
  getStatisticsMatch,
} from '../../store/match/matchService';
import { getTeamStatistics } from '../../store/team/teamService';
import cls from './TeamProfileMatchPage.module.css';

export const TeamProfileMatchPage = ({ matchId, teadId }) => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const match = useSelector((state) => state.match.match);
  const matchStat = useSelector((state) => state.match.statisticsMatch?.statistics);
  const [searchParams] = useSearchParams();
  const loading = useSelector((state) => state.match.loadingStatisticsMatch);
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
      dispatch(getStatisticsMatch(idMatchParam));
      dispatch(getMatchPlayers(idMatchParam))
      dispatch(getMatchEvents(idMatchParam))
      dispatch(getShortsData(idMatchParam))
      dispatch(getMatchTimeline(idMatchParam))
    }
  }, [searchParams, dispatch, match]);

  function downloadFile(url, fileName) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl); // Освобождение ресурсов
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error('Ошибка при скачивании файла:', e));
  }

  const postSelectedMatchesEventsXML = async () => {
    if (!matchId) {
      return
    }
    try {
      const response = await $api.post('/statistics/match_event_unload', {
        file_type: 'xml',
        matches: [matchId],
      });
      const fileUrl = response.data?.file_url;
      downloadFile(`${API_URL}${fileUrl}`, 'report.xml')
      dispatch(teamActions.setSelectedMatches([]));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <TeamProfileWrapper>
      <div className={cls.pageContainer}>
        <div className={cls.pageTabs}>
          <Link to={`/video_cuts?action=79,2,26,36,76,58,50,45,44,97,53,65,70,34,30,38,50,45,54,28&team=${teadId}&match=${matchId}`}>
            <div>{l(326)}</div>
          </Link>
          <Link to={`/video_cuts?action=65,79&team=${teadId}&match=${matchId}`}>
            <div>G+A</div>
          </Link>
          <Link to={`/team/match/mistakes?team=${teadId}&match=${matchId}`}>
            <div>
              {l(118)}
            </div>
          </Link>
          <Link to={`/team/match/formation?team=${team?.id}&match=${match?.id}`}>
            <div
              role='text'
            >
              {l(119)}
            </div>
          </Link>
        </div>
        <h3>{l(117)}</h3>
        <p style={{ position: 'relative' }}>
          {
            loading ? `${l(312)}` : (
              <>
                {match?.home_squad?.team?.name} {match?.home_team_score}:
                {match?.away_team_score} {match?.away_squad?.team?.name}{' '}
                {match?.date?.split('T')[0]}, {match?.season?.competition?.name}
              </>
            )
          }
          <button onClick={() => postSelectedMatchesEventsXML()} className={cls.xls} type='button'>Download in XML</button>
        </p>
        <div className={cls.playersTablesContainer}>
          {/* <Timeline /> */}
          <ShortStats />
          <MatchPlayers />
        </div>
      </div>
    </TeamProfileWrapper>
  );
};
