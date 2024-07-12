import { PlayerProfileTabs } from '../PlayerProfileTabs/PlayerProfileTabs';
import cls from './PlayerProfileContentCard.module.css';

export const PlayerProfileContentCard = ({ children, disclosed }) => (
  <section
    className={cls.contentCard}
    style={{ width: disclosed ? 'calc(100% - 720px)' : 'calc(100% - 350px)' }}
  >
    <PlayerProfileTabs />
    <div className={cls.contentPage}>{children}</div>
  </section>
);
