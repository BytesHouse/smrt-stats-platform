import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import Header from '../../components/Header/Header';
import MatchesPopup from '../../components/MatchesPopup/MathcesPopup';
import MatchesStatistics from '../../components/MatchesStatistics/MatchesStatistics';
import PlayerCard from '../../components/PlayerCard/PlayerCard';

const Matches = () => {
  const [isMatchesPopupOpen, setIsMatchesPopupOpen] = useState(false);
  const [, setIsParametersPopupOpen] = useState(false);

  function closeAllPopups() {
    setIsMatchesPopupOpen(false)
    setIsParametersPopupOpen(false)
  }
  const l = useLexicon();
  return (
    <>
      <Header />
      <section className='Matches'>
        <div className='Matches__green-background-left'>
          <PlayerCard />
        </div>
        <div className='Matches__container'>
          <div className='Matches__buttons-container'>
            <Link className='Matches__matches-button' to='/player/matches/1'>MATCHES</Link>
            <Link className='Matches__events-button' to='/player/events/1'>EVENTS</Link>
          </div>
          <div className='Matches__green-background-right'>
            {/* <MatchesData /> */}
            <div className='Matches__white-background'>
              <div className='Matches__settings-container'>
                <button
                  type='button'
                  className='Matches__setting-button'
                  onClick={() => setIsMatchesPopupOpen(true)}
                >{l(12)}
                </button>
                <button
                  type='button'
                  className='Matches__setting-button'
                >{l(13)}
                </button>
                <button
                  type='button'
                  className='Matches__setting-button'
                >{l(14)}
                </button>
              </div>
              <MatchesStatistics />
              {/* eslint-disable-next-line react/jsx-no-bind */}
              <MatchesPopup isOpen={isMatchesPopupOpen} onClose={closeAllPopups} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Matches;
