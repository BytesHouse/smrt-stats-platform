/* eslint-disable postro4no/object-props */
import * as d3 from 'd3';
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { TMarker, TPitchEvent } from '../types';
import { drawDotes, drawDirection } from '../helpers';
import { usePitchZone } from './usePitchZone';

export const usePitch = (props: TPitchEvent) => {
  const navigate = useNavigate();
  const [selectedDot, setSelectedDot] = useState<TMarker | null>(null)
  const [showDraw, setShowDraw] = useState<boolean>(false)
  // @ts-ignore
  const pitchSettings = useSelector((state) => state.user.userProfile.pitchSettings)

  const {
    height: pitchHeight = 68,
    resultMarkers,
    width: pitchWidth = 105,
  } = props;

  const directions = resultMarkers?.filter(
    ({ coord_x_destination, coord_y_destination }) => coord_x_destination && coord_y_destination,
  )

  const lineColor = '#fff';
  const lineWidth = 3;
  const pitchMultiplier = 8;
  const margin = {
    bottom: 20, left: 20, right: 20, top: 20,
  };
  const width1 = pitchWidth * pitchMultiplier;
  const height1 = pitchHeight * pitchMultiplier;

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
      x1: 0, x2: pitchWidth, y1: 0, y2: 0,
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
  }, [
    pitchMultiplier,
    lineWidth,
    pitchWidth,
    pitchHeight,
  ]);

  const drawPitch = () => {
    const svg = d3
      .select('#pitch-events')
      .append('svg')
      .attr(
        'viewBox',
        `0 0 ${width1 + margin.left + margin.right} ${height1 + margin.top + margin.bottom
        }`,
      )
      .style(
        'background-image',
        'repeating-linear-gradient(to right, #64D36F 0 5%, #93F79D 0 10%)',
      )
      .style('width', '100%')
      .style('height', 'calc((100vh - 270px) * var(--scale-multiplier))')
      .style('border-radius', '5px');

    const pitch = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.right})`);

    pitch
      .append('rect')
      .attr('x', -margin.left)
      .attr('y', -margin.top)
      .attr('width', width1 + margin.left + margin.right)
      .attr('height', height1 + margin.top + margin.bottom)
      .style('fill', 'transparent')
    // background

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
  };

  useEffect(() => {
    drawPitch();
    return () => {
      d3.select('#pitch-events').selectAll('*').remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultMarkers])

  usePitchZone({
    height: height1,
    lineColor,
    markers: resultMarkers,
    pitchMultiplier,
    quantity: 18,
    showDraw,
    step: 6,
    width: width1,
  })

  useEffect(() => {
    if (pitchSettings?.direction && directions?.length) {
      drawDirection({ markers: directions, pitchMultiplier })
    } else {
      d3.select('.lines_markers').remove();
    }
    drawDotes({
      height: height1,
      markers: resultMarkers,
      navigate,
      pitchMultiplier,
      setSelectedDot,
    });

    return () => {
      d3.select('.dotes_markers').remove();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultMarkers, pitchSettings])

  return {
    selectedDot,
    setShowDraw,
    showDraw,
  }
}

