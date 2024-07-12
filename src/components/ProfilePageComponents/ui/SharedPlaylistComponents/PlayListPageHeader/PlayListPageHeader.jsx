import React, {
  useState,
  useEffect,
  useRef,
} from 'react'
// import { useDispatch } from 'react-redux';
// import { createPlaylist } from '../../../../../store/playlist/playlistService';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './PlayListPageHeader.module.css';

const PlayListAddComponent = () => {
  // const dispatch = useDispatch()
  const [acitve, setActive] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const playlistNameRef = useRef('');
  const l = useLexicon();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Enter') {
        // dispatch(createPlaylist(
        // { token: localStorage.getItem('token'), title: playlistNameRef.current }))
        setPlaylistName('');
        playlistNameRef.current = '';
        setActive(false)
      } else if (e.code === 'Escape') {
        setPlaylistName('');
        playlistNameRef.current = '';
        setActive(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])

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

export const PlayListPageHeader = ({ handleChangeSort }) => {
  const l = useLexicon();
  return (
    <div className={cls.playListPageHeader}>
      <button
        type='button'
        onClick={() => handleChangeSort('by_date')}
        className={cls.greenPlaylistButton}
      >{l(132)}
      </button>
      <button
        type='button'
        onClick={() => handleChangeSort('by_title_asc')}
        className={cls.bluePlaylistButton}
      >
        A <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z' /></svg> Z
      </button>
      <button
        type='button'
        onClick={() => handleChangeSort('by_title_desc')}
        className={cls.bluePlaylistButton}
      >
        Z <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z' /></svg> A
      </button>
      {/* <PlayListAddComponent /> */}
    </div>
  )
}
