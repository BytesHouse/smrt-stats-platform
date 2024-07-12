/* eslint-disable no-param-reassign */
import React, { useState, useMemo } from 'react';
// import { useSelector } from "react-redux";
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './PlayerProfileMatchItem.module.css';
import smrtPlaceholder from '../../../images/smrt_placeholder.jpg';

export const PlayerProfileMatchItem = ({ match }) => {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();
  const team = useSelector((state) => state.player.playerStatistic.player.team);
  // const [isHover, setIsHover] = useState(false);
  // const teamColor = useSelector(
  //   (state) => state.player.playerStatistic?.player?.team_color
  // );
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const l = useLexicon();
  const idPlayer = useMemo(() => {
    const searchPlayerId = searchParams.get('player');
    if (id || searchPlayerId) {
      return id || searchPlayerId;
    }
    return null;
  }, [id, searchParams]);

  // const handleMouseEnter = () => {
  //   setIsHover(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHover(false);
  // };

  // const style = useMemo(() => {
  //   const colors = teamColor?.split(";");
  //   if (colors?.length > 0) {
  //     return {
  //       boxShadow: isHover
  //         ? `0px 4px 6px rgba(0, 0, 0, 0.7), inset 4px -1px 9px 4px rgb(${colors[1]})`
  //         : "none",
  //     };
  //   }
  //   return {
  //     boxShadow: isHover ? `inset -2px 1px 32px -2px #1774FF` : "none",
  //   };
  // }, [teamColor, isHover]);

  const navigateToMatch = () => {
    if (team?.id && match?.id) {
      navigate(`/team/match/mistakes?team=${team.id}&match=${match.id}`);
    }
  };

  const navigateToEvents = (e) => {
    e.stopPropagation()
    navigate(searchParams.get('season') ? `/player/events/?player=${idPlayer}&season=${searchParams.get('season')}` : `/player/events/?player=${idPlayer}`)
  }

  function fetchFile(url) {
    if (url) {
      const tempUrl = url
      const aTag = document.createElement('a');
      aTag.href = tempUrl;
      // eslint-disable-next-line
      aTag.download = url.replace(/^.*[\\\/]/, '');
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(tempUrl);
      aTag.remove()
      // eslint-disable-next-line no-alert
    } else (alert('No video to download'))
  }

  return (
    <div
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // style={style}
      className={cls.matchItemWrapper}
      title={`${match?.home_team} ${match?.score} ${match?.away_team} ${match?.competition}`}
    >
      <div className={cls.matchItem} onClick={() => setOpened((prev) => !prev)}>
        <div className={cls.matchItemLogos}>
          <img
            // eslint-disable-next-line no-return-assign
            onError={(e) => (e.target.src = smrtPlaceholder)}
            src={match?.home_team_logo ? match.home_team_logo : smrtPlaceholder}
            alt='home logo'
          />
          <img
            // eslint-disable-next-line no-return-assign
            onError={(e) => (e.target.src = smrtPlaceholder)}
            src={match?.away_team_logo ? match.away_team_logo : smrtPlaceholder}
            alt='away logo'
          />
          <span>
            {match?.home_team} {match?.score} {match?.away_team}{' '}
            {match?.competition}
          </span>
        </div>
        <div style={{
          alignItems: 'center',
          display: 'flex',
          gap: 100,
        }}
        >
          <div>{match?.date?.split('T')[0]}</div>
          {opened ? (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path d='M12 8l6 6H6z' />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
            >
              <path fill='none' d='M0 0h24v24H0z' />
              <path d='M12 16l-6-6h12z' />
            </svg>
          )}
        </div>
      </div>

      {opened && (
        <div className={cls.matchItemActionBtns}>
          <div>
            <button
              type='button'
              onClick={() => fetchFile(match.videos?.[0]?.link)}
            >{l(116)}
            </button>
            <button
              type='button'
              onClick={() => team?.id
                && navigate(
                  `/team/match/?team=${team?.id}&match=${match?.id}`,
                )}
            >
              {l(117)}
            </button>
            <button
              type='button'
              onClick={(e) => navigateToEvents(e)}
            >{l(9)}
            </button>
          </div>
          <button
            type='button'
            onClick={() => navigateToMatch()}
          >
            {l(118)}
          </button>
        </div>
      )}
    </div>
  );
};
