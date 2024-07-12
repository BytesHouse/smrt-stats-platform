import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { PlayerProfileMatchesTable } from '../../components/PlayerProfileComponents/PlayerProfileMatchesTable/PlayerProfileMatchesTable';
import { PlayerProfileWrapper } from '../../components/PlayerProfileComponents/PlayerProfileWrapper/PlayerProfileWrapper';
import { getPlayerStatisticMatches, getPlayerStatistics } from '../../store/player/playerService';

export const PlayerProfileMatchesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('season')) {
      // searchParams.set('season', 133)
      // setSearchParams(searchParams)
    }
  }, [])

  useEffect(() => {
    const idSeason = searchParams.get('season');
    if (+id) {
      dispatch(getPlayerStatistics({ id, year_season_id: idSeason }));
      dispatch(getPlayerStatisticMatches({ id, year_season_id: idSeason }));
    }
  }, [searchParams, dispatch, id]);

  return (
    <PlayerProfileWrapper>
      <PlayerProfileMatchesTable />
    </PlayerProfileWrapper>
  );
};
