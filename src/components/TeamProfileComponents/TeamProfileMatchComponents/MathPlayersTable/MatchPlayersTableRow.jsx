import React, { useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from './MatchPlayersTableRow.module.css';

export const MatchPlayersTableRow = ({ player }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const teamColor = useSelector((state) => state.team.teamStatistic?.team?.team_color);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const style = useMemo(() => {
    const colors = teamColor?.split(';');
    if (colors?.length > 0) {
      return {
        backgroundColor: isHover ? `rgba(${colors[1]}, 0.5)` : '',
        cursor: 'pointer',
      }
    }
    return {
      boxShadow: isHover ? 'inset -2px 1px 32px -2px #1774FF' : 'none',
      cursor: 'pointer',
    }
  }, [teamColor, isHover]);

  return (
    <a
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={style}
      className={cls.playersTableRow}
      onClick={() => navigate(`/player/${player.id}`)}
      href={`/player/${player.id}`}
    >
      <div>{player.number}</div>
      <div title={`${player.display_name}`}>{player.display_name}</div>
      <div>{player.position}</div>
      <div>{player.statistics?.Goal}</div>
      <div>{player.statistics?.Assist}</div>
      <div>{player.statistics?.Mistake}</div>
      <div>{player.statistics?.['Yellow Card']}</div>
      <div>{player.statistics?.['Red Card']}</div>
    </a>
  )
}
