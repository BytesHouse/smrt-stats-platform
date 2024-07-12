import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';

const PlayerMatchesPlayed = () => {
  let matches;
  let matchesPlayed = useSelector((state) => state.player.matchesPlayed);
  const stats = useSelector((state) => state.player.playerStatistic);
  const l = useLexicon();

  if (stats?.matches_played?.length > 0) {
    const sorted = [...stats.matches_played].sort(
      (a, b) => b.matches_count - a.matches_count,
    );

    matchesPlayed = sorted;
  }

  if (matchesPlayed.length > 0) {
    matches = (
      <>
        {matchesPlayed.map((item) => (
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

export default PlayerMatchesPlayed;
