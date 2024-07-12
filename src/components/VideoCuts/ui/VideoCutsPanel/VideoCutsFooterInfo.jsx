import React from 'react';
import { useLexicon } from 'lib/hooks/useTranslates';
import { useSelector } from 'react-redux';
import cls from './VideoCutsPanel.module.css';

export const VideoCutsFooterInfo = (props) => {
  const {
    countEpisode,
    countMatches,
    openAddPlayList,
  } = props;
  const l = useLexicon();
  const formationInfo = useSelector((state) => state.user.userProfile);
  const time =
    (formationInfo.offset_range_begin + formationInfo.offset_range_end) *
    countEpisode;
  let minutes = Math.floor(time / 60);
  let seconds = time - minutes * 60;
  let hours = Math.floor(time / 3600);

  if (minutes === 60) {
    minutes = '0';
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return (
    <footer
      className={cls.videoCutsFooterInfoContainer}
      style={openAddPlayList ? { opacity: '0.1' } : {}}
    >
      <div className={cls.videoCutsFooterPlayCircleWrapper}>
        <div className={cls.videoCutsFooterPlayCircle}>
          <svg
            width={8}
            height={8}
            xmlns='http://www.w3.org/2000/svg'
            fill='#B4EB54'
            viewBox='0 0 24 24'
            strokeWidth={1}
            stroke='#B4EB54'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
            />
          </svg>
        </div>
        <span>
          {countEpisode} {l(9)}
        </span>
      </div>
      <div>
        {countMatches} {l(7)}
      </div>
      <div>{`${hours}:${minutes}:${seconds}`}</div>
    </footer>
  );
};
