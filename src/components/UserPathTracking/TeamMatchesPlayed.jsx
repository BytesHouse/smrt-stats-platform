import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';

const TeamMatchesPlayed = () => {
  let matches;
  let teamMatchesPlayed = useSelector((state) => state.team.teamMatchesPlayed);
  const stat = useSelector((state) => state.team.teamStatistic);
  const l = useLexicon();

  if (stat?.matches_played?.length > 0) {
    const sorted = [...stat.matches_played].sort(
      (a, b) => b.matches_count - a.matches_count,
    );

    teamMatchesPlayed = sorted;
  }

  if (teamMatchesPlayed.length > 0) {
    matches = (
      <>
        {teamMatchesPlayed.map((item) => (
          <option key={item.competition__name} value={item.competition__name}>
            {item.competition__name}
          </option>
        ))}
      </>
    );
  } else {
    matches = <option disabled>{l(419)}</option>;
  }

  return <>{matches}</>;
};

export default TeamMatchesPlayed;
