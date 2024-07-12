import React from 'react';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import { IconComponent } from 'assets/icons';
import { useMatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import { MatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings';
import { Spinner } from '../../ui';
import cls from './PlayerProfileMatchesList.module.css';
import { PlayerProfileMatchItem } from './PlayerProfileMatchItem';

export const PlayerProfileMatchesList = () => {
  const matches = useSelector(
    (state) => state.player?.playerStatistic?.matches_list,
  );
  const selectedMatches = useSelector((state) => state.team.selectedMatches)

  const filteredMatches = selectedMatches.length
    ? matches.filter((match) => selectedMatches.includes(match.id))
    : matches

  const l = useLexicon();
  const loading = useSelector((state) => state.player.loadingPlayerStatistic);
  const {
    competitions,
    handleChangeSeason,
    handleResetSettings,
    handleSaveSettings,
    handleSelectedCompetition,
    handleSelectedCountMatches,
    isOpenSettings,
    openSettings,
    seasons,
    selectedCountMatches,
    setIsOpenSettings,
  } = useMatchesSettings({ selectMatchesOptions: [] })

  return (
    <>
      <div className={cls.tableContanier}>
        <header>{l(7)}</header>
        <div className={cls.settings} onClick={openSettings}>
          <IconComponent.SETTINGS />
        </div>
        <div className={cls.tableMatchesList}>
          {loading ? (
            <div
              style={{
                background: 'rgb(23, 31, 47)',
                padding: 20,
                textAlign: 'center',
                width: 'calc(100% - 40px)',
              }}
            >
              <Spinner size='medium' />
            </div>
          ) : (
            <>
              {matches?.length > 0 ? (
                <>
                  {filteredMatches?.map((match) => (
                    <PlayerProfileMatchItem match={match} key={match.id} />
                  ))}
                </>
              ) : (
                <div
                  style={{
                    background: 'rgb(23, 31, 47)',
                    padding: 20,
                    textAlign: 'center',
                    width: 'calc(100% - 40px)',
                  }}
                >
                  {l(315)}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {isOpenSettings ? (
        <div className={cls.settingsWrapper}>
          <MatchesSettings
            competitions={competitions}
            handleChangeSeason={handleChangeSeason}
            handleResetSettings={handleResetSettings}
            handleSaveSettings={handleSaveSettings}
            handleSelectedCompetition={handleSelectedCompetition}
            seasons={seasons}
            selectedCountMatches={selectedCountMatches}
            setIsOpenSettings={setIsOpenSettings}
            handleSelectedCountMatches={handleSelectedCountMatches}
          />
        </div>)
        : null}
    </>
  );
};
