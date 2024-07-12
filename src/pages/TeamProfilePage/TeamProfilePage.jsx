import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { TeamProfilePlayersTable } from '../../components/TeamProfileComponents/TeamProfilePlayersTable/TeamProfilePlayersTable';
import { TeamProfileWrapper } from '../../components/TeamProfileComponents/TeamProfileWrapper/TeamProfileWrapper';
import { getTeamStatistics } from '../../store/team/teamService';

export const TeamProfilePage = () => {
  const dispatch = useDispatch();
  const teamId = useSelector((state) => state.team?.teamStatistic?.team?.id);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const idSeason = searchParams.get('season');
    const idTeamParam = searchParams.get('team');

    if (+idTeamParam !== +teamId) {
      dispatch(getTeamStatistics({ id: idTeamParam, year_season_id: idSeason })).then((res) => {
        const visitedList = localStorage.getItem('visited_list');

        if (visitedList) {
          if (window.location.href.split('/team')[1]) {
            const visitedListArr = JSON.parse(visitedList);
            const newVisitedListArr = [
              {
                date: new Date().toLocaleDateString('zh-Hans-CN'),
                href: `/team${window.location.href.split('/team')[1]}`,
                id: Date.now(),
                title: `${res.payload.team.name}`,
              },
              ...visitedListArr,
            ];
            localStorage.setItem('visited_list', JSON.stringify(newVisitedListArr));
          }
        } else if (window.location.href.split('/team')[1]) {
          const newVisitedListArr = [
            {
              date: new Date().toLocaleDateString('zh-Hans-CN'),
              href: `/team${window.location.href.split('/team')[1]}`,
              id: Date.now(),
              title: `${res.payload.team.name}`,
            },
          ];
          localStorage.setItem('visited_list', JSON.stringify(newVisitedListArr));
        }
      });
    }
  }, [teamId, dispatch, searchParams]);

  return (
    <TeamProfileWrapper>
      <TeamProfilePlayersTable />
    </TeamProfileWrapper>
  );
};
