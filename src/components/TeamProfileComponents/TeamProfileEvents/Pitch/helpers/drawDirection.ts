import * as d3 from 'd3';
import { TMarker } from '../types';
import { colorEvents } from '../constants';

type TLine = {
  markers: Array<TMarker>,
  pitchMultiplier: number,
}
export const drawDirection = ({
  markers,
  pitchMultiplier,
}: TLine) => {
  d3.select('.lines_markers').remove();
  const pitch = d3.select('#pitch-events').select('svg').select('g');

  const linesContainer = pitch.append('g').attr('class', 'lines_markers');

  // build the arrow.
  Object.entries(colorEvents).forEach(([action, color]) => {
    linesContainer
      .append('marker')
      .attr('id', `arrow-${action}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 8)
      .attr('markerWidth', 8)
      .attr('markerHeight', 8)
      .attr('orient', 'auto')
      .style('fill', 'none')
      .style('stroke', `${color}`)
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5');
  })

  linesContainer
    .selectAll('.dotesLines')
    .data(markers)
    .enter()
    .append('line')
    .attr('x1', (d) => Number(d.coord_x) * pitchMultiplier)
    .attr('x2', (d) => Number(d.coord_x_destination) * pitchMultiplier)
    .attr('y1', (d) => Number(d.coord_y) * pitchMultiplier)
    .attr('y2', (d) => Number(d.coord_y_destination) * pitchMultiplier)
    .attr('marker-end', (d) => `url(#arrow-${d?.action})`)
    .style('stroke-width', 0.8)
    // eslint-disable-next-line max-len
    // .style('stroke', (d) => (colorEvents[d?.action_group_title as keyof typeof colorEvents] ?? 'red'))
    .style('stroke', 'red')
    .style('position', 'relative')
}
