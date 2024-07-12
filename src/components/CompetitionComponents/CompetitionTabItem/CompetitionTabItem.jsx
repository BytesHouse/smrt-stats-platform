import React, { useState } from 'react';
import { useLexicon } from 'lib/hooks/useTranslates';
import { CompetitionTeam } from '../CompetitionTeam/CompetitionTeam';

export const CompetitionTabItem = ({ info }) => {
  // eslint-disable-next-line
    const team = info
  const l = useLexicon();
  // eslint-disable-next-line
    const [openTeams, setOpenTeams] = useState(false);
  return (
    <>
      {/* <article className={cls.article} onClick={() => setOpenTeams((prev) => !prev)}> */}
      {/*    <div className={cls.container}> */}
      {/*        <img className={cls.flag} src={item?.country_flag ? item.country_flag : "https://archive.org/download/no-photo-available/no-photo-available.png"} alt="flag" /> */}
      {/*        <img className={cls.logo} src={item?.competition_logo ? item.competition_logo : "https://archive.org/download/no-photo-available/no-photo-available.png"} alt="logo" /> */}
      {/*        <p className={cls.title}>{info.title} {info.year_season}</p> */}
      {/*    </div> */}
      {/*    <button className={cls.button}></button> */}
      {/* </article> */}
      <>
        {info?.length > 0 ? (
          <>
            {openTeams
                && info.map(
                  (openTeam) => <CompetitionTeam team={openTeam} key={openTeam.id} />,
                )}
          </>
        ) : (
          <div style={{
            background: 'rgb(23, 31, 47)',
            padding: 20,
            textAlign: 'center',
            width: 'calc(100% - 40px)',
          }}
          >{l(317)}
          </div>
        )}
      </>
    </>

  )
}

