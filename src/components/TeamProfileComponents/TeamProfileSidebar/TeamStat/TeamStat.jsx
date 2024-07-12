import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import { TeamStatItem } from './TeamStatItem';
import cls from './TeamStat.module.css';
import { Skeleton } from '../../../ui';

export const TeamStat = ({ show }) => {
  const { t } = useTranslation();
  const l = useLexicon();
  const matches = useSelector((state) => state.team.teamStatistic?.matches_list);
  const loading = useSelector((state) => state.team.loadingTeamStatistic);

  /* функционал ниже мигрировал в компонент TeamInfo */

  /*   const stats = useSelector((state) => state.team.teamStatistic); */
  /*   const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [selectedSeason, setSelectedSeason] = useState('');
  const [firstRender, setFirstRender] = useState(true); */

  /*   const idTeam = useMemo(() => {
    const searchTeamId = searchParams.get('team');
    if (id || searchTeamId) {
      return id || searchTeamId;
    }
    return null;
  }, [id, searchParams]);

  useEffect(() => {
    if (stats?.year_season) {
      setSelectedSeason(stats.year_season);
    }
  }, [stats])

  useEffect(() => {
    if (stats?.available_seasons) {
      const season = stats.available_seasons.filter((item) => item.years === stats.year_season);
      season.length > 0 && searchParams.set('season', season[0].id)
      // setSearchParams(searchParams)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stats])

  const onChangeSeason = (e) => {
    const idSeason = e.target.options[e.target.selectedIndex].dataset.value;
    const { value } = e.target
    if (idTeam) {
      setSelectedSeason(value)
      dispatch(getTeamStatistics({ id: idTeam, year_season_id: idSeason }))
      dispatch(getMatchesStatistics({ id: idTeam, year_season_id: idSeason }))
      searchParams.set('season', idSeason)
      setSearchParams(searchParams)
    }
  } */

  return (
    <article className={`${cls.statistic}${show ? ` ${cls.show}` : ''}`}>

      {/* разметка ниже мигрировала в компонент TeamInfo */}

      {/*       <header className={cls.statheader}>
        <span>{l(325)}:</span>
        <select onChange={onChangeSeason} value={selectedSeason} className={cls.playerSeasonSelect}>
          {stats?.available_seasons?.length > 0 ? (
            <>
              {stats.available_seasons.map((season) => (
                <option
                  key={season.id}
                  value={season.years}
                  data-value={season.id}
                >
                  {season.years}
                </option>
              ))}
            </>
          ) : <option disabled>No available seasons</option>}
        </select>
      </header> */}
      <div className={cls.listMatches}>
        {loading ? <Skeleton width='470px' height='100%' /> : (
          <>
            {matches?.length > 0 ? (
              <>
                {matches.map((item) => <TeamStatItem key={item.id} match={item} />)}
              </>
            ) : <b style={{ width: '470px' }}>{l(315)}</b>}
          </>
        )}

      </div>
    </article>
  );
};
