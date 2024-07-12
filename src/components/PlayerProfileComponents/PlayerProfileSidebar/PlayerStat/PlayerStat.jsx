import React, {
  useMemo,
  useState,
  useEffect,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { getPlayerStatistics } from '../../../../store/player/playerService';
import cls from './PlayerStat.module.css';
import { ListStatsItem } from '../ListStatsItem/ListStatsItem';

export const PlayerStat = ({ show }) => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.player.playerStatistic);
  const loading = useSelector((state) => state.player.loadingPlayerStatistic);
  /*   const [selectedSeason, setSelectedSeason] = useState(''); */
  const l = useLexicon();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  /* функции ниже мигрировали в PlayerInfo */

  /*   const idPlayer = useMemo(() => {
    const searchPlayerId = searchParams.get('player');
    if (id || searchPlayerId) {
      return id || searchPlayerId;
    }
    return null;
  }, [id, searchParams]);

  useEffect(() => {
    if (stats?.year_season) {
      setSelectedSeason(stats.year_season);
    }
  }, [stats])

  const onChangeSeason = (e) => {
    const idSeason = e.target.options[e.target.selectedIndex].dataset.value;
    const { value } = e.target
    if (idPlayer) {
      setSelectedSeason(value)
      dispatch(getPlayerStatistics({ id: idPlayer, year_season_id: idSeason }))
      searchParams.set('season', idSeason)
      setSearchParams(searchParams)
    }
  } */
  return (
    <article className={`${cls.statistic}${show ? ` ${cls.show}` : ''}`}>

      {/* разметка ниже мигрировала в PlayerInfo */}

      {/*       <header className={cls.statheader}>
        <span>{l(99)}</span>
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
      <div className={cls.listStats}>
        {
          loading ? <div className={cls.listStatsItem}>{l(312)}</div> : (
            <>
              <div className={cls.listStatsItem}>
                <div className={cls.statTitle}>{l(100)}</div>
                {stats?.matches_played?.length > 0 ? (
                  <>
                    {stats.matches_played.map((item) => (
                      <div
                        className={cls.listStatsItemStat}
                        key={`${item.competition__name}${item.title}`}
                      >
                        <span>
                          {item.competition__name}({item.title})
                        </span>
                        <span>{item.matches_count}</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className={cls.listStatsItemStat}>-</div>
                )}
              </div>
              <div className={cls.listStatsItem}>
                {/*                 <div className={cls
                .statTitle}>Minutes played per competition:</div>
                {stats?.minutes_played?.length > 0 ? (
                  <>
                    {stats.minutes_played.map((item) => {
                      return (
                        <div
                          className={cls.listStatsItemStat}
                          key={`${item.competition__name}${item.title}`}
                        >
                          <span>
                            {item.competition__name}({item.title})
                          </span>
                          <span>{item.minutes_count}</span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className={cls.listStatsItemStat}>-</div>
                )} */}
              </div>
              <div className={cls.listStatsItem}>
                <div className={cls.statTitle}>{l(101)}</div>
                {stats?.statistics ? (
                  <>
                    {Object.entries(stats.statistics).map(([key, value]) => (
                      <ListStatsItem key={key} field={key} value={value} />
                    ))}
                  </>
                ) : (
                  <div className={cls.listStatsItemStat}>-</div>
                )}
              </div>
            </>
          )
        }
      </div>
    </article>
  );
};

