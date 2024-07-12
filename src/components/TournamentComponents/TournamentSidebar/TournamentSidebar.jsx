import React, { useState } from 'react';
// import { useSelector } from "react-redux";
import cls from './TournamentSidebar.module.css';
import { TournamentInfo } from './TournamentInfo/TournamentInfo';
import { TournamentStat } from './TournamentStat/TournamentStat';

export const TournamentSidebar = () => {
  const [open, setOpen] = useState(false);

  const toggleDisclose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <aside
      // style={sideBarStyles}
      className={`${cls.sidebarContanier}${open ? ` ${cls.disclosed}` : ''
      }`}
    >
      <TournamentInfo />
      <TournamentStat show={open} />
      <div className={cls.discloseBtn} onClick={toggleDisclose}>
        {open ? (
          <svg
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
