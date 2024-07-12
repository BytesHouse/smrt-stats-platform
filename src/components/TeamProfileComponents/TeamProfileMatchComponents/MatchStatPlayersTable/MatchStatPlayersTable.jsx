import React from 'react'
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './MatchStatPlayersTable.module.css';
import { Spinner } from '../../../ui';
import { TDTableMatchStatItem } from './TDTableMatchStatItem';

export const MatchStatPlayersTable = ({ team, teamName }) => {
  const loading = useSelector((state) => state.match.loadingStatisticsMatch);
  const l = useLexicon();
  return (
    <div className={cls.tableContainerStat}>
      <header>{teamName}</header>
      <table className={cls.matchesTableStat}>
        <thead>
          <tr>
            <th className={cls.thStat} title='№'>№</th>
            <th className={cls.thStat} title={l(319)}>{l(319)}</th>
            <th className={cls.thStat} title='Goals'>Goals</th>
            <th className={cls.thStat} title={l(105)}>{l(105)}</th>
            <th className={cls.thStat} title={l(17)}>{l(17)}</th>
            <th className={cls.thStat} title={l(104)}>YC</th>
            <th className={cls.thStat} title={l(103)}>RC</th>
          </tr>
        </thead>
        <tbody>
          {
            // eslint-disable-next-line no-nested-ternary
            loading
              ? <tr style={{ textAlign: 'center' }}><td colSpan='32'><Spinner size='medium' /></td></tr>
              : team?.length > 0 ? (
                <>
                  {team.map((player) => <TDTableMatchStatItem key={player.id} player={player} />)}
                </>
              ) : <tr style={{ textAlign: 'center' }}><td colSpan='32'>No players</td></tr>
          }
        </tbody>
      </table>
    </div>
  )
}
