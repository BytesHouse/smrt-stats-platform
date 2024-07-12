// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import { TournamentWrapper } from 'components/TournamentComponents/TournamentWrapper/TournamentWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics } from 'store/tournament/tournamentService';
import { TournamentTeamsTable } from 'components/TournamentComponents/TournamentTeamsTable/TournamentTeamsTable';

export const TournamentTeamsPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const tournamentId = useSelector((state) => state.tournament.tournamentId)

  useEffect(() => {
    tournamentId !== +id && dispatch(getStatistics({ id, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TournamentWrapper>
      <TournamentTeamsTable />
    </TournamentWrapper>
  )
};
