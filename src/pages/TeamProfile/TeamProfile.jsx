import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import Header from '../../components/Header/Header';
import { TeamCard } from '../../components/TeamCard';
import { TeamPlayersData } from '../../components/TeamPlayersData';
import { TeamStatistics } from '../../components/TeamStatistics';
import cls from './TeamProfile.module.css'

const TeamProfile = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  return (
    <>
      <Header />
      <section className={cls.teamProfile}>
        <div className={cls.orangeBackgroundLeft}>
          <TeamCard />
          <TeamStatistics />
        </div>
        <div className={cls.container}>
          <div className={cls.buttonsContainer}>
            <Link className={cls.mathcesButton} to='#'>{l(6)}</Link>
            <Link className={cls.eventsButton} to='#'>{l(9)}</Link>
          </div>
          <div className={cls.yellowBackgroundRight}>
            <div className={cls.whiteBackground}>
              <div className={cls.title}>{l(5)}</div>
              <TeamPlayersData />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default TeamProfile;
