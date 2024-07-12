import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './MatchCard.module.css'

export const MatchCard = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  return (
    <div className={cls.container}>
      <p className={cls.teamName}>Zhejiang Professional FC</p>
      <p className={cls.score}>1:2</p>
      <p className={cls.teamName}>Shandong Taishan</p>
      <div className={cls.bottomContainer}>
        <p className={cls.date}>2023-01-15</p>
        <p className={cls.competition}>{t('matches_played_china')}</p>
      </div>
      <div className={cls.buttonContainer}>
        <button
          type='button'
          className={cls.button}
        >{l(117)}
        </button>
        <button
          type='button'
          className={cls.button}
        >{l(326)}
        </button>
        <button
          type='button'
          className={cls.button}
        >{t('goals_plus_assists')}
        </button>
        <button
          type='button'
          className={cls.button}
        >{l(17)}
        </button>
      </div>
    </div>
  );
}

export default MatchCard;
