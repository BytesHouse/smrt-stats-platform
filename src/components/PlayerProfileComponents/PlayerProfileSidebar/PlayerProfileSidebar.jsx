import { PlayerInfo } from './PlayerInfo/PlayerInfo';
import cls from './PlayerProfileSidebar.module.css';
import { PlayerStat } from './PlayerStat/PlayerStat';

export const PlayerProfileSidebar = ({ disclosed, setDisclosed }) => {
  const toggleDisclose = () => {
    setDisclosed((prev) => !prev);
  };

  return (
    <aside
      className={`${cls.sidebarContanier}${
        disclosed ? ` ${cls.disclosed}` : ''
      }`}
    >
      <PlayerInfo />
      <PlayerStat show={disclosed} />
      <div className={cls.discloseBtn} onClick={toggleDisclose}>
        {disclosed ? (
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
