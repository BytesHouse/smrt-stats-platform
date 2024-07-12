/* eslint-disable react/jsx-indent-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './CompetitionTab.module.css';
import { getSeasonById } from '../../../store/season/seasonService';
import { CompetitionTeam } from '../CompetitionTeam/CompetitionTeam';
import { Spinner } from '../../ui';

export const DEFAULT_LOGO =
  'https://archive.org/download/no-photo-available/no-photo-available.png';

const CompetitionTab = React.forwardRef(({ item }, ref) => {
  const dispatch = useDispatch();
  const [seasonData, setSeasonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const l = useLexicon();
  const handleClick = async (season_id) => {
    setOpenTab((prev) => !prev);
    if (openTab) return;

    try {
      setIsLoading(true);
      const response = await dispatch(getSeasonById(season_id));
      setSeasonData(response.payload);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching season data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getLastSeasonId = (seasons) => {
    const seasonIds = seasons?.map((curSeason) => curSeason.id);
    return seasonIds[0]
  };

  const [openTab, setOpenTab] = useState(false);
  const competitionBody = (
    <>
      <div className={cls.container}>
        <img
          className={cls.flag}
          src={item.country?.flag ?? DEFAULT_LOGO}
          alt='flag'
        />
        <img className={cls.logo} src={item.logo ?? DEFAULT_LOGO} alt='logo' />
        <p className={cls.title}>{item.name}</p>
      </div>
      <div className={cls.btnWrapper}>
        <Link
          to={`/tournament/matches/${item?.seasons[0]?.id}`}
          className={cls.link}
        >
          {l(420)}
        </Link>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button type='button' className={cls.button} />
      </div>
    </>
  );
  const content = ref ? (
    <article
      ref={ref}
      className={cls.article}
      onClick={() => handleClick(getLastSeasonId(item?.seasons))}
    >
      {competitionBody}
    </article>
  ) : (
    <article
      className={cls.article}
      onClick={() => handleClick(getLastSeasonId(item?.seasons))}
    >
      {competitionBody}
    </article>
  );

  return (
    item?.seasons && (
      <>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        {content}
        {openTab &&
          (seasonData?.teams?.length ? (
            seasonData?.teams.map((team) => (
              <CompetitionTeam team={team} key={team.id} />
            ))
          ) : (
            <div className={cls.noData}>{isLoading ? <Spinner /> : l(317)}</div>
          ))}
      </>
    )
  );
});

export default CompetitionTab;
