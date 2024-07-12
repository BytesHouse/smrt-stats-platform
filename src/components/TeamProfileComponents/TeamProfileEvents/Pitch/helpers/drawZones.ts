import * as d3 from 'd3';
import type { TResponseZone } from './getZones';

export const drawZones = ({
  circles,
  handleClickZone,
  lineColor = 'white',
  zones,
}: TResponseZone) => {
  const pitch = d3
    .select('#pitch-events')
    .select('svg')
    .select('g')

  const zoneColorMap: Record<string, string> = {}

  const zonesContainer = pitch.append('g').attr('class', 'zones_markers');
  const zone = zonesContainer.append('g')

  zone
    .selectAll('.pitchLines')
    .enter()
    .append('line')
    .style('stroke-width', 10)
    .style('stroke', lineColor);

  zone
    .selectAll('.pitchCounts')
    .data(circles)
    .enter()
    .append('circle')
    .attr('cx', (d) => d.cx)
    .attr('cy', (d) => d.cy)
    .attr('r', (d) => d.r)
    .style('stroke-width', 1)
    .style('stroke', lineColor)
    .style('fill', (d) => d.color)

  zone
    .selectAll('text')
    .data(circles)
    .enter()
    .append('text')
    .text((d) => d.count.length ?? 0)
    .attr('y', (d, i) => d.cy + 10)
    .attr('x', (d) => d.cx)
    .attr('font-size', '24px')
    .attr('fill', 'white')
    .attr('text-anchor', 'middle')

  const zonesField = zone
    .selectAll('.pitchZones')
    .data(zones)
    .enter()
    .append('rect')
    .attr('class', 'pitchZone')
    .attr('x', (d) => d.x)
    .attr('y', (d) => d.y)
    .attr('width', (d) => d.width)
    .attr('height', (d) => d.height)
    .style('fill', (d) => d.color)
    .style('stroke', 'white')
    .style('stroke-width', 2)
    .style('cursor', 'pointer')

  zonesField?.on('click', (e, zoneField) => {
    const clickedZone = d3.select(e.currentTarget);
    if (zoneColorMap[zoneField.id]) {
      clickedZone.style('fill', zoneField.color);
      handleClickZone && handleClickZone({
        [zoneField.id]: null,
      })
      delete zoneColorMap[zoneField.id]
    } else {
      clickedZone.style('fill', 'rgba(0, 0, 0, 0)');
      zoneColorMap[zoneField.id] = 'rgba(0, 0, 0, 0)'
      handleClickZone && handleClickZone({
        [zoneField.id]: zoneField.count,
      })
    }
  })
}
