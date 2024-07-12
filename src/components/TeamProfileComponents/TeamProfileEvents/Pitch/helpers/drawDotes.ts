import * as d3 from 'd3';
import { NavigateFunction } from 'react-router-dom';
import { TMarker } from '../types';
// import { colorEvents } from '../constants';

type TDotes = {
  height: number,
  markers: Array<TMarker>,
  navigate?: NavigateFunction,
  pitchMultiplier: number,
  setSelectedDot: (dot: TMarker | null) => void,
}
export const drawDotes = ({
  height,
  markers,
  navigate,
  pitchMultiplier,
  setSelectedDot,
}: TDotes) => {
  d3.select('.dotes_markers').remove();
  const pitch = d3.select('#pitch-events').select('svg').select('g');
  const dotesContainer = pitch.append('g').attr('class', 'dotes_markers');

  const dot = dotesContainer
    .selectAll('.dotesCircles')
    .data(markers);

  const dotes = dot
    .enter()
    .append('circle')
    .attr('id', (d) => d.id)
    .attr('class', 'circle-event')
    .attr('cx', (d) => (Number(d.coord_x) * pitchMultiplier))
    .attr('cy', (d) => (Number(d.coord_y) * pitchMultiplier))
    .attr('r', height / 80)
    // расскомментировать, когда появится поле action_group_title в /stats/events_search
    // .style('fill', (
    //   { action_group_title },
    // ) => (colorEvents[action_group_title as keyof typeof colorEvents] ?? 'red'))
    .style('fill', 'red')
    .style('stroke', 'black')
    .style('position', 'relative')

  dotes.on('click', (_, d) => {
    navigate?.(`/video_cuts?markers=${d.id}`);
  })

  dotes.on('mouseover', (event, d) => {
    setTimeout(() => {
      setSelectedDot({
        ...d,
        coord_x: event.clientX,
        coord_y: event.pageY,
      })
    }, 200)
  })

  dotes.on('mouseleave', () => {
    setTimeout(() => {
      setSelectedDot(null)
    }, 200)
  })
}
