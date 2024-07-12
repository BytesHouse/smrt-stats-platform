import { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './UserPathTracking.module.css';
import TeamMatchesPlayed from './TeamMatchesPlayed';
import PlayerMatchesPlayed from './PlayerMatchesPlayed';

const UserPathTracking = () => {
  const navigate = useNavigate();
  const [selectedCompetition, setSelectedCompetition] = useState('');
  const player = useSelector((state) => state.player.playerStatistic?.player);
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const location = useLocation();
  const path = location?.pathname;
  let competitions;
  const tournament = useSelector((state) => state.tournament.tournaments);
  const l = useLexicon();
  // const title = useSelector((state) => state.tournament.tournamentTitle);

  const idTeam = useMemo(() => {
    if (player?.team?.id) {
      return player.team.id;
    }

    if (player?.teams?.[0]?.id) {
      return player.teams[0].id;
    }

    return null;
  }, [player]);

  const onCompetitionChange = (e) => {
    setSelectedCompetition(e.target.value);
  };

  const tournamentName = useMemo(() => {
    if (tournament?.competition) {
      return tournament.competition.name;
    }
    return 'Name of competition';
  }, [tournament]);

  if (path?.includes('team')) {
    competitions = <TeamMatchesPlayed />;
  } else if (path?.includes('player')) {
    competitions = <PlayerMatchesPlayed />;
  } else {
    competitions = (
      <option key={tournamentName} value={tournamentName}>
        {tournamentName}
      </option>
    );
  }

  return (
    <div className={cls.wrapper}>
      <Link to='/' className={cls.pagebtn}>
        {l(418)}
      </Link>
      <span className={cls.dash}>-</span>
      <select
        onChange={onCompetitionChange}
        value={selectedCompetition}
        className={cls.competition}
      >
        {competitions}
      </select>
      <span
        style={{
          display:
            path?.includes('tournament') || path?.includes('competitions')
              ? 'none'
              : 'block',
        }}
        className={cls.dash}
      >
        -
      </span>
      <span
        style={{
          cursor: 'pointer',
          display:
            path?.includes('tournament') || path?.includes('competitions')
              ? 'none'
              : 'block',
        }}
        className={cls.displayname}
        onClick={() => idTeam && navigate(`/team/${idTeam}`)}
      >
        {path?.includes('team') ? team?.name : player?.team?.name}
      </span>
      <span
        style={{
          display:
            path?.includes('team') ||
            path?.includes('tournament') ||
            path?.includes('competitions')
              ? 'none'
              : 'block',
        }}
        className={cls.dash}
      >
        -
      </span>
      <span
        style={{
          display:
            path?.includes('team') ||
            path?.includes('tournament') ||
            path?.includes('competitions')
              ? 'none'
              : 'block',
        }}
        className={cls.displayname}
      >
        {player?.display_name}
      </span>
    </div>
  );
};

export default UserPathTracking;
