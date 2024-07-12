import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import { Spinner } from '../../ui/Spinner/Spinner';
import cls from './TeamProfilePlayersTable.module.css';
import { TeamProfilePlayersTableItem } from './TeamProfilePlayersTableItem';

export const TeamProfilePlayersTable = () => {
  const { t } = useTranslation();
  const l = useLexicon();
  const players = useSelector((state) => state.team.players);
  const loading = useSelector((state) => state.team.loadingTeamStatistic);
  const tableContent = useMemo(() => {
    if (loading) {
      return (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spinner size='medium' />
        </div>
      );
    } if (!loading && players?.length > 0) {
      return (
        <>
          {players?.length > 0 && !loading && (
            <>
              {players.map((player) => (
                <TeamProfilePlayersTableItem
                  key={player.id}
                  player={player}
                />
              ))}
            </>
          )}
        </>
      );
    }
    return (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#1d273b',
          display: 'flex',
          justifyContent: 'center',
          opacity: 0.7,
          padding: 20,
        }}
      >
        <b>{l(458)}</b>
      </div>
    );
  }, [loading, players, l]);

  return (
    <div className={cls.tableContanier}>
      <header>{l(5)}</header>
      <div className={cls.tablePlayersList}>{tableContent}</div>
      {/* <TeamProfilePlayersTablePagination pages={pages} /> */}
    </div>
  );
};
