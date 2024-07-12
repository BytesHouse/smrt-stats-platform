import React from 'react';
import { TournamentTabs } from '../TournamentTabs/TournamentTabs';
import cls from './TournamentContentCard.module.css';

export const TournamnetContentCard = ({ children }) => (
  <section className={cls.contentCard}>
    <TournamentTabs />
    <div className={cls.contentPage}>{children}</div>
  </section>
);
