import { useState } from 'react'
import Header from '../../Header/Header'
import { TeamProfilContentCard } from '../TeamProfileContent/TeamProfileContentCard/TeamProfilContentCard'
import { TeamProfileSidebar } from '../TeamProfileSidebar/TeamProfileSidebar'
import cls from './TeamProfileWrapper.module.css';

export const TeamProfileWrapper = ({ children }) => {
  const [disclosed, setDisclosed] = useState(false);

  return (
    <>
      <Header />
      <section className={cls.container}>
        <TeamProfileSidebar
          disclosed={disclosed}
          setDisclosed={setDisclosed}
        />
        <TeamProfilContentCard disclosed={disclosed}>
          {children}
        </TeamProfilContentCard>
      </section>
    </>
  )
}

