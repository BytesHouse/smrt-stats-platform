import React from 'react';
import { Link } from 'react-router-dom';
import { EventsField } from '../../components/EventsField/ui/EventsField';
import { EventsTable } from '../../components/EventsTable/ui/EventsTable';
import Header from '../../components/Header/Header';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import cls from './PlayerEvents.module.css'

export const PlayerEvents = () => (
  <>
    <Header />
    <section className={cls.playerEvents}>
      <div className={cls.greenBackgroundLeft}>
        <PlayerCard />
      </div>
      <div className={cls.container}>
        <div className={cls.buttonsContainer}>
          <Link className={cls.matchesButton} to='/player/matches/1'>MATCHES</Link>
          <Link className={cls.eventsButton} to='/player/events/1'>EVENTS</Link>
        </div>
        <div className={cls.greenBackgroundRight}>
          <div className={cls.whiteBackground}>
            <div className={cls.blackBackground}>
              <EventsTable />
              <EventsField />
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
