/* eslint-disable postro4no/object-props */
import React, {
  useEffect,
  useCallback,
  useRef,
} from 'react';
import * as d3 from 'd3';
import cls from './Pitch.module.css';
import { awayTactics, homeTactics } from './tactics/tacticts';

export const Pitch = (props) => {
  const {
    height: pitchHeight = 68,
    width: pitchWidth = 105,
    widthContainer = '46vw',
  } = props;

  // constants variables
  const lineColor = '#fff';
  const lineWidth = 1;
  const pitchMultiplier = 8;
  const margin = {
    bottom: 20, left: 20, right: 20, top: 20,
  };
  const width1 = pitchWidth * pitchMultiplier;
  const height1 = pitchHeight * pitchMultiplier;

  const pitchHomePlayers = useRef([]);
  const pitchAwayPlayers = useRef([]);

  const x = d3.scaleLinear().domain([0, 100]).range([0, width1]);

  const y = d3.scaleLinear().domain([0, 100]).range([height1, 0]);

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
      x1: 0, x2: pitchWidth, y1: pitchHeight, y2: pitchHeight,
    });
    lines.push({
      x1: 0, x2: 0, y1: 0, y2: pitchHeight,
    });
    lines.push({
      x1: pitchWidth, x2: pitchWidth, y1: 0, y2: pitchHeight,
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
      color: lineColor, cx: 11, cy: pitchHeight / 2, r: 0.3,
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
    const cornerRadius = pitchMultiplier;
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

  useEffect(() => {
    pitchHomePlayers.current = homeTactics['3-4-3'];
    pitchAwayPlayers.current = awayTactics['3-5-2'];
    drawPitch();

    return () => {
      d3.select('#pitch').selectAll('*').remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function drawPitch() {
    const svg = d3
      .select('#pitch')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width1 + margin.left + margin.right} ${height1 + margin.top + margin.bottom
        }`,
      )
      .style(
        'background-image',
        'repeating-linear-gradient(to right, #7ec659 0 5%, #8fcd65 0 10%)',
      )
      .style('width', '100%')
    // .on("click", function (event) {
    //   var coords = d3.pointer(event);
    //   const x = coords[0] / pitchMultiplier;
    //   const y =
    //     (height1 + margin.top + margin.bottom - coords[1]) / pitchMultiplier;
    //   console.log(x, y);
    // });

    const pitch = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.right})`);
    pitch
      .append('rect')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', width1 + margin.left + margin.right)
      .attr('height', height1 + margin.top + margin.bottom)
      .style('fill', 'transparent');
    // background

    const pitchLineData = getPitchLines;
    pitch
      .selectAll('.pitchLines')
      .data(pitchLineData)
      .enter()
      .append('line')
      .attr('x1', (d) => d.x1 * pitchMultiplier)
      .attr('x2', (d) => d.x2 * pitchMultiplier)
      .attr('y1', (d) => d.y1 * pitchMultiplier)
      .attr('y2', (d) => d.y2 * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', lineColor);

    const pitchCircleData = getPitchCircles;
    pitch
      .selectAll('.pitchCircles')
      .data(pitchCircleData)
      .enter()
      .append('circle')
      .attr('cx', (d) => d.cx * pitchMultiplier)
      .attr('cy', (d) => d.cy * pitchMultiplier)
      .attr('r', (d) => d.r * pitchMultiplier)
      .style('stroke-width', lineWidth)
      .style('stroke', lineColor)
      .style('fill', (d) => d.color);
    // circle

    const pitchArcData = getArcs;
    const arc = d3.arc();
    pitch
      .selectAll('.pitchCorners')
      .data(pitchArcData)
      .enter()
      .append('path')
      .attr('d', (d) => arc(d.arc))
      .attr(
        'transform',
        (d) => `translate(${pitchMultiplier * d.x},${pitchMultiplier * d.y})`,
      )
      .style('fill', lineColor);

    // draw players home

    if (pitchHomePlayers.current) {
      const colors = ['255,255,255', '0,0,0'];
      const playersContainer = pitch.append('g').attr('class', 'players_home');

      const player = playersContainer
        .selectAll('.pitchCircles')
        .data(pitchHomePlayers.current);
      const playerEnterEl = player
        .enter()
        .append('g')
        .attr('id', (d) => d.id);
      playerEnterEl
        .append('circle')
        .attr('class', 'tactic')
        .attr('cx', (d) => x(d.x))
        .attr('cy', (d) => y(d.y))
        .attr('r', height1 / 30)
        .style('fill', `rgb(${colors[0]})`)
        .filter((d) => Boolean(d?.player))
        .append('svg:title')
        .attr('id', (d) => `${d?.player?.id}`)
        .text(
          (d) => `[${d?.player?.number}] ${d?.player?.name} ${d.player?.surname}`,
        );

      playerEnterEl
        .filter((d) => Boolean(d?.player))
        .append('text')
        .attr('id', (d) => `player-${d?.player?.id}`)
        .attr('text-anchor', 'middle')
        .attr('fill', `rgb(${colors[1]})`)
        .style('font-size', height1 / 30 / (((height1 / 30) * 7) / 100))
        .style('font-weight', 600)
        .style('pointer-events', 'none')
        .attr('x', (d) => x(d.x))
        .attr('y', (d) => y(d.y - 1))
        .text((d) => `${d.player?.number}`);
    }

    if (pitchAwayPlayers.current) {
      const colors = ['255,255,255', '0,0,0'];
      const playersContainer = pitch.append('g').attr('class', 'players_away');

      const player = playersContainer
        .selectAll('.pitchCircles')
        .data(pitchAwayPlayers.current);
      const playerEnterEl = player
        .enter()
        .append('g')
        .attr('id', (d) => d.id);
      playerEnterEl
        .append('circle')
        .attr('class', 'tactic')
        .attr('cx', (d) => x(d.x))
        .attr('cy', (d) => y(d.y))
        .attr('r', height1 / 30)
        .style('fill', `rgb(${colors[0]})`)
        .filter((d) => Boolean(d?.player))
        .append('svg:title')
        .attr('id', (d) => `${d?.player?.id}`)
        .text(
          (d) => `[${d?.player?.number}] ${d?.player?.name} ${d.player?.surname}`,
        );

      playerEnterEl
        .filter((d) => Boolean(d?.player))
        .append('text')
        .attr('id', (d) => `player-${d?.player?.id}`)
        .attr('text-anchor', 'middle')
        .attr('fill', `rgb(${colors[1]})`)
        .style('font-size', height1 / 30 / (((height1 / 30) * 7) / 100))
        .style('font-weight', 600)
        .style('pointer-events', 'none')
        .attr('x', (d) => x(d.x))
        .attr('y', (d) => y(d.y - 1))
        .text((d) => `${d.player?.number}`);
    }
  }

  return (
    <div className={cls.pitchContainer}>
      <div
        id='pitch'
        style={{
          width: widthContainer,
        }}
      />
      <div className='d3-context-menu' />
      <div className={cls.pitchFooter}>
        <div>3-4-3</div>
        <div className={cls.matchTime}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path fill='none' d='M0 0h24v24H0z' /><path d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z' /></svg>
          <span>00:00</span>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path fill='none' d='M0 0h24v24H0z' /><path d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' /></svg>
        </div>
        <div>3-5-2</div>
      </div>
    </div>
  )
}
