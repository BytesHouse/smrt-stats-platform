/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useRef,
} from 'react'
import { useLexicon } from 'lib/hooks/useTranslates';
import { useDispatch } from 'react-redux';
import { getFavorites } from 'store/favorites/favoritesService';
import { favoritesActions } from 'store/favorites/favoritesSlice';
import cls from './FavoritesPageHeader.module.css';

const PlayListAddComponent = () => {
  const [acitve, setActive] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const playlistNameRef = useRef('');
  const l = useLexicon();

  useEffect(() => {
    playlistNameRef.current = playlistName;
  }, [playlistName])

  return (
    <>
      {acitve ? (
        <input
          onChange={(e) => setPlaylistName(e.target.value)}
          value={playlistName}
          className={cls.addPlaylistInput}
          type='text'
        />
      ) : (
        <button
          type='button'
          className={cls.greenPlaylistButton}
          onClick={() => setActive(true)}
        >
          {l(133)}
        </button>
      )}
    </>
  )
}

export const FavoritesPageHeader = () => {
  const dispatch = useDispatch();
  const [activeBtn, setActiveBtn] = useState('-created_at');
  const l = useLexicon();
  const handleClickSort = (sort) => {
    if (sort === activeBtn) return
    dispatch(getFavorites({ sort }));
    setActiveBtn(sort)
    dispatch(favoritesActions.setSort(sort))
  }
  const handleClickSortToggle = () => handleClickSort(activeBtn === 'created_at' ? '-created_at' : 'created_at');
  return (
    <div className={cls.FavoritesPageHeader}>
      <button
        type='button'
        onClick={handleClickSortToggle}
        className={cls.greenPlaylistButton}
        style={activeBtn === '-created_at' ? { background: 'var(--main-sky-blue)', color: 'var(--main-navy-blue)' } : { background: 'var(--main-midnight-blue)' }}
      >{l(132)}
      </button>
      <button
        type='button'
        onClick={() => handleClickSort('player__surname')}
        className={cls.bluePlaylistButton}
        style={activeBtn === 'player__surname' ? { background: 'var(--main-sky-blue)', color: 'var(--main-navy-blue)' } : { background: 'var(--main-midnight-blue)' }}
      >
        A
        <svg
          fill={activeBtn === 'player__surname' ? 'var(--main-navy-blue)' : 'var(--main-whitesmoke)'}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z' />
        </svg> Z
      </button>
      <button
        type='button'
        onClick={() => handleClickSort('-player__surname')}
        className={cls.bluePlaylistButton}
        style={activeBtn === '-player__surname' ? { background: 'var(--main-sky-blue)', color: 'var(--main-navy-blue)' } : { background: 'var(--main-midnight-blue)' }}
      >
        Z
        <svg
          fill={activeBtn === '-player__surname' ? 'var(--main-navy-blue)' : 'var(--main-whitesmoke)'}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z' />
        </svg>
        A
      </button>
      {/* <PlayListAddComponent /> */}
    </div>
  )
}

