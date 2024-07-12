import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import PlayerCard from '../../components/PlayerCard/PlayerCard';
import PlayerMatchesData from '../../components/PlayerMatchesData/PlayerMatchesData';
import PlayerStatistics from '../../components/PlayerStatistics/PlayerStatistics';

const PlayerProfile = () => (
  <>
    <Header />
    <section className='PlayerProfile'>
      <div className='PlayerProfile__green-background-left'>
        <PlayerCard />
        <PlayerStatistics />
      </div>
      <div className='PlayerProfile__container'>
        <div className='PlayerProfile__buttons-container'>
          <Link className='PlayerProfile__matces-button' to='/matches'>MATCHES</Link>
          <Link className='PlayerProfile__events-button' to='/player-events'>EVENTS</Link>
        </div>
        <div className='PlayerProfile__green-background-right'>
          <div className='PlayerProfile__white-background'>
            <div className='PlayerMatchesData__title'>MATCHES</div>
            <PlayerMatchesData />
          </div>
        </div>
      </div>
    </section>
  </>
)

export default PlayerProfile;
