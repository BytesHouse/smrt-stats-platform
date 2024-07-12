/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import * as d3 from 'd3';
import { Formation } from 'components/Formation';
import { actionTactics, availableTacticKeysIds } from 'components/Formation/ui/constants/tacticContsants';
import { TacticI } from 'components/Formation/ui/types/tacticTypes';
import { StateSchema } from 'providers/storeProvider/config/StateSchema';
import { useAppDispatch } from 'providers/storeProvider/config/store';
import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  getMatchFormationData,
  getMatchMarkers,
  getMatchPlacementData,
} from 'store/formation/formationService';
import { formationActions } from 'store/formation/formationSlice';
import {
  // FormationSplitResponse,
  Marker,
} from 'store/formation/formationTypes';
import { ChangeFormationTime } from './ChangeFormationTime';
import cls from './TeamProfileMatchFormationPage.module.css';

interface MatchFormationProps {
  match: any,
}

const testAvailableActionMarkerIdx = [65, 100, 86, 55, 206, 77] // Goal, Own Goal, RC, YC, RC-YC, Substitution

export const MatchFormation: FC<MatchFormationProps> = ({ match }) => {
  const dispatch = useAppDispatch();
  const markers = useSelector((state: StateSchema) => state.formation.match_markers);
  const placementData = useSelector((state: StateSchema) => state.formation.match_placement_data);
  // const formationSplitData = useSelector((state: StateSchema) => state.formation.formation_split_data);
  const homeTacticKey = useSelector((state: StateSchema) => state.formation.home_tactic_key);
  const awayTacticKey = useSelector((state: StateSchema) => state.formation.away_tactic_key);

  const changeSide = useSelector((state: StateSchema) => state.formation.change_side);

  const [currentActions, setCurrentActions] = useState<Array<Marker>>([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [disableNextButton, setDisableNextButton] = useState(true);
  const [disablePrevButton, setDisablePrevButton] = useState(true);
  const changeSideRef = useRef(false);
  const currentActionsRef = useRef<Array<Marker>>([]);

  // split data
  // const [currentHalf, setCurrentHalf] = useState<keyof FormationSplitResponse>('first_half')
  // const [currentSplitActions, setCurrentSplitActions] = useState<Array<Marker>>([]);
  // const [currentSplitTime, setCurrentSplitTime] = useState('0-5');

  const x = d3.scaleLinear().domain([0, 105]).range([0, 840]);

  const y = d3.scaleLinear().domain([0, 68]).range([544, 0]);

  const actionMarkers = useMemo(() => {
    if (markers.length > 0) {
      const filteredMarkers = markers.filter((marker) => testAvailableActionMarkerIdx.includes(marker.action.id));
      setDisableNextButton(false);
      return filteredMarkers;
    }
    return [];
  }, [markers])

  // const actionSplitMarkers = useMemo(() => {
  //   if (formationSplitData) {
  //     const result: any = {
  //       first_half: [],
  //       second_half: [],
  //     }

  //     if (!Array.isArray(formationSplitData?.first_half) && formationSplitData?.first_half) {
  //       result.first_half = Object.entries(formationSplitData.first_half as any);
  //     }

  //     if (!Array.isArray(formationSplitData?.second_half) && formationSplitData?.second_half) {
  //       result.second_half = Object.entries(formationSplitData.second_half as any);
  //     }

  //     if (!Array.isArray(formationSplitData?.['45+']) && formationSplitData?.['45+']) {
  //       result.first_half = [...result.first_half, ...Object.entries(formationSplitData['45+'] as any)];
  //     }

  //     if (!Array.isArray(formationSplitData?.['90+']) && formationSplitData?.['90+']) {
  //       result.second_half = [...result.second_half, ...Object.entries(formationSplitData['90+'] as any)];
  //     }

  //     return result;
  //   }

  //   return {
  //     first_half: [],
  //     second_half: [],
  //   }
  // }, [formationSplitData])

  const secondHalfSeconds = useMemo(() => {
    if (markers.length > 0) {
      const secondHalfMarker = markers.find((marker) => marker.action.id === 75);
      if (secondHalfMarker) {
        return +secondHalfMarker.second;
      }
    }
    return 3000
  }, [markers])

  const placementMarkers = useMemo(() => {
    if (placementData?.markers?.length > 0) {
      return placementData.markers
    }

    // if (!Array.isArray(formationSplitData?.first_half) && formationSplitData?.first_half?.['0-5']?.length > 0) {
    //   console.log('start split', formationSplitData.first_half['0-5'])
    //   const result = [];
    //   const tacticKeys = formationSplitData.first_half['0-5']
    //     .filter((item) => item?.action && availableTacticKeysIds.includes(item.action));
    //   console.log('tacticKeys split', tacticKeys)

    //   if (tacticKeys?.length >= 2) {
    //     result.push(tacticKeys[0]);
    //     result.push(tacticKeys[1]);

    //     const formationChange = formationSplitData.first_half['0-5'].filter((item) => Boolean(item.formation_change));
    //     console.log('formationChange', formationChange)
    //     if (formationChange?.[0]?.formation_change?.length >= 22) {
    //       result.push(...formationChange[0].formation_change.slice(0, 22));
    //       console.log('return markers from split', result)
    //       return result;
    //     }
    //   }
    // }

    if (markers?.length >= 24) {
      return markers.slice(0, 24);
    }

    setDisableNextButton(true);
    setDisablePrevButton(true);

    return []
  }, [
    placementData,
    // formationSplitData,
    markers,
  ])

  const teamColors = useMemo(() => {
    if (placementData.match) {
      return {
        awayColor: placementData.match.away_team.color || '#ffffff',
        awayNumberColor: placementData.match.away_team.color_number || '#000000',
        homeColor: placementData.match.home_team.color || '#ffffff',
        homeNumberColor: placementData.match.home_team.color_number || '#000000',
      }
    }
    return {
      awayColor: '#000000',
      awayNumberColor: '#000000',
      homeColor: '#000000',
      homeNumberColor: '#000000',
    }
  }, [placementData])

  const currentMatch = useMemo(() => match, [match])
  const pitchContainerStyles = useMemo(() => ({ width: 'calc(45vw * var(--scale-multiplier))' }), []);

  // convert tactic markers to circles data for drawing on the pitch
  const getTacticKeysFromPlacementMarkers = useCallback((placement: Array<Marker>) => {
    let defaultHomeTacticKey = '3-5-2';
    let defaultAwayTacticKey = '3-5-2';

    let isAwayTac = 0;

    // get tactic keys
    // eslint-disable-next-line array-callback-return
    placement.map((item) => {
      if (availableTacticKeysIds.includes(item?.action?.id)) {
        const tac = Object.entries(actionTactics).filter(
          ([_, value]) => value === item.action.id,
        );
        if (tac.length > 0 && isAwayTac === 0) {
          isAwayTac = 1;
          // eslint-disable-next-line prefer-destructuring
          defaultAwayTacticKey = tac[0][0];
        } else if (tac.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          defaultHomeTacticKey = tac[0][0];
        }
      }
    });

    dispatch(formationActions.setHomeTacticKey(defaultHomeTacticKey as keyof TacticI))
    dispatch(formationActions.setAwayTacticKey(defaultAwayTacticKey as keyof TacticI));
  }, [dispatch])

  useEffect(() => {
    if (match?.id) {
      dispatch(getMatchPlacementData(match.id))
      dispatch(getMatchMarkers(match.id));
      dispatch(getMatchFormationData(match.id));
    }
  }, [match, dispatch])

  useEffect(() => {
    if (placementMarkers?.length > 0) {
      getTacticKeysFromPlacementMarkers(placementMarkers)
    }
  }, [placementMarkers, getTacticKeysFromPlacementMarkers])

  useEffect(() => {
    currentActionsRef.current = currentActions;
  }, [currentActions])

  useEffect(() => {
    changeSideRef.current = changeSide;
  }, [changeSide])

  const handleYellowCard = (marker: Marker, type: 'add' | 'delete') => {
    try {
      if (type === 'add') {
        setTimeout(() => {
          const pitchPlayer = d3.select('#formation').select(`.player-${marker.creator.player_id}`)
          const yc = d3.select('#formation').select(`.yellow-card-${marker.id}`)
          if (!yc.empty()) {
            yc.classed('out-field', false)
            return
          }
          if (!pitchPlayer?.empty()) {
            let coords_x = 0;
            let coords_y = 0;

            pitchPlayer.selectAll('circle').each((d: any) => {
              coords_x = +d.zone.coords_pos.x;
              coords_y = +d.zone.coords_pos.y;
            });

            pitchPlayer
              .append('rect')
              .attr('class', `yellow-card yellow-card-${marker.id}`)
              .attr('x', x(coords_x) - 20)
              .attr('y', y(coords_y) - 30)
              .attr('width', (68 * 8) / 35)
              .attr('height', (68 * 8) / 25)
              .style('fill', 'yellow');
          }
        }, 0)
      } else {
        setTimeout(() => {
          const yc = d3.select('#formation').select(`.yellow-card-${marker.id}`)
          if (!yc.empty()) {
            yc.classed('out-field', true)
          }
        }, 0)
      }
    } catch (e) {
      // console.log('handle yc error', e);
    }
  }

  const handleRedCard = (marker: Marker, type: 'add' | 'delete') => {
    try {
      if (type === 'add') {
        setTimeout(() => {
          const pitchPlayer = d3.select('#formation').select(`.player-${marker.creator.player_id}`)
          const rc = d3.select('#formation').select(`.red-card-${marker.id}`)
          if (!rc.empty()) {
            rc.classed('out-field', false)
            return
          }
          if (!pitchPlayer?.empty()) {
            let coords_x = 0;
            let coords_y = 0;

            pitchPlayer.selectAll('circle').each((d: any) => {
              coords_x = +d.zone.coords_pos.x;
              coords_y = +d.zone.coords_pos.y;
            });

            pitchPlayer
              .append('rect')
              .attr('class', `red-card red-card-${marker.id}`)
              .attr('x', x(coords_x) - 20)
              .attr('y', y(coords_y) - 30)
              .attr('width', (68 * 8) / 35)
              .attr('height', (68 * 8) / 25)
              .style('fill', 'red');
          }
        }, 0)
      } else {
        setTimeout(() => {
          const rc = d3.select('#formation').select(`.red-card-${marker.id}`)
          if (!rc.empty()) {
            rc.classed('out-field', true)
          }
        }, 0)
      }
    } catch (e) {
      // console.log('handle rc error', e);
    }
  }

  const handleGoal = (marker: Marker, type: 'add' | 'delete') => {
    try {
      if (type === 'add') {
        setTimeout(() => {
          const pitchPlayer = d3.select('#formation').select(`.player-${marker.creator.player_id}`)

          const goal = d3.select('#formation').select(`.goal-${marker.id}`)
          if (!goal.empty()) {
            goal.classed('out-field', false)
            return
          }

          if (!pitchPlayer?.empty()) {
            // const isHome = match?.home_squad?.team?.id === marker.creator.team_id;
            // const container = isHome
            //   ? d3.select('#formation').select('.players_left')
            //   : d3.select('#formation').select('.players_right')
            let coords_x = 0;
            let coords_y = 0;

            pitchPlayer.selectAll('circle').each((d: any) => {
              coords_x = +d.zone.coords_pos.x;
              coords_y = +d.zone.coords_pos.y;
            });

            pitchPlayer
              .append('g')
              .attr('class', `goal goal-${marker.id}`)
              .html(`<svg x="${x(coords_x) + 10}" y="${y(coords_y) + 10}" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <rect width="13" height="13" fill="url(#pattern0)"/>
                      <defs>
                      <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0_333_3427" transform="scale(0.0294118)"/>
                      </pattern>
                      <image id="image0_333_3427" width="34" height="34" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUISURBVHgBrVdbKPxpGH7N3znHrGMOP5LckJVDCJNitUhRYiVcSKntT3FBCVEKkXuRG5QLuyySxIZSTut0gzLOaZMxTjm++76/NRNjDr+Z/k99GfOdnnnf93u+57MA0/CTnZ1d4dPTU4STk9PPgYGBAS4ECwsLuL29VR4dHSmoT3F5efknjZ2jpoAfDDltNiuXy7GrqwvX19dRH7jf0tISaQ7a29v/xXPhB0BgAkVFRbixsfFl09fXVzw8PMSDgwM8PT3FpqYmkYB2o+hN8FpgDoKDgyuDgoJUm5ubnzafnZ3FqqoqDAsLQ5lMJv56R0dHJMI6SXxoz56enpVgIhp5siAIWF1djcvLy9jT04MBAQHo4eGBlZWVOD4+jhcXF59INjY26iXi7OyMqamp+L62dBLaLTk5GWdmZtAYDJFJSkrCuro642S8vb0rdS3Ai5sCQ2Q4tYWFhcip18dDoPasPZHT8/b2hqZCH5n8/Hy8v7/HkJAQFegqYKrscV0T+/r60BzwSeL5XNglJSWYmZmJfPz9/f2xoaEBFxYWuMBntXn8oouEj48Pmove3l7MyMjQSZCj3NraigUFBbyPXMOChYc7tYnk5uaiuQgNDcXBwUGdfUyGBBk7Ojo+RUVISUnBxMTEL0TKy8vRHGxtbaGXl5fBMaOjo+jr64sxMTG8l7uMQ5OTkwMkTpoI8f8jIyMwNTUFVHRgKkhzID093eCYrKwsiIqKgt3dXaD76zcggRph9eRQRkdH48rKyqcQMmsuLlPAwre6ump0HEeOFfnbt299rB3r29vb6OrqqnMwk2E1bW5uRimgKIrFKBV8kojMhiVNEugoQUJCgs4QUjcsLS0BqaKYPlJGgyEfGBiAvLw8kApek+4qf0sHBweXnZ0doLToHUy+A0jegQqa8wmkDeL3Z2dnsLa2Bvv7+0DWQCTMOefakorz83MgD+MCHJq0tDRJwsVWgFPIlxfXAeiRcV5TCtSiZ21tjTKVSqV8fHwEW1tbo+zDw8MhPj4epqengXyI3nFzc3MwMTFhdL35+XnxLxFRyhQKxdHNzQ0wGSkgSyhpXEVFBYfc4JjJyUn1R4Xs+vp6jfN8d3cHUsA5lQKOGCmn3n4KAAwNDYmfbWxsFJYUln8eHh7EIpMCLlCpaG9vFyNDBwJOTk7EaB4fHwMZKhgeHgYqE3Ecme0/+K87NYyNjTVaXC8vL8bs4JemNtL0q0V9iYyMxOzsbO1iF9Tk+eIRb0RDoHCaRII3ZsdPB+LLWsXFxR+dvgZyMOI/2J+ytzCFBB9PfaitrVWPlX/K5/t1zLqP/f39ms1bWlrEm5mdOusHm2ldluFjY/NjiASDLcC7GfsCgZpKvVhERIRm87GxMby6utIswtaRI0e+8wsJejIgFb5BElxr9FS5An1vHerUmGcu3o+b68Pi4iLyA4znsOpqv4N0oaysjAl/ByNo4EVJQdEUkJqKt7Qx1NfX4/sektDg7u6Oz8/PKBWkopxzpIe4zn4STCwtLTWJhAh+HnIeSXVRKsjZYXd396fvOL1tbW3o5+enovW+g5kQ+AHNzwFjp4DR2dmJcXFxWFNTIzp0dTG/n0jB0EYWIA3pJDy/k9H9lZy96DXJHIv3097enniv0PsY6D0MSqVSnGBlZQWU2jn4/3n5t7ENpBJRQ6Amd3Nzy6bbmv2gwKaGXRZJuJIU9Ig+r9Fnvr8GaOy/Uhf+DwlZ0BlAMswxAAAADmVYSWZNTQAqAAAACAAAAAAAAADSU5MAAAAASUVORK5CYII="/>
                      </defs>
                    </svg>`)
          }
        }, 0)
      } else {
        setTimeout(() => {
          const goal = d3.select('#formation').select(`.goal-${marker.id}`)
          if (!goal.empty()) {
            goal.classed('out-field', true)
          }
        }, 0)
      }
    } catch (e) {
      // console.log('handle goal error', e);
    }
  }

  const handleSubstitution = (marker: Marker, type: 'add' | 'delete') => {
    try {
      if (type === 'add') {
        setTimeout(() => {
          const isHome = match?.home_squad?.team?.id === marker.creator.team_id;
          const container = isHome
            ? d3.select('#formation').select('.players_left')
            : d3.select('#formation').select('.players_right')

          const pitchPlayer = d3
            .select('#formation')
            .select(`.player-${marker.recipient.player_id}`)

          if (!pitchPlayer?.empty() && !container.empty()) {
            let coords_x = 0;
            let coords_y = 0;
            let data = {};
            pitchPlayer
              .classed('out-field', true)
            // .style('opacity', 0)
            // .style('pointer-events', 'none')

            pitchPlayer.selectAll('circle').each((d: any) => {
              coords_x = +d.zone.coords_pos.x;
              coords_y = +d.zone.coords_pos.y;
              data = { ...d, player: d?.player }
            });

            if (
              d3
                .select('#formation')
                .select(`.player-${marker.creator.player_id}`)
                .empty()
            ) {
              const newPlayer = container
                .append('g')
                .datum(data)
                .attr('id', marker.id)
                .attr(
                  'class',
                  `player-${marker.creator?.player_id ? marker.creator.player_id : 'without-id'}`,
                );

              newPlayer
                .append('circle')
                .attr('class', 'tactic')
                .attr('cx', x(coords_x))
                .attr('cy', y(coords_y))
                .attr('r', 584 / 30)
                .style(
                  'fill',
                  isHome
                    ? teamColors.homeColor
                    : teamColors.awayColor,
                )
                .append('svg:title')
                .attr(
                  'id',
                  `player-${marker.creator?.player_id ? marker.creator.player_id : 'without-id'}`,
                )
                .text(
                  `${marker.creator?.number ? `[${marker.creator?.number}] ` : ' '}${marker.creator?.name} ${marker.creator?.surname ? `${marker.creator.surname}` : ''}`,
                );
              newPlayer
                .append('text')
                .attr('text-anchor', 'middle')
                .attr(
                  'fill',
                  isHome
                    ? teamColors.homeNumberColor
                    : teamColors.awayNumberColor,
                )
                .style('font-size', 584 / 30 / (((584 / 30) * 7) / 100))
                .style('font-weight', 600)
                .style('pointer-events', 'none')
                .attr('x', x(coords_x))
                .attr('y', y(coords_y - 0.5))
                .attr(
                  'id',
                  `player-${marker.creator?.player_id ? marker.creator.player_id : 'without-id'}`,
                )
                .text(`${marker.creator?.number ? `${marker.creator.number}` : `${marker.creator.name?.[0]} ${marker.creator.surname?.[0] ? `${marker.creator.surname?.[0]}` : ''}`}`);
            } else {
              d3
                .select('#formation')
                .select(`.player-${marker.creator.player_id}`)
                .classed('out-field', false)
            }

            container
              .append('g')
              .attr('class', `substitution-${marker.id}`)
              .html(`<svg x="${x(coords_x) + 10}" y="${y(coords_y) - 30}" width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 3L5 5.88675V0.113249L0 3ZM4.5 3.5H11.6757V2.5H4.5V3.5Z" fill="#F81A1A"/>
                      <path d="M12 10L7 7.11325L7 12.8868L12 10ZM7.5 9.5L0.324325 9.5L0.324325 10.5L7.5 10.5L7.5 9.5Z" fill="#06A746"/>
                    </svg>`)
          }
        }, 0)
      } else {
        setTimeout(() => {
          const substitution = d3.select('#formation').select(`.substitution-${marker.id}`)
          d3
            .select('#formation')
            .select(`.player-${marker.recipient.player_id}`)
            .classed('out-field', false)

          d3
            .select('#formation')
            .select(`.player-${marker.creator.player_id}`)
            .classed('out-field', true)
          if (!substitution.empty()) {
            substitution.remove()
          }
        }, 0)
      }
    } catch (e) {
      // console.log('handle goal error', e);
    }
  }

  const handleAction = (marker: Marker, type: 'add' | 'delete') => {
    switch (marker.action.id) {
      case 65:
      case 100:
        handleGoal(marker, type);
        break;
      case 206:
      case 86:
        handleRedCard(marker, type);
        break;
      case 55:
        handleYellowCard(marker, type);
        break;
      case 77:
        handleSubstitution(marker, type);
        break;
      default:
        break;
    }
  }

  const nextAction = () => {
    if (currentActions?.length === actionMarkers.length) {
      return
    }
    setDisableNextButton(false);

    if (currentActions?.length === 0) {
      setCurrentActions([actionMarkers[0]]);
      setCurrentTime(+actionMarkers[0].second)
      handleAction(actionMarkers[0], 'add')
      if (!changeSideRef.current && +actionMarkers[0].second > secondHalfSeconds) {
        dispatch(formationActions.setChangeSide(true));
      }
      if (currentActions.length + 1 === actionMarkers.length) {
        setDisablePrevButton(false);
        setDisableNextButton(true);
        return
      }
    } else {
      setCurrentActions((prev) => [...prev, actionMarkers[prev.length]]);
      setCurrentTime(+actionMarkers[currentActions.length].second)
      handleAction(actionMarkers[currentActions.length], 'add')
      if (!changeSideRef.current && +actionMarkers[currentActions.length].second > secondHalfSeconds) {
        dispatch(formationActions.setChangeSide(true));
      }
      if (currentActions.length + 1 === actionMarkers.length) {
        setDisableNextButton(true);
        return
      }
    }
    setDisablePrevButton(false);
  }

  const prevAction = () => {
    if (currentActions?.length === 1) {
      setCurrentActions([])
      setCurrentTime(0)
      setDisablePrevButton(true);
      setDisableNextButton(false);
      handleAction(actionMarkers[0], 'delete')
      if (changeSideRef.current && +actionMarkers[0].second < secondHalfSeconds) {
        dispatch(formationActions.setChangeSide(false));
      }
      return;
    }
    setDisablePrevButton(false);
    setDisableNextButton(false);
    const newArr = [...currentActions];
    const deletedAction = newArr.pop();

    deletedAction && handleAction(deletedAction, 'delete')
    setCurrentActions(newArr)
    setCurrentTime(+newArr[newArr.length - 1].second)
    if (changeSideRef.current && +newArr[newArr.length - 1].second < secondHalfSeconds) {
      dispatch(formationActions.setChangeSide(false));
    }
  }

  // const resetSplitData = () => {
  //   setCurrentHalf('first_half');
  //   setCurrentSplitActions([]);
  //   setCurrentSplitTime('0-0');
  //   setCurrentTime(0);

  //   d3.select('#formation').selectAll('.yellow-card').remove();
  //   d3.select('#formation').selectAll('.red-card').remove();
  //   d3.select('#formation').selectAll('.goal').remove();
  //   d3.select('#formation').selectAll('.out-field').remove();
  // }

  // const handleSetSplitData = (half: keyof FormationSplitResponse, idx: number) => {
  //   if (actionSplitMarkers?.[half]?.[idx]?.[1]) {
  //     const newMarkers = actionSplitMarkers[half][idx][1].filter((item: any) => !availableTacticKeysIds.includes(item.action)).filter((item: any) => !item?.formation_change)
  //     setCurrentHalf(half);
  //     setCurrentSplitActions(newMarkers);
  //     const timeSplit = actionSplitMarkers[half][idx][0].split('-')[1] * 60;
  //     setCurrentSplitTime(actionSplitMarkers[half][idx][0]);
  //     setCurrentTime(timeSplit);

  //     d3.select('#formation').selectAll('.yellow-card').remove();
  //     d3.select('#formation').selectAll('.red-card').remove();
  //     d3.select('#formation').selectAll('.goal').remove();
  //     d3.select('#formation').selectAll('.out-field').remove();

  //     console.log(newMarkers, half, idx, actionSplitMarkers?.[half]?.[idx])

  //     newMarkers.map((marker: any) => {
  //       handleAction(marker, 'add');
  //     })
  //   }
  // }

  // const nextActionSplit = () => {
  //   if (currentSplitActions?.length === 0) {
  //     setDisablePrevButton(false);
  //     handleSetSplitData('first_half', 0)
  //   }

  //   if (
  //     currentHalf === 'first_half'
  //     && currentSplitTime !== actionSplitMarkers.first_half[actionSplitMarkers.first_half.length - 1][0]
  //   ) {
  //     const nextIndexItem = actionSplitMarkers.first_half.findIndex(((item: any) => item[0] === currentSplitTime));
  //     handleSetSplitData(
  //       'first_half',
  //       nextIndexItem + 1,
  //     )
  //   } else if (
  //     currentHalf === 'first_half'
  //     && currentSplitTime === actionSplitMarkers.first_half[actionSplitMarkers.first_half.length - 1][0]
  //   ) {
  //     dispatch(formationActions.setChangeSide(true));
  //     handleSetSplitData(
  //       'second_half',
  //       0,
  //     )
  //   } else if (
  //     currentHalf === 'second_half'
  //     && currentSplitTime !== actionSplitMarkers.second_half[actionSplitMarkers.second_half.length - 1][0]
  //   ) {
  //     const nextIndexItem = actionSplitMarkers.second_half.findIndex(((item: any) => item[0] === currentSplitTime));
  //     handleSetSplitData(
  //       'second_half',
  //       nextIndexItem + 1,
  //     )
  //   } else if (
  //     currentHalf === 'second_half'
  //     && currentSplitTime === actionSplitMarkers.second_half[actionSplitMarkers.second_half.length - 1][0]
  //   ) {
  //     setDisableNextButton(true);
  //   }
  // }

  // const prevActionSplit = () => {
  //   if (currentSplitActions?.length === 0) {
  //     setDisablePrevButton(false);
  //     return
  //   }

  //   if (
  //     currentHalf === 'first_half'
  //     && currentSplitTime !== actionSplitMarkers.first_half[0][0]
  //   ) {
  //     const nextIndexItem = actionSplitMarkers.first_half.findIndex(((item: any) => item[0] === currentSplitTime));
  //     handleSetSplitData(
  //       'first_half',
  //       nextIndexItem - 1,
  //     )
  //   } else if (
  //     currentHalf === 'first_half'
  //     && currentSplitTime === actionSplitMarkers.first_half[0][0]
  //   ) {
  //     resetSplitData();
  //     setDisablePrevButton(true);
  //   } else if (
  //     currentHalf === 'second_half'
  //     && currentSplitTime !== actionSplitMarkers.second_half[0][0]
  //   ) {
  //     const nextIndexItem = actionSplitMarkers.second_half.findIndex(((item: any) => item[0] === currentSplitTime));
  //     handleSetSplitData(
  //       'second_half',
  //       nextIndexItem - 1,
  //     )
  //   } else if (
  //     currentHalf === 'second_half'
  //     && currentSplitTime === actionSplitMarkers.second_half[0][0]
  //   ) {
  //     dispatch(formationActions.setChangeSide(false));
  //     handleSetSplitData(
  //       'first_half',
  //       actionSplitMarkers.second_half.length - 1,
  //     )
  //   }
  // }

  useEffect(() => {
    if (currentActionsRef.current?.length > 0) {
      d3.select('#formation').selectAll('.yellow-card').remove()
      d3.select('#formation').selectAll('.red-card').remove()
      d3.select('#formation').selectAll('.goal').remove()
      d3.select('#formation').selectAll('.out-field').remove()

      currentActionsRef.current.map((item) => handleAction(item, 'add'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeSide])

  return (
    <div className={cls.pitchWrapper}>
      <div className={cls.pitchContainer}>
        <div className={cls.teamTape}>
          <img
            className={cls.logoHome}
            src={
              changeSide
                ? match?.away_squad?.team?.logo
                ?? 'https://archive.org/download/no-photo-available/no-photo-available.png'
                : match?.home_squad?.team?.logo
                ?? 'https://archive.org/download/no-photo-available/no-photo-available.png'
            }
            alt='logo home team'
          />
          <svg
            width='60'
            viewBox='0 0 60 718'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 0H60V718L30 675.531L0 718V0Z'
              fill={
                changeSide
                  ? placementData?.match?.away_team?.color ?? '#171F2F'
                  : placementData?.match?.home_team?.color ?? '#171F2F'
              }
            />
          </svg>
          <svg
            width='54'
            viewBox='0 0 54 706'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M26.5801 663.969L0.5 704.306V0.5H53.5V704.306L27.4199 663.969L27 663.319L26.5801 663.969Z'
              stroke='white'
            />
          </svg>
          <span
            className={cls.teamNameHome}
            style={{
              color: changeSide
                ? placementData?.match?.away_team?.color_number ?? '#fff'
                : placementData?.match?.home_team?.color_number ?? '#fff',
            }}
          >
            {changeSide ? placementData?.match?.away_team?.name : placementData?.match?.home_team?.name}
          </span>
        </div>
        <div className={cls.pitchContainer}>
          <Formation
            teamColors={teamColors}
            placement={placementMarkers}
            match={currentMatch}
            stylesContainer={pitchContainerStyles}
            changeSide={changeSide}
          />
          <div className={cls.pitchFooter}>
            <div>{changeSide ? awayTacticKey : homeTacticKey}</div>
            <ChangeFormationTime
              disableNextButton={disableNextButton}
              disablePrevButton={disablePrevButton}
              nextAction={nextAction}
              prevAction={prevAction}
              time={currentTime}
            />
            <div>{changeSide ? homeTacticKey : awayTacticKey}</div>
          </div>
        </div>

        <div className={cls.teamTape}>
          <img
            className={cls.logoAway}
            src={
              changeSide
                ? match?.home_squad?.team?.logo
                ?? 'https://archive.org/download/no-photo-available/no-photo-available.png'
                : match?.away_squad?.team?.logo
                ?? 'https://archive.org/download/no-photo-available/no-photo-available.png'
            }
            alt='logo away team'
          />
          <svg
            width='60'
            viewBox='0 0 60 718'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0 0H60V718L30 675.531L0 718V0Z'
              fill={
                changeSide
                  ? placementData?.match?.home_team?.color ?? '#171F2F'
                  : placementData?.match?.away_team?.color ?? '#171F2F'
              }
            />
          </svg>
          <svg
            width='54'
            viewBox='0 0 54 706'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M26.5801 663.969L0.5 704.306V0.5H53.5V704.306L27.4199 663.969L27 663.319L26.5801 663.969Z'
              stroke='white'
            />
          </svg>
          <span
            className={cls.teamNameAway}
            style={{
              color: changeSide
                ? placementData?.match?.home_team?.color_number ?? '#fff'
                : placementData?.match?.away_team?.color_number ?? '#fff',
            }}
          >
            {changeSide ? placementData?.match?.home_team?.name : placementData?.match?.away_team?.name}
          </span>
        </div>
      </div>
    </div>
  )
}
