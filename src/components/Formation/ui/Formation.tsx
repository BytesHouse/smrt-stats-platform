/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable array-callback-return */
import * as d3 from 'd3';
import {
  CSSProperties,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Creator, Marker } from 'store/formation/formationTypes';
import {
  actionTactics,
  availableTacticKeysIds,
  tactics,
} from './constants/tacticContsants';
import {
  availableActionPositionIds,
  getLeftSideZones,
  getRightSideZones,
} from './constants/zonesData';
import { getZoneByShortName } from './helpers/helpers';
import {
  TacticI,
  tacticKeys,
  ZoneI,
} from './types/tacticTypes';

export interface PitchCircleI {
  id: number,
  player: Creator | null,
  zone: ZoneI,
}

interface PitchProps {
  changeSide?: boolean,
  height?: number,
  match: any,
  placement: Array<Marker>,
  stylesContainer?: CSSProperties,
  teamColors?: {
    awayColor: string,
    awayNumberColor: string,
    homeColor: string,
    homeNumberColor: string,
  },
  width?: number,
}

export const Formation: FC<PitchProps> = memo((props) => {
  const {
    changeSide = false,
    height: pitchHeight = 68,
    match,
    placement,
    stylesContainer,
    teamColors,
    width: pitchWidth = 105,
  } = props;

  // constant pitch variables
  const lineColor = '#ffffff';
  const lineWidth = 2;
  const pitchMultiplier = 8;
  const margin = useMemo(() => (
    {
      bottom: 20,
      left: 20,
      right: 20,
      top: 20,
    }
  ), []);
  const scaledPitchWidth = pitchWidth * pitchMultiplier;
  const scaledPitchHeight = pitchHeight * pitchMultiplier;

  const x = d3.scaleLinear().domain([0, pitchWidth]).range([0, scaledPitchWidth]);

  const y = d3.scaleLinear().domain([0, pitchHeight]).range([scaledPitchHeight, 0]);

  // squad tactics data
  const leftSidePlayers = useRef<Array<PitchCircleI>>([]);
  const rightSidePlayers = useRef<Array<PitchCircleI>>([]);

  const homeTacticRef = useRef<tacticKeys>('3-5-2');
  const awayTacticRef = useRef<tacticKeys>('3-5-2');

  const changeSideRef = useRef(false);

  // squad colors
  const kitColorHomeRef = useRef<string>('#ffffff');
  const numberColorHomeRef = useRef<string>('#000000');
  const kitColorAwayRef = useRef<string>('#ffffff');
  const numberColorAwayRef = useRef<string>('#000000');

  // get default data for draw pitch elements
  const getPitchLines = useCallback(() => {
    const lines = [];
    // left penalty box
    lines.push({
      x1: 0,
      x2: 16.5,
      y1: pitchHeight / 2 - 11 - 9.15,
      y2: pitchHeight / 2 - 11 - 9.15,
    });
    lines.push({
      x1: 16.5,
      x2: 16.5,
      y1: 13.85,
      y2: pitchHeight / 2 + 11 + 9.15,
    });
    lines.push({
      x1: 0,
      x2: 16.5,
      y1: pitchHeight / 2 + 11 + 9.15,
      y2: pitchHeight / 2 + 11 + 9.15,
    });
    // left six-yard box
    lines.push({
      x1: 0,
      x2: 5.5,
      y1: pitchHeight / 2 - 9.15,
      y2: pitchHeight / 2 - 9.15,
    });
    lines.push({
      x1: 5.5,
      x2: 5.5,
      y1: pitchHeight / 2 - 9.15,
      y2: pitchHeight / 2 + 9.15,
    });
    lines.push({
      x1: 0,
      x2: 5.5,
      y1: pitchHeight / 2 + 9.15,
      y2: pitchHeight / 2 + 9.15,
    });
    // right penalty box
    lines.push({
      x1: pitchWidth - 16.5,
      x2: pitchWidth,
      y1: pitchHeight / 2 - 11 - 9.15,
      y2: pitchHeight / 2 - 11 - 9.15,
    });
    lines.push({
      x1: pitchWidth - 16.5,
      x2: pitchWidth - 16.5,
      y1: pitchHeight / 2 - 11 - 9.15,
      y2: pitchHeight / 2 + 11 + 9.15,
    });
    lines.push({
      x1: pitchWidth - 16.5,
      x2: pitchWidth,
      y1: pitchHeight / 2 + 11 + 9.15,
      y2: pitchHeight / 2 + 11 + 9.15,
    });
    // right six-yard box
    lines.push({
      x1: pitchWidth - 5.5,
      x2: pitchWidth,
      y1: pitchHeight / 2 - 9.15,
      y2: pitchHeight / 2 - 9.15,
    });
    lines.push({
      x1: pitchWidth - 5.5,
      x2: pitchWidth - 5.5,
      y1: pitchHeight / 2 - 9.15,
      y2: pitchHeight / 2 + 9.15,
    });
    lines.push({
      x1: pitchWidth - 5.5,
      x2: pitchWidth,
      y1: pitchHeight / 2 + 9.15,
      y2: pitchHeight / 2 + 9.15,
    });
    // outside borders
    lines.push({
      x1: 0,
      x2: pitchWidth,
      y1: 0,
      y2: 0,
    });
    lines.push({
      x1: 0,
      x2: pitchWidth,
      y1: pitchHeight,
      y2: pitchHeight,
    });
    lines.push({
      x1: 0,
      x2: 0,
      y1: 0,
      y2: pitchHeight,
    });
    lines.push({
      x1: pitchWidth,
      x2: pitchWidth,
      y1: 0,
      y2: pitchHeight,
    });
    // middle line
    lines.push({
      x1: pitchWidth / 2,
      x2: pitchWidth / 2,
      y1: 0,
      y2: pitchHeight,
    });
    // left goal
    lines.push({
      x1: -1.5,
      x2: -1.5,
      y1: pitchHeight / 2 - 7.32 / 2,
      y2: pitchHeight / 2 + 7.32 / 2,
    });
    lines.push({
      x1: -1.5,
      x2: 0,
      y1: pitchHeight / 2 - 7.32 / 2,
      y2: pitchHeight / 2 - 7.32 / 2,
    });
    lines.push({
      x1: -1.5,
      x2: 0,
      y1: pitchHeight / 2 + 7.32 / 2,
      y2: pitchHeight / 2 + 7.32 / 2,
    });
    // right goal
    lines.push({
      x1: pitchWidth + 1.5,
      x2: pitchWidth + 1.5,
      y1: pitchHeight / 2 - 7.32 / 2,
      y2: pitchHeight / 2 + 7.32 / 2,
    });
    lines.push({
      x1: pitchWidth,
      x2: pitchWidth + 1.5,
      y1: pitchHeight / 2 - 7.32 / 2,
      y2: pitchHeight / 2 - 7.32 / 2,
    });
    lines.push({
      x1: pitchWidth,
      x2: pitchWidth + 1.5,
      y1: pitchHeight / 2 + 7.32 / 2,
      y2: pitchHeight / 2 + 7.32 / 2,
    });
    return lines;
  }, [pitchWidth, pitchHeight]);

  const getPitchCircles = useCallback(() => {
    const circles = [];
    // center circle
    circles.push({
      color: 'none',
      cx: pitchWidth / 2,
      cy: pitchHeight / 2,
      r: 9.15,
    });
    // left penalty spot
    circles.push({
      color: lineColor,
      cx: 11,
      cy: pitchHeight / 2,
      r: 0.3,
    });
    // right penalty spot
    circles.push({
      color: lineColor,
      cx: pitchWidth - 11,
      cy: pitchHeight / 2,
      r: 0.3,
    });
    // kick-off circle
    circles.push({
      color: lineColor,
      cx: pitchWidth / 2,
      cy: pitchHeight / 2,
      r: 0.3,
    });
    return circles;
  }, [pitchWidth, pitchHeight, lineColor]);

  const getArcs = useCallback(() => {
    const arcs = [];
    const cornerRadius = 1 * pitchMultiplier;
    const penaltyRadius = 9.15 * pitchMultiplier;
    // left top corner
    arcs.push({
      arc: {
        endAngle: Math.PI,
        innerRadius: cornerRadius,
        outerRadius: cornerRadius + lineWidth,
        startAngle: (1 / 2) * Math.PI,
      },
      x: 0,
      y: 0,
    });
    // left bottom corner
    arcs.push({
      arc: {
        endAngle: 0,
        innerRadius: cornerRadius,
        outerRadius: cornerRadius + lineWidth,
        startAngle: (1 / 2) * Math.PI,
      },
      x: 0,
      y: pitchHeight,
    });
    // right top corner
    arcs.push({
      arc: {
        endAngle: Math.PI,
        innerRadius: cornerRadius,
        outerRadius: cornerRadius + lineWidth,
        startAngle: (3 / 2) * Math.PI,
      },
      x: pitchWidth,
      y: 0,
    });
    // right bottom corner
    arcs.push({
      arc: {
        endAngle: (3 / 2) * Math.PI,
        innerRadius: cornerRadius,
        outerRadius: cornerRadius + lineWidth,
        startAngle: 2 * Math.PI,
      },
      x: pitchWidth,
      y: pitchHeight,
    });
    // left penalty arc
    arcs.push({
      arc: {
        endAngle: Math.PI - Math.sin(6.5 / 9.15),
        innerRadius: penaltyRadius,
        outerRadius: penaltyRadius + lineWidth,
        startAngle: Math.sin(6.5 / 9.15),
      },
      x: 11,
      y: pitchHeight / 2,
    });
    // right penalty arc
    arcs.push({
      arc: {
        endAngle: -(Math.PI - Math.sin(6.5 / 9.15)),
        innerRadius: penaltyRadius,
        outerRadius: penaltyRadius + lineWidth,
        startAngle: -Math.sin(6.5 / 9.15),
      },
      x: pitchWidth - 11,
      y: pitchHeight / 2,
    });
    return arcs;
  }, [pitchMultiplier, lineWidth, pitchWidth, pitchHeight]);

  // function for drawing main pitch elements(gates, penalty areas, corners, etc.)
  const drawPitchElements = useCallback((
    pitch: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
  ) => {
    pitch
      .selectAll('.pitchLines')
      .data(getPitchLines)
      .enter()
      .append('line')
      .attr('x1', (d) => d.x1 * pitchMultiplier)
      .attr('x2', (d) => d.x2 * pitchMultiplier)
      .attr('y1', (d) => d.y1 * pitchMultiplier)
      .attr('y2', (d) => d.y2 * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', lineColor);

    pitch
      .selectAll('.pitchCircles')
      .data(getPitchCircles)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.cx * pitchMultiplier)
      .attr('cy', (d) => d.cy * pitchMultiplier)
      .attr('r', (d) => d.r * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', lineColor)
      .style('fill', (d) => d.color);

    const arc = d3.arc();
    pitch
      .selectAll('.pitchCorners')
      .data(getArcs)
      .enter()
      .append('path')
      .attr('d', (d) => arc(d.arc))
      .attr(
        'transform',
        (d) => `translate(${pitchMultiplier * d.x},${pitchMultiplier * d.y})`,
      )
      .style('fill', lineColor);
  }, [getArcs, getPitchCircles, getPitchLines])

  // function for drawing left side players
  const drawLeftPlayerCircles = useCallback((
    playersContainer: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
    players?: Array<PitchCircleI>,
  ) => {
    const player = playersContainer
      .selectAll('.pitchCircles')
      .data(players || leftSidePlayers.current);
    const playerEnterEl = player
      .enter()
      .filter((d) => Boolean(d.zone))
      .append('g')
      .attr('id', (d) => d.id)
      .attr(
        'class',
        (d) => `player-${d.player?.player_id ? d.player.player_id : 'without-id'}${d.zone.short_name === 'GK' ? ' GK-circle' : ''
        }`,
      );

    playerEnterEl
      .append('circle')
      .attr('class', 'tactic')
      .attr('cx', (d) => x(d.zone!.coords_pos.x))
      .attr('cy', (d) => y(d.zone!.coords_pos.y))
      .attr('r', scaledPitchHeight / 30)
      .style(
        'fill',
        changeSideRef.current
          ? kitColorAwayRef.current
          : kitColorHomeRef.current,
      )
      .append('svg:title')
      .filter((d) => Boolean(d?.player))
      .attr(
        'id',
        (d) => `player-${d.player?.player_id ? d.player.player_id : 'without-id'}`,
      )
      .text(
        (d) => `${d.player?.number ? `[${d.player?.number}] ` : ' '}${d.player?.name} ${d.player?.surname ? `${d.player.surname}` : ''}`,
      );

    playerEnterEl
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'fill',
        changeSideRef.current
          ? numberColorAwayRef.current
          : numberColorHomeRef.current,
      )
      .style('font-size', pitchHeight / 30 / (((pitchHeight / 30) * 7) / 100))
      .style('font-weight', 600)
      .style('pointer-events', 'none')
      .attr('x', (d) => x(d.zone!.coords_pos.x))
      .attr('y', (d) => y(d.zone!.coords_pos.y - 0.5))
      .filter((d) => Boolean(d?.player))
      .attr(
        'id',
        (d) => `player-${d.player?.player_id ? d.player.player_id : 'without-id'}`,
      )
      .text((d) => (d.player?.number ? `${d.player?.number}` : `${d.player?.name?.[0]} ${d.player?.surname?.[0] ? `${d.player?.surname?.[0]}` : ''}`));
  }, [pitchHeight, scaledPitchHeight, x, y])

  // function for drawing right side players
  const drawRightPlayerCircles = useCallback((
    playersContainer: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
    players?: Array<PitchCircleI>,
  ) => {
    const player = playersContainer
      .selectAll('.pitchCircles')
      .data(players || rightSidePlayers.current);
    const playerEnterEl = player
      .enter()
      .filter((d) => Boolean(d.zone))
      .append('g')
      .attr('id', (d) => d.id)
      .attr(
        'class',
        (d) => `player-${d.player?.player_id ? d.player.player_id : 'without-id'}${d.zone.short_name === 'GK' ? ' GK-circle' : ''
        }`,
      )

    playerEnterEl
      .append('circle')
      .attr('class', 'tactic')
      .attr('cx', (d) => x(d.zone!.coords_pos.x))
      .attr('cy', (d) => y(d.zone!.coords_pos.y))
      .attr('r', scaledPitchHeight / 30)
      .style(
        'fill',
        changeSideRef.current
          ? kitColorHomeRef.current
          : kitColorAwayRef.current,
      )
      .append('svg:title')
      .filter((d) => Boolean(d?.player))
      .attr(
        'id',
        (d) => `player-${d.player?.player_id ? d.player.player_id : 'without-id'}`,
      )
      .text(
        (d) => `${d.player?.number ? `[${d.player?.number}] ` : ' '}${d.player?.name} ${d.player?.surname ? `${d.player.surname}` : ''}`,
      );

    playerEnterEl
      .append('text')
      .attr('text-anchor', 'middle')
      .attr(
        'fill',
        changeSideRef.current
          ? numberColorHomeRef.current
          : numberColorAwayRef.current,
      )
      .style('font-size', pitchHeight / 30 / (((pitchHeight / 30) * 7) / 100))
      .style('font-weight', 600)
      .style('pointer-events', 'none')
      .attr('x', (d) => x(d.zone!.coords_pos.x))
      .attr('y', (d) => y(d.zone!.coords_pos.y - 0.5))
      .filter((d) => Boolean(d?.player))
      .attr(
        'id',
        (d) => `player-${d.player?.player_id ? d.player.player_id : 'without-id'}`,
      )
      .text((d) => (d.player?.number ? `${d.player?.number}` : `${d.player?.name?.[0]} ${d.player?.surname?.[0] ? `${d.player?.surname?.[0]}` : ''}`));
  }, [pitchHeight, scaledPitchHeight, x, y])

  // main function for drawing all pitch elements
  const drawPitch = useCallback(() => {
    const svg = d3
      .select('#formation')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${scaledPitchWidth + margin.left + margin.right} ${scaledPitchHeight + margin.top + margin.bottom
        }`,
      )
      .style(
        'background-image',
        'repeating-linear-gradient(to right, #7ec659 0 5%, #8fcd65 0 10%)',
      )
      .on('contextmenu', (event, d) => {
        event.preventDefault();
      })
      .style('width', '100%');

    const pitch = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.right})`);
    pitch
      .append('rect')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', scaledPitchWidth + margin.left + margin.right)
      .attr('height', scaledPitchHeight + margin.top + margin.bottom)
      .style('fill', 'transparent');

    drawPitchElements(pitch);

    const playersLeftContainer = pitch
      .append('g')
      .attr('class', 'players_left');

    drawLeftPlayerCircles(playersLeftContainer);

    const playersRightContainer = pitch
      .append('g')
      .attr('class', 'players_right');

    drawRightPlayerCircles(playersRightContainer);
  }, [
    drawLeftPlayerCircles,
    drawPitchElements,
    drawRightPlayerCircles,
    margin,
    scaledPitchHeight,
    scaledPitchWidth,
  ])

  // convert tactic markers to circles data for drawing on the pitch
  const getPlayersPositionsFromPlacementMarkers = useCallback((
    placementData: Array<Marker>,
    changeSideProp = false,
  ) => {
    let homeTactic = [] as Array<PitchCircleI>;
    let awayTactic = [] as Array<PitchCircleI>;

    let homeTacticKey = '3-5-2';
    let awayTacticKey = '3-5-2';

    let isHomeTac = 0;

    // get tactic keys
    placementData.map((item) => {
      if (availableTacticKeysIds.includes(item?.action?.id)) {
        const tac = Object.entries(actionTactics).filter(
          ([_, value]) => value === item.action.id,
        );
        if (tac.length > 0 && isHomeTac === 0) {
          isHomeTac = 1;
          // eslint-disable-next-line prefer-destructuring
          homeTacticKey = tac[0][0];
        } else if (tac.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          awayTacticKey = tac[0][0];
        }
      }
    });

    const tactic_home = tactics[homeTacticKey as keyof TacticI];
    const tactic_away = tactics[awayTacticKey as keyof TacticI];

    placementData.map((item, idx) => {
      if (availableActionPositionIds.includes(item?.action?.id)) {
        const isHome = item?.creator?.team_id === match.home_squad.team.id;

        if (isHome) {
          const player = item.creator || null;

          homeTactic.push({
            id: idx + 1,
            player,
            zone: getZoneByShortName(item.action.title, changeSideProp
              ? getRightSideZones()
              : getLeftSideZones())
            ,
          });
        } else {
          const player = item.creator || null;

          awayTactic.push({
            id: idx + 1,
            player,
            zone: getZoneByShortName(item.action.title, changeSideProp
              ? getLeftSideZones()
              : getRightSideZones()),
          });
        }
      }
    });

    if (homeTactic.length !== 11) {
      homeTactic = tactic_home.map((name, idx) => ({
        id: idx + 1,
        player: homeTactic[idx]?.player || null,
        zone: getZoneByShortName(name, changeSideProp
          ? getRightSideZones()
          : getLeftSideZones()),
      }));
    }

    if (awayTactic.length !== 11) {
      awayTactic = tactic_away.map((name, idx) => ({
        id: idx + 1,
        player: awayTactic[idx]?.player || null,
        zone: getZoneByShortName(name, changeSideProp
          ? getLeftSideZones()
          : getRightSideZones()),
      }));
    }

    leftSidePlayers.current = changeSideProp ? awayTactic : homeTactic;
    rightSidePlayers.current = changeSideProp ? homeTactic : awayTactic;
  }, [match])

  useEffect(() => {
    const prepeareCirclesData = () => {
      if (leftSidePlayers.current?.length === 11) {
        return;
      }
      const tactic = tactics[homeTacticRef.current];
      leftSidePlayers.current = tactic.map((name, idx) => ({
        id: idx + 1,
        player: null,
        zone: getZoneByShortName(name, getLeftSideZones()),
      }));

      if (rightSidePlayers.current?.length === 11) {
        return;
      }
      rightSidePlayers.current = tactics[awayTacticRef.current].map(
        (name, idx) => ({
          id: idx + 1,
          player: null,
          zone: getZoneByShortName(name, getRightSideZones()),
        }),
      );
    };

    prepeareCirclesData();
    drawPitch();

    return () => {
      d3.select('#formation').selectAll('*').remove();
      leftSidePlayers.current = [];
      rightSidePlayers.current = [];
      kitColorAwayRef.current = '#ffffff';
      numberColorAwayRef.current = '#000000';
      kitColorHomeRef.current = '#ffffff';
      numberColorHomeRef.current = '#000000';
    };
  }, [drawPitch]);

  useEffect(() => {
    if (placement?.length > 0 && teamColors) {
      kitColorAwayRef.current = teamColors.awayColor;
      numberColorAwayRef.current = teamColors.awayNumberColor;
      kitColorHomeRef.current = teamColors.homeColor;
      numberColorHomeRef.current = teamColors.homeNumberColor;
      getPlayersPositionsFromPlacementMarkers(placement, changeSide)
      d3.select('#formation').selectAll('*').remove();
      changeSideRef.current = changeSide
      drawPitch();
    }
  }, [placement, getPlayersPositionsFromPlacementMarkers, drawPitch, teamColors, changeSide])

  return (
    <div style={stylesContainer && stylesContainer}>
      <div id='formation' />
    </div>
  )
})
