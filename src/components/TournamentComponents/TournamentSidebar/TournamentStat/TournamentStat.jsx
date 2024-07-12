/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useNavigate, useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getStatistics } from 'store/tournament/tournamentService';
import { tournamentActions } from 'store/tournament/tournamentSlice';
import cls from './TournamentStat.module.css';
import { Skeleton } from '../../../ui';
import { TournamentStatItem } from './TournamentStatItem';

export const TournamentStat = ({ show }) => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const navigate = useNavigate();
  const tournament = useSelector((state) => state.tournament.tournaments);
  const loading = useSelector((state) => state.tournament.loadingTournaments);
  const loadingPaginate = useSelector((state) => state.tournament.paginateLoading);
  const select = tournament.available_seasons?.find((item) => item.id === +id)
  const [selectedSeason, setSelectedSeason] = useState(id);
  const { competition, matches } = tournament;

  const onChangeSeason = (e) => {
    const idSeason = e.target.options[e.target.selectedIndex].dataset.value;
    const { value } = e.target
    setSelectedSeason(value)
    dispatch(getStatistics({ id: idSeason, page: 1 }))
    dispatch(tournamentActions.setLoadingFalse())
    navigate(`/tournament/matches/${idSeason}`)
  }
  return (
    <article className={`${cls.statistic}${show ? ` ${cls.show}` : ''}`}>
      <header className={cls.statheader}>
        <span>Season</span>
        <select onChange={onChangeSeason} value={selectedSeason} className={cls.playerSeasonSelect}>
          {tournament?.available_seasons?.length > 0 ? (
            <>
              {tournament.available_seasons.map((season) => (
                <option
                  key={season.id}
                  value={season.id}
                  data-value={season.id}
                >
                  {season.year_season.years}
                </option>
              ))}
            </>
          ) : <option disabled>No available seasons</option>}
        </select>
      </header>
      <div className={cls.listMatches}>
        {loading || loadingPaginate ? <Skeleton width='100%' height='100%' /> : (
          <>
            {matches?.length > 0 ? (
              <>
                {matches.map((item) => <TournamentStatItem title={competition.name} key={item.id} match={item} />)}
              </>
            ) : <b>No matches</b>}
          </>
        )}

      </div>
    </article>
  );
};

