import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cls from './MatchStatPlayersTable.module.css';

export const TDTableMatchStatItem = ({ player }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  useSelector((state) => state.team.teamStatistic?.team?.team_color);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const style = useMemo(() => ({
    backgroundColor: isHover ? '#BEFF4C' : 'transparent',
    color: isHover ? '#000' : '#fff',
    cursor: 'pointer',
  }), [isHover]);

  return (
    <tr
      onClick={() => navigate(`/player/${player.id}`)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ ...style }}
    >
      <td className={cls.tdStat}>{player.number}</td>
      <td className={cls.tdStat}>{player.display_name}</td>
      <td className={cls.tdStat}>{player?.statistics?.['Goals scored']}</td>
      <td className={cls.tdStat}>{player?.statistics?.Assists}</td>
      <td className={cls.tdStat}>{player?.statistics?.Mistakes}</td>
      <td className={cls.tdStat}>{player?.statistics?.['Yellow cards']}</td>
      <td className={cls.tdStat}>{player?.statistics?.['Red cards']}</td>
    </tr>
  )
}
