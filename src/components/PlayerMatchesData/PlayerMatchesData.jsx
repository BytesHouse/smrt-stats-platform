import React, { useState } from 'react';
import { useLexicon } from 'lib/hooks/useTranslates';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const PlayerMatchesData = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const l = useLexicon();
  return (
    <article className='PlayerMatchesData'>
      <div className='PlayerMatchesData__content'>
        <div className='PlayerMatchesData__image-container'>
          <img
            className='PlayerMatchesData__team-image'
            src='https://upload.wikimedia.org/wikipedia/ru/thumb/7/75/FC_Krasnodar_Logo.svg/1200px-FC_Krasnodar_Logo.svg.png'
            alt='team'
          />
          <img
            className='PlayerMatchesData__team-image'
            src='https://upload.wikimedia.org/wikipedia/ru/thumb/7/75/FC_Krasnodar_Logo.svg/1200px-FC_Krasnodar_Logo.svg.png'
            alt='team'
          />
        </div>
        <div className='PlayerMatchesData__events-container'>
          <p className='PlayerMatchesData__match-name'>{l(10)}</p>
          <p className='PlayerMatchesData__date'>{l(121)}</p>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type='button'
            className='PlayerMatchesData__button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
      {isMenuOpen ? <ProfileMenu /> : null}
    </article>
  );
}

export default PlayerMatchesData;
