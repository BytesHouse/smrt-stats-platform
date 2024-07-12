import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import { MatchCard } from '../../MatchCard';
import cls from './TeamStatistics.module.css'

export const TeamStatistics = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  return (
    <article className={cls.teamStatistics}>
      <div className={cls.teamStatisticsTitle}>{l(325)}</div>
      <MatchCard />
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <button
        type='button'
        className={cls.moreMatchesButton}
      />
    </article>

  );
}

export default TeamStatistics;
