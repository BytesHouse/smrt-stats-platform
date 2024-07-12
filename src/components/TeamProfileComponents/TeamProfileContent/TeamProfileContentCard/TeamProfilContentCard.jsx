import { TeamProfileTabs } from '../TeamProfileTabs/TeamProfileTabs';
import cls from './TeamProfilContentCard.module.css';

export const TeamProfilContentCard = ({ children, disclosed }) => (
  <section
    className={cls.contentCard}
    // style={{ width: disclosed ? 'calc(100% - 850px)' : 'calc(100% - 368px)' }}
  >
    <TeamProfileTabs />
    <div className={cls.contentPage}>{children}</div>
  </section>
);
