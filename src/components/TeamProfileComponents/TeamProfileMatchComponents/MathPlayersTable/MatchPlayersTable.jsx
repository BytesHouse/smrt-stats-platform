import React from 'react'
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './MatchPlayersTable.module.css';
import { MatchPlayersTableRow } from './MatchPlayersTableRow';

export const MatchPlayersTable = ({ team, teamName }) => {
  const l = useLexicon();
  return (
    <div className={cls.playersTableContainer}>
      <header>{teamName}</header>
      <div>
        <div className={cls.playersTableHeader}>
          <div>№</div>
          <div>{l(319)}</div>
          <div>Position</div>
          {/* <div>Mins played</div> */}
          <div>Goals</div>
          <div>{l(105)}</div>
          {/* <div>Chances</div> */}
          <div>{l(17)}</div>
          <div>YC</div>
          <div>RC</div>
        </div>
        <div className={cls.playersTableBody}>
          {team?.length > 0 ? (
            <>
              {team.map((player) => (
                <MatchPlayersTableRow key={player.id} player={player} />
              ))}
            </>
          ) : <div style={{ padding: 20, textAlign: 'center' }}>No players</div>}

        </div>
      </div>
    </div>
  )
}
