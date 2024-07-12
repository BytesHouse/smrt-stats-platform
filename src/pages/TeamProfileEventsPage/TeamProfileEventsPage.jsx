import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { MainPitchComponent } from 'components/TeamProfileComponents/TeamProfileEvents/Pitch/MainPitchComponent';
import { SelectEventsCard } from 'components/TeamProfileComponents/TeamProfileEvents/SelectEventsCard/SelectEventsCard';
import { TeamProfileWrapper } from 'components/TeamProfileComponents/TeamProfileWrapper/TeamProfileWrapper';
import { $api } from 'config/api';
import { getTeamStatistics } from 'store/team/teamService';
import { useMatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import { teamActions } from 'store/team/teamSlice';
import cls from './TeamProfileEventsPage.module.css';

export const TeamProfileEventsPage = () => {
  const dispatch = useDispatch();
  const team = useSelector((state) => state.team.teamStatistic?.team);
  const [searchParams] = useSearchParams();
  const [firstrender, setFirstRender] = useState(false);
  const activeTab = useSelector((state) => state.team.activeTab);
  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const selectedActions = useSelector((state) => state.team.selectedActions);
  const selectedMarkers = useSelector((state) => state.pitch.selectedMarkers);
  const pitchSettings = useSelector((state) => state.user.userProfile.pitchSettings);
  const [resultMarkers, setResultMarkers] = useState([]);
  const [foundedActionsCount, setFoundedActionsCount] = useState(0);
  const [loadingEvents, setLoadingEvents] = useState(false);

  const {
    selectOptions,
  } = useMatchesSettings({ selectMatchesOptions: [] })

  const getEventsFromMarkersIds = async (markersIds) => {
    try {
      const response = await $api.post('/stats/events_search/', { markers: markersIds });
      return response.data;
    } catch (e) {
      return { count: 0, events: [] }
    }
  }

  useEffect(() => {
    const idTeamParam = searchParams.get('team');
    const idSeason = searchParams.get('season');
    if (idTeamParam && Number(team?.id) !== Number(idTeamParam)) {
      dispatch(getTeamStatistics({ id: idTeamParam, year_season_id: idSeason }));
    }
  }, [searchParams, dispatch, team]);

  useEffect(() => {
    if (activeTab) {
      setFoundedActionsCount(0);
    }
  }, [activeTab]);
  useEffect(() => {
    setFirstRender(true)
    dispatch(teamActions.resetSelectedAction())
  }, [])

  useEffect(() => {
    if (selectedMatches?.length > 0 && selectedActions?.length > 0 && firstrender) {
      const getMatchMarkers = async (
        matchIds,
        actionsIds,
        teamId,
      ) => {
        setLoadingEvents(true);
        try {
          const response = await $api.get(
            `/stats/team/${teamId}?matches=${matchIds}&params=${actionsIds}`,
          );

          if (response.data?.stats?.length > 0) {
            // let count = 0;
            // const markers = [];

            let markersIds = [];

            response.data.stats.forEach((stat) => {
              if (stat?.parameters?.length > 0) {
                stat.parameters.forEach((parametr) => {
                  if (parametr?.markers?.length > 0) {
                    markersIds = [...markersIds, ...parametr.markers]
                  }
                })
              }
            })

            // for (let i = 0; i <= response.data.length - 1; i++) {
            //   count += response.data[i].count;
            //   markers.push(...response.data[i].markers);
            // }
            // eslint-disable-next-line max-len
            const data = markersIds?.length > 0 ? await getEventsFromMarkersIds(markersIds) : { count: 0, events: [] };
            setResultMarkers(data.events);
            setFoundedActionsCount(data?.count);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('get match markers err', e.message);
        } finally {
          setLoadingEvents(false);
        }
      };

      const idTeamParam = searchParams.get('team');
      getMatchMarkers(
        selectedMatches.join(','),
        selectedActions.join(','),
        idTeamParam,
      );
    } else {
      setResultMarkers([]);
      setFoundedActionsCount(0);
    }
  }, [selectedMatches, selectedActions, searchParams]);

  useEffect(() => {
    if ((pitchSettings?.wholePitch && pitchSettings?.selectedZone) || pitchSettings?.showDraw) {
      setFoundedActionsCount(0)

      const marks = Object.values(selectedMarkers).reduce((acc, mark) => {
        if (!mark) {
          return acc
        }
        Object.values(mark).forEach((el) => {
          acc[el?.id] = el
        })
        return acc
      }, {})
      setFoundedActionsCount(resultMarkers.filter((m) => marks[m?.id])?.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMarkers]);

  useEffect(() => {
    selectOptions?.forEach(({ id }) => {
      dispatch(teamActions.setSelectedMatches({
        checked: false,
        id,
      }))
    })
  }, [dispatch, selectOptions])

  return (
    <TeamProfileWrapper>
      <div className={cls.eventsContainer}>
        <SelectEventsCard />
        <MainPitchComponent
          loadingEvents={loadingEvents}
          foundedActionsCount={foundedActionsCount}
          setfoundedActionsCount={setFoundedActionsCount}
          resultMarkers={resultMarkers}
        />
      </div>
    </TeamProfileWrapper>
  );
};
