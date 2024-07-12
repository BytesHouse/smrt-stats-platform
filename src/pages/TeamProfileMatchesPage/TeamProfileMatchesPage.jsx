import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { TeamProfileMatchesTable } from '../../components/TeamProfileComponents/TeamProfileMatchesTable/TeamProfileMatchesTable';
import { TeamProfileWrapper } from '../../components/TeamProfileComponents/TeamProfileWrapper/TeamProfileWrapper';
import {
  getMatchesStatistics,
  getTeamStatistics,
} from '../../store/team/teamService';

export const TeamProfileMatchesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const matchStat = useSelector((state) => state.team.matchesStatistic);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const idSeason = searchParams.get('season');
    if (id && Number(team?.id) !== Number(id)) {
      dispatch(getTeamStatistics({ id, year_season_id: idSeason }));
    }
  }, [searchParams, dispatch, team, id]);

  useEffect(() => {
    const idSeason = searchParams.get('season');
    if (!matchStat || (Number(matchStat?.team?.id) !== Number(id))) {
      dispatch(getMatchesStatistics({ id, year_season_id: idSeason }));
    }
  }, [dispatch, id, matchStat, searchParams])

  return (
    <TeamProfileWrapper>
      <TeamProfileMatchesTable />
    </TeamProfileWrapper>
  );
};
