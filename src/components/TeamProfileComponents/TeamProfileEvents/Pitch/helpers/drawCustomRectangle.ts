import * as d3 from 'd3';
// import { colorEvents } from 'components/TeamProfileComponents/TeamProfileEvents/Pitch/constants';
import { TMarker } from '../types';

export const drawCustomRectangle = ({
  handleClickZone,
  height,
  markers,
  pitchMultiplier,
  showDraw,
  width,
}: {
  handleClickZone?: (markers: Record<number, Record<number, TMarker> | null>) => void,
  height: number,
  markers: Array<TMarker>,
  pitchMultiplier: number,
  showDraw?: boolean,
  width: number,
}) => {
  let brushExtent: Array<Array<number>> = []

  const isInBrushExtent = (d: TMarker) => brushExtent?.length
      && Number(d.coord_x) * pitchMultiplier >= brushExtent[0][0]
      && Number(d.coord_x) * pitchMultiplier <= brushExtent[1][0]
      && Number(d.coord_y) * pitchMultiplier >= brushExtent[0][1]
      && Number(d.coord_y) * pitchMultiplier <= brushExtent[1][1]

  const pitch = d3
    .select('#pitch-events')
    .select('svg')
    .select('g')

  const zonesContainer = pitch.append('g').attr('class', 'brush');

  const updatedData = (brushZone: Array<Array<number>>) => markers?.reduce((acc, mark) => {
    if (mark && isInBrushExtent(mark) && brushZone.length) {
      return {
        ...acc,
        [mark.id]: mark,
      }
    }
    return acc
  }, {})
  const handleBrush = (e: { selection: Array<Array<number>> }) => {
    brushExtent = e.selection

    update()

    updatedData && handleClickZone && handleClickZone({
      0: updatedData(brushExtent),
    })
  }

  const brush = d3.brush()
    ?.extent([[0, 0], [width, height]])
    .on('start', handleBrush)

  const initBrush = () => {
    zonesContainer.call(brush);
  }

  const update = () => {
    if (showDraw) {
      pitch
        .selectAll('.circle-event')
        .data(markers)
        // .style('fill', (d) => (
        //   isInBrushExtent(d)
        //     ? (colorEvents[d.action_group_title as keyof typeof colorEvents] ?? 'red')
        //     : 'black'))
        .style('fill', (d) => (
          isInBrushExtent(d)
            ? 'red'
            : 'black'))
    } else {
      pitch
        .selectAll('.circle-event')
        .data(markers)
        // eslint-disable-next-line max-len
        // .style('fill', (d) => (colorEvents[d.action_group_title as keyof typeof colorEvents] ?? 'red'))
        .style('fill', 'red')
    }
  }

  if (showDraw) {
    initBrush();
  }
}
