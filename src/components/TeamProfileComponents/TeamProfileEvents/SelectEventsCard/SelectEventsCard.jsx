import { useLexicon } from 'lib/hooks/useTranslates';
import { IconComponent } from 'assets/icons';
import {
  MatchesSettings,
} from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings';
import {
  useMatchesSettings,
} from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { GearIcon } from 'assets/icons/GearIcon';
import {
  Select,
} from '../../../ui';
import { EventsSelector } from './EventsSelector/EventsSelector';
import cls from './SelectEventsCard.module.css';

export const SelectEventsCard = () => {
  const l = useLexicon();
  const [searchParams] = useSearchParams();
  const playerStatistic = useSelector((state) => state.player.playerStatistic);
  const {
    competitions,
    handleChangeSeason,
    handleResetSettings,
    handleSaveSettings,
    handleSelectedCompetition,
    handleSelectedCountMatches,
    isOpenSettings,
    openSettings,
    selectOptions,
    setIsOpenSettings,
    teamSettings,
  } = useMatchesSettings({ selectMatchesOptions: [] })

  const isPlayerGoalkeeper = useMemo(() => {
    if (playerStatistic?.player?.position?.length > 0) {
      const isGK = playerStatistic.player.position.findIndex((item) => item.id === 10)
      return isGK >= 0;
    }
    return false
  }, [playerStatistic])

  const isTeamPage = Boolean(searchParams.get('team'))

  return (
    <div className={cls.container}>
      <div className={cls.settings} onClick={openSettings}>
        <GearIcon color='black' />
      </div>
      <header>{l(15)}</header>
      <Select
        options={selectOptions}
        styles={{
          marginBottom: 15,
          marginLeft: 10,
          width: '98%',
        }}
      />
      <EventsSelector isTeamPage={isTeamPage} isPlayerGoalkeeper={isPlayerGoalkeeper} />
      {isOpenSettings ? (
        <MatchesSettings
          withClose
          className={cls.team_matchesSettings}
          competitions={teamSettings?.competitions}
          handleChangeSeason={handleChangeSeason}
          handleResetSettings={handleResetSettings}
          handleSaveSettings={handleSaveSettings}
          handleSelectedCompetition={handleSelectedCompetition}
          seasons={teamSettings?.seasons}
          selectedCountMatches={teamSettings?.selectedCountMatches}
          setIsOpenSettings={setIsOpenSettings}
          handleSelectedCountMatches={handleSelectedCountMatches}
        />
      ) : null}
    </div>
  )
}
