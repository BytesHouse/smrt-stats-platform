import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { PlayerProfileMatchesList } from '../../components/PlayerProfileComponents/PlayerProfileMatchesList/PlayerProfileMatchesList';
import { PlayerProfileWrapper } from '../../components/PlayerProfileComponents/PlayerProfileWrapper/PlayerProfileWrapper';
import { getPlayerStatistics } from '../../store/player/playerService';

export const PlayerProfilePage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const idSeason = searchParams.get('season');
    const idPlayer = searchParams.get('player');
    if (+idPlayer) {
      dispatch(getPlayerStatistics({ id: idPlayer, year_season_id: idSeason })).then((res) => {
        const visitedList = localStorage.getItem('visited_list');

        if (visitedList) {
          if (window.location.href.split('/player')[1]) {
            const visitedListArr = JSON.parse(visitedList);
            const newVisitedListArr = [
              {
                date: new Date().toLocaleDateString('zh-Hans-CN'),
                href: `/player${window.location.href.split('/player')[1]}`,
                id: Date.now(),
                title: `${res.payload.player.display_name} ${res.payload.year_season}`,
              },
              ...visitedListArr,
            ];
            localStorage.setItem('visited_list', JSON.stringify(newVisitedListArr));
          }
        } else if (window.location.href.split('/player')[1]) {
          const newVisitedListArr = [
            {
              date: new Date().toLocaleDateString('zh-Hans-CN'),
              href: `/player${window.location.href.split('/player')[1]}`,
              id: Date.now(),
              title: `${res.payload.player.display_name} ${res.payload.year_season}`,
            },
          ];
          localStorage.setItem('visited_list', JSON.stringify(newVisitedListArr));
        }
      });
    }
  }, [dispatch, searchParams]);

  return (
    <PlayerProfileWrapper>
      <PlayerProfileMatchesList />
    </PlayerProfileWrapper>
  );
};
