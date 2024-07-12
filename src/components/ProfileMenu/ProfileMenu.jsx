import { useLexicon } from 'lib/hooks/useTranslates';
import React from 'react';

const ProfileMenu = () => {
  const l = useLexicon();
  return (
    <article className='ProfileMenu'>
      <div className='ProfileMenu__container'>
        <button
          type='button'
          className='ProfileMenu__button'
        >{l(116)}
        </button>
        <button
          type='button'
          className='ProfileMenu__button'
        >{l(117)}
        </button>
        <button
          type='button'
          className='ProfileMenu__button'
        >{l(9)}
        </button>
      </div>
      <button
        type='button'
        className='ProfileMenu__button-video'
      >{l(338)}
      </button>
    </article>
  )
}
export default ProfileMenu;
