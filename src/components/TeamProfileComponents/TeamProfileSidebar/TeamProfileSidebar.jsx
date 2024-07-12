import React, { useState } from 'react';
// import { useSelector } from "react-redux";
import { TeamInfo } from './TeamInfo/TeamInfo';
import cls from './TeamProfileSidebar.module.css';
import { TeamStat } from './TeamStat/TeamStat';

export const TeamProfileSidebar = ({ disclosed, setDisclosed }) => {
  // const teamColor = useSelector(state => state.team.teamStatistic?.team?.team_color);

  // const sideBarStyles = useMemo(() => {
  //   if (Boolean(teamColor) && teamColor?.split(';').length > 0) {
  //     const colors = teamColor.split(';');
  //     return {
  //       background: `rgb(${colors[0]})`,
  //       border: `1px solid rgb(${colors[0]})`,
  //     };
  //   } else {
  //     return {
  //       background: `#0F1521`,
  //       boxShadow: `inset -6px -12px 40px 8px #1774FF`,
  //       border: `1px solid #0F1521`,
  //     };
  //   }
  // }, [teamColor]);

  const toggleDisclose = () => {
    setDisclosed((prev) => !prev);
  };

  return (
    <aside
      // style={sideBarStyles}
      className={`${cls.sidebarContanier}${disclosed ? ` ${cls.disclosed}` : ''
      }`}
    >
      <TeamInfo />
      <TeamStat show={disclosed} />
      <div className={cls.discloseBtn} onClick={toggleDisclose}>
        {disclosed ? (
          <svg
            style={{ position: 'absolute' }}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z' />
          </svg>
        ) : (
          <svg
            style={{ position: 'absolute' }}
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' />
          </svg>
        )}
      </div>
    </aside>
  );
};
