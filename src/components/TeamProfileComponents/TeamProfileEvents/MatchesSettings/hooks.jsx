import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getTeamStatistics, getMatchesStatistics } from 'store/team/teamService';
import { getPlayerStatistics } from 'store/player/playerService';
import { useLexicon } from 'lib/hooks/useTranslates';
import { teamActions, teamSlice } from 'store/team/teamSlice';

const ALL_COMPETITIONS_KEY = 'all competitions'

export const useMatchesSettings = ({ selectMatchesOptions }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [teamId, setTeamId] = useState(null);
  const [playerId, setPlayerId] = useState(null);
  const [isOpenSettings, setIsOpenSettings] = useState(false);
  const tournament = useSelector((state) => state.tournament.tournaments);
  const teamStatistic = useSelector((state) => state.team.teamStatistic);
  const matchesTeam = useSelector((state) => state.team.teamStatistic?.matches_list);
  const teamSettings = useSelector((state) => state.team.teamSettings);
  const playerStatistic = useSelector((state) => state.player.playerStatistic);
  const matchesPlayer = useSelector((state) => state.player.matchesPlayerStat?.matches);

  // const [startDate, setStartDate] = useState(todayOneYearAgo);
  // const [endDate, setEndDate] = useState(new Date());
  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const handleChangeSeason = (season) => {
    dispatch(teamSlice.actions.setTeamSettings({
      ...teamSettings,
      seasons: teamSettings.seasons.map(
        (option) => (option.value === season.value
          ? { ...option, checked: !option.checked }
          : { ...option, checked: false }
        ),
      ),
    }))

    const idSeason = season?.value

    if (!idSeason && (teamStatistic?.team?.id || playerId)) return

    if (teamStatistic?.team?.id) {
      dispatch(getTeamStatistics({
        id: teamStatistic?.team?.id,
        year_season_id: idSeason,
      }));
      dispatch(getMatchesStatistics({
        id: teamStatistic?.team?.id,
        year_season_id: idSeason,
      }));
    }
    if (playerId) {
      dispatch(getPlayerStatistics({
        id: playerId,
        year_season_id: idSeason,
      }));
    }
    searchParams.set('season', season?.value);
    setSearchParams(searchParams)
  }

  const openSettings = () => {
    setIsOpenSettings((prev) => !prev)
  }

  const handleSaveSettings = (e) => {
    e?.preventDefault()
    if (selectedMatches.length >= getFilteredMatches(selectOptions)?.length) {
      selectedMatches?.forEach((id) => {
        dispatch(teamActions.setSelectedMatches({
          checked: Boolean(getFilteredMatches(selectOptions).find((el) => el.id === id)),
          id,
        }))
      })
    } else {
      getFilteredMatches(selectOptions)?.forEach((match) => {
        dispatch(teamActions.setSelectedMatches({
          checked: true,
          id: match.id,
        }))
      })
    }
    setIsOpenSettings(false)
  }

  const handleSelectedCompetition =
    (selectedOption) => {
      const comps = teamSettings?.competitions?.map(
        (option) => (
          option.value === selectedOption.value
            ? {
              ...option,
              checked: !option.checked,
            }
            : {
              ...option,
              checked: option.value === ALL_COMPETITIONS_KEY
                ? false
                : option.checked,
            }
        ),
      )
      dispatch(teamSlice.actions.setTeamSettings({
        ...teamSettings,
        competitions: comps,
      }))
    }

  const handleResetSettings = () => {
    dispatch(teamSlice.actions.resetTeamSettings({
      competitions: teamSettings?.competitions.map((comp, index) => ({
        ...comp,
        checked: index === 0,
      })),
      seasons: teamSettings?.seasons.map((season, index) => ({
        ...season,
        checked: index === 0,
      })),
    }))
  }

  const handleSelectedCountMatches = (selectedOption) => {
    dispatch(teamSlice.actions.setTeamSettings({
      ...teamSettings,
      selectedCountMatches: teamSettings?.selectedCountMatches.map((el) => ({
        ...el,
        checked: el.value === selectedOption.value,
      })),
    }))
  }

  const getSeasons = (seasonId) => {
    if (teamStatistic?.available_seasons?.length > 0) {
      return teamStatistic?.available_seasons?.map(
        (season, index) => ({
          checked: seasonId ? season.id?.toString() === searchParams.get('season') : index === 0,
          label: season.years,
          value: season.id,
        }
        ),
      )
    } if (playerStatistic?.available_seasons?.length > 0) {
      return playerStatistic?.available_seasons?.map(
        (season, index) => ({
          checked: seasonId ? season.id?.toString() === searchParams.get('season') : index === 0,
          label: season.years,
          value: season.id,
        }
        ),
      )
    } if (tournament?.available_seasons?.length > 0) {
      return tournament?.available_seasons?.map((season, index) => ({
        checked: season.year_season.id?.toString() === searchParams.get('season') ?? index === 0,
        label: season.year_season.years,
        value: season.year_season.id,
      }))
    }
    return []
  }

  useEffect(() => {
    const idPlayerParam = searchParams.get('player');
    const idTeamParam = searchParams.get('team');
    const seasonId = searchParams.get('season')

    idPlayerParam && setPlayerId(+idPlayerParam);
    idTeamParam && setTeamId(+idTeamParam);
    if ((matchesTeam ?? matchesPlayer ?? tournament?.available_seasons)?.length) {
      const mapCompetition = (matchesTeam ?? matchesPlayer ?? tournament?.available_seasons)
        ?.reduce((acc, match) => {
          if (!acc[match?.competition]) {
            acc[match.competition] = match.competition
          }
          return acc
        }, {})

      const comps = Object.keys(mapCompetition).map((comp) => ({
        checked: false,
        label: comp,
        value: comp,
      }))
      dispatch(teamSlice.actions.setTeamSettings({
        ...teamSettings,
        competitions: [teamSettings.competitions?.find((comp) => comp.value === 'all competitions'), ...comps],
        seasons: getSeasons(seasonId),
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, matchesTeam, matchesPlayer, tournament])

  const selectOptions = useMemo(() => {
    if (selectMatchesOptions?.length) return selectMatchesOptions

    if (matchesTeam?.length > 0 && teamId) {
      const options = matchesTeam.map((match) => ({
        key: match.id,
        title: `${match.home_team} ${match.score} ${match.away_team} ${match.date?.split('T')[0]}, ${match.competition}`,
        ...match,
      }))
      return options;
    }

    if (matchesPlayer?.length) {
      const options = matchesPlayer.map((match) => ({
        key: match.id,
        title: `${match.home_team} ${match.score} ${match.away_team} ${match.date?.split('T')[0]}, ${match.competition}`,
        ...match,
      }))
      return options;
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesTeam, matchesPlayer, teamId, playerId]);

  const getFilteredMatches = (matches) => {
    if (!teamSettings || !Object.keys(teamSettings)?.length) return matches

    const filteredMatches = matches.filter((match) => {
      // Проверка на соответствие дате
      //   const isDateInRange = new Date(match.date) >= new Date(teamSettings?.startDate)
      //     && new Date(match.date) <= new Date(teamSettings?.endDate);
      // Проверка на соответствие соревнованию
      const isCompetitionMatch = (
        match.competition === teamSettings?.competitions?.find(({ checked }) => checked)?.value)
                || teamSettings?.competitions?.find(
                  (comp) => comp.value === ALL_COMPETITIONS_KEY,
                );

      // Возвращаем результат с учетом всех условий
      return isCompetitionMatch
    })

    if (teamSettings?.selectedCountMatches?.find(({ checked }) => checked)?.value) {
      return filteredMatches.slice(0, teamSettings?.selectedCountMatches
        ?.find(({ checked }) => checked)?.value)
    }
    return filteredMatches
  };

  useEffect(() => {
    if (selectedMatches.length) {
      selectedMatches?.forEach((id) => {
        dispatch(teamActions.setSelectedMatches({
          checked: true,
          id,
        }))
      })
    } else {
      selectOptions?.forEach(({ id }) => {
        dispatch(teamActions.setSelectedMatches({
          checked: true,
          id,
        }))
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectOptions]);

  return {
    competitions: teamSettings?.competitions,
    handleChangeSeason,
    handleResetSettings,
    handleSaveSettings,
    handleSelectedCompetition,
    handleSelectedCountMatches,
    isOpenSettings,
    openSettings,
    seasons: teamSettings?.seasons,
    selectOptions,
    selectedCountMatches: teamSettings?.selectedCountMatches,
    setIsOpenSettings,
    teamSettings,
  }
}
