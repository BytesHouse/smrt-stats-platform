import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { teamActions } from 'store/team/teamSlice';
import { useMatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import { PlayerProfileWrapper } from '../../components/PlayerProfileComponents/PlayerProfileWrapper/PlayerProfileWrapper';
import { MainPitchComponent } from '../../components/TeamProfileComponents/TeamProfileEvents/Pitch/MainPitchComponent';
import { SelectEventsCard } from '../../components/TeamProfileComponents/TeamProfileEvents/SelectEventsCard/SelectEventsCard';
import { $api } from '../../config/api';
import { getPlayerStatistics } from '../../store/player/playerService';
import cls from './PlayerProfileEventsPage.module.css';

export const PlayerProfileEventsPage = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.team.activeTab);
  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const selectedActions = useSelector((state) => state.team.selectedActions);
  const [firstrender, setFirstRender] = useState(false);
  const [resultMarkers, setResultMarkers] = useState([]);
  const [foundedActionsCount, setFoundedActionsCount] = useState(0);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const {
    selectOptions,
  } = useMatchesSettings({ selectMatchesOptions: [] })

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const idPlayer = useMemo(() => {
    const searchPlayerId = searchParams.get('player');
    if (id || searchPlayerId) {
      return id || searchPlayerId;
    }
    return null;
  }, [id, searchParams]);

  const getEventsFromMarkersIds = async (markersIds) => {
    try {
      const response = await $api.post('/stats/events_search/', { markers: markersIds });
      return response.data;
    } catch (e) {
      return { count: 0, events: [] }
    }
  }

  useEffect(() => {
    selectedMatches.forEach((match) => {
      dispatch(teamActions.setSelectedMatches({ checked: false, id: match }))
    })
  }, [])

  useEffect(() => {
    const idPlayerParam = searchParams.get('player');
    const idSeason = searchParams.get('season');
    if (+idPlayerParam) {
      dispatch(
        getPlayerStatistics({
          id: idPlayerParam,
          year_season_id: idSeason,
        }),
      );
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (activeTab) {
      setFoundedActionsCount(0);
    }
  }, [activeTab])

  useEffect(() => {
    setFirstRender(true)
    dispatch(teamActions.resetSelectedAction())
  }, [])

  useEffect(() => {
    if (selectedMatches?.length > 0 && selectedActions?.length > 0 && firstrender) {
      const getMatchMarkers = async (
        matchIds,
        actionsIds,
        playerId,
      ) => {
        setLoadingEvents(true);
        try {
          const response = await $api.get(
            `/stats/player/${playerId}?matches=${matchIds}&params=${actionsIds}`,
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

      getMatchMarkers(
        selectedMatches.join(','),
        selectedActions.join(','),
        idPlayer,
      );
    } else {
      setResultMarkers([]);
      setFoundedActionsCount(0);
    }
  }, [selectedMatches, selectedActions, idPlayer]);

  useEffect(() => {
    selectOptions?.forEach(({ id }) => {
      dispatch(teamActions.setSelectedMatches({
        checked: false,
        id,
      }))
    })
  }, [dispatch, selectOptions])

  return (
    <PlayerProfileWrapper>
      <div className={cls.eventsContainer}>
        <SelectEventsCard />
        <MainPitchComponent
          foundedActionsCount={foundedActionsCount}
          resultMarkers={resultMarkers}
          loadingEvents={loadingEvents}
        />
      </div>
    </PlayerProfileWrapper>
  );
};
