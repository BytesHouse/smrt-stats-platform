import React from 'react'
import { useSelector } from 'react-redux';
import { PaginationComponent } from 'components/ui/PaginationComponent/PaginationComponent';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLocation } from 'react-router';
import Header from '../../Header/Header'
import cls from './TournamentWrapper.module.css';
import { TournamentSidebar } from '../TournamentSidebar/TournamentSidebar';
import { TournamnetContentCard } from '../TournamentContentCard/TournamentContentCard';

export const TournamentWrapper = ({ children }) => {
  const matchesCount = useSelector((state) => state.tournament?.tournaments?.matches_count);
  const location = useLocation()
  const paginationLocation = location.pathname.includes('/matches');
  return (
    <>
      <Header />
      <section className={cls.container}>
        <TournamentSidebar />
        <TournamnetContentCard>
          {children}
          {paginationLocation && <PaginationComponent itemsPerPage={10} items={matchesCount} />}
        </TournamnetContentCard>
      </section>
    </>
  )
};
