import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './TeamPlayersData.module.css'

export const TeamPlayersData = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  return (
    <article className={cls.teamPlayersData}>
      <img className={cls.flagImg} src='https://img.freepik.com/premium-photo/china-flag-chinese-flag-waving-on-background-national-symbol-of-the-country_216606-93.jpg' alt='flag' />
      <img className={cls.playerImg} src='https://img.a.transfermarkt.technology/portrait/big/143068-1488970310.jpg?lm=1' alt='player' />
      <p className={cls.playerName}>Dalei Wang</p>
      <p className={cls.playerAgeTitle}>{l(327)}</p>
      <p className={cls.playerAge}>34</p>
      <p className={cls.playerPositionTitle}>{l(11)}</p>
      <p className={cls.playerPosition}>GK</p>
    </article>

  );
}

export default TeamPlayersData;
