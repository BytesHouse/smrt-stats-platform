/* eslint-disable */
import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { Skeleton } from '../../../ui';
import cls from './TeamInfo.module.css';
import smrtPlaceholder from '../../../../images/smrt_placeholder.jpg';
import { StatItem } from './StatItem';
import { getMatchesStatistics, getTeamStatistics } from '../../../../store/team/teamService';

export const TeamInfo = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { id } = useParams();
  const loading = useSelector((state) => state.team.loadingTeamStatistic);
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const stat = useSelector((state) => state.team.teamStatistic);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSeason, setSelectedSeason] = useState('');
  const navigate = useNavigate();
  const l = useLexicon();
  const teamLogo = useMemo(() => {
    if (team?.logo) {
      return team.logo;
    }
    return smrtPlaceholder;
  }, [team]);

  const idTeam = useMemo(() => {
    const searchTeamId = searchParams.get('team');
    if (id || searchTeamId) {
      return id || searchTeamId;
    }
    return null;
  }, [id, searchParams]);

  useEffect(() => {
    if (stat?.year_season) {
      setSelectedSeason(stat.year_season);
    }
  }, [stat])

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
  }

  useEffect(() => {
    if (stat?.available_seasons) {
      const season = stat.available_seasons.filter((item) => item.years === stat.year_season);
      season.length > 0 && searchParams.set('season', season[0].id)
      // setSearchParams(searchParams)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stat])

  // список лексик для статистики из сервиса,
  const arrStatistics = [l(102), l(103), l(102), l(105), l(106), l(107), l(17), l(47), l(108)];
  // имена полей статистики сейчас выводим из ключей обьекта STAT
  // console.log(stat?.statistics.fillter((item) => ))
  // const keys = Object.keys(stat?.statistics);
  // const values = Object.values(stat?.statistics);
  // console.log(keys)
  return (
    <div className={cls.teamInfoWrapper}>
      <header className={cls.statheader}>
      <span>{l(99)}</span>
        <select onChange={onChangeSeason} value={selectedSeason} className={cls.playerSeasonSelect}>
          {stat?.available_seasons?.length > 0 ? (
            <>
              {stat.available_seasons.map((season) => (
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
      </header>
      <article className={cls.teamInfoContainer}>
        {loading ? (
          <Skeleton width={258} height={200} />
        ) : (
          <img
          // eslint-disable-next-line no-return-assign
            onError={(e) => (e.target.src = smrtPlaceholder)}
            src={teamLogo}
            alt='team logo'
          />
        )}

        <Link className={cls.teamInfoContainerLink} to={`/team/${team?.id}`}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <h3
            onClick={() => team?.id && navigate(`/team/${team?.id}`)}
          >
            {loading ? <Skeleton width={159} height={34} /> : team?.name}
          </h3>
        </Link>
        <div>
          <h4>{l(120)}</h4>
          <ul>
            {loading ? (
              <Skeleton width={258} height={400} />
            ) : (
              <>
                <li className={cls.underline}>{l(100)}</li>
                {stat?.matches_played?.length > 0 ? (
                  <>
                    {stat.matches_played.map((item, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                      <li key={idx}>
                        {item.competition__name} ({item.title}):{' '}
                        {item.matches_count}
                      </li>
                    ))}
                  </>
                ) : (
                  <li>-</li>
                )}
                <li className={cls.underline}>{l(101)}</li>
                {stat?.statistics
              && Object.entries(stat?.statistics).length > 0 ? (
                <>
                      {Object.entries(stat.statistics).map(([key, value]) => (
                    <StatItem key={key} field={key} value={value} />
                  ))}
                    </>
                  ) : (
                    <li>-</li>
                  )}
              </>
            )}
          </ul>
        </div>
      </article>
    </div>
  );
};
