// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import React, { useEffect } from 'react';
import { TournamnetMatchesTable } from 'components/TournamentComponents/TournamentMatchesTable/TournamentMatchesTable';
import { TournamentWrapper } from 'components/TournamentComponents/TournamentWrapper/TournamentWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { getStatistics } from 'store/tournament/tournamentService';

export const TournamentMatchesPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const tournamentId = useSelector((state) => state.tournament.tournamentId)

  useEffect(() => {
    tournamentId !== +id && dispatch(getStatistics({ id, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <TournamentWrapper>
      <TournamnetMatchesTable />
    </TournamentWrapper>
  )
};
