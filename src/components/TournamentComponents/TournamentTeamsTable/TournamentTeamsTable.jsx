import { Spinner } from 'components/ui';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cls from './TournamentTeamsTable.module.css';

export const TournamentTeamsTable = () => {
  const teams = useSelector((state) => state.tournament?.tournaments?.teams);
  const loading = useSelector((state) => state.tournament?.loadingTournaments);

  return (
    <div className={cls.tableContainer}>
      <table className={cls.teamsTable}>
        <tbody>
          {/* eslint-disable-next-line no-nested-ternary */}
          {loading ? (
            <tr style={{ textAlign: 'center' }}>
              <td colSpan='23'>
                <Spinner size='medium' />
              </td>
            </tr>
          ) : teams?.length > 0 ? (
            <>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>
                    <Link className={cls.teamNameLink} to={`/team/${team.id}`}>
                      <div className={cls.teamContainer}>
                        <img className={cls.teamLogo} src={team.logo} alt='logo' />
                        <p className={cls.teamName}>{team.name}</p>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <tr style={{ textAlign: 'center' }}>
              <td colSpan='16'>No Teams</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

