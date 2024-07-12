import { useState } from 'react';
import Header from '../../Header/Header';
import { PlayerProfileContentCard } from '../PlayerProfileContentCard/PlayerProfileContentCard';
import { PlayerProfileSidebar } from '../PlayerProfileSidebar/PlayerProfileSidebar';
import cls from './PlayerProfileWrapper.module.css';

export const PlayerProfileWrapper = ({ children }) => {
  const [disclosed, setDisclosed] = useState(false);
  return (
    <>
      <Header />
      <section className={cls.container}>
        <PlayerProfileSidebar
          disclosed={disclosed}
          setDisclosed={setDisclosed}
        />
        <PlayerProfileContentCard
          disclosed={disclosed}
        >
          {children}
        </PlayerProfileContentCard>
      </section>
    </>
  )
}
