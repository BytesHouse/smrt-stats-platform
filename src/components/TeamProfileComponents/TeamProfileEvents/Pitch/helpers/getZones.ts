import { TMarker } from '../types';
import { TSelectedZone } from '../hooks/usePitchZone';

export type TZones ={
  height: number,
  lineColor?: string,
  markers: Array<TMarker>,
  pitchMultiplier: number,
  quantity: number,
  showDraw?: boolean,
  step?: number,
  width: number,
}

export type Zone = {
  color: string,
  count: Record<number, TMarker>,
  height: number,
  id: number,
  width: number,
  x: number,
  y: number,
}

export type Circle = {
  color: string,
  count: Array<TMarker>,
  cx: number,
  cy: number,
  r: number,
}

export type TResponseZone = {
  circles: Array<Circle>,
  handleClickZone?: (markers: Record<number, Record<number, TMarker> | null>) => void,
  lineColor?: string,
  selectedMarkers?: TSelectedZone,
  zones: Array<Zone>,
}

export const getZones = ({
  width,
  height,
  quantity,
  step = quantity,
  markers,
  pitchMultiplier,
}: TZones) => {
  const zones = []
  const circles = []
  const columns = quantity % step !== 0 ? quantity : step
  const zoneWidth = step ? (width / columns) : (width / quantity)
  const zoneHeight = step ? (height / (quantity / columns)) : height

  let x = 0;
  let y = 0;

  for (let i = 0; i < quantity; i++) {
    if (i % columns === 0 && i) {
      x = 0
      y += zoneHeight
    } else if (i) {
      x += zoneWidth
    }
    const zone = {
      color: 'rgba(0, 0, 0, 0.2)',
      count: {},
      height: zoneHeight,
      id: i,
      width: zoneWidth,
      x,
      y,
    }

    // eslint-disable-next-line no-loop-func
    markers.forEach((marker) => {
      const markerInZone = Number(marker.coord_x) * pitchMultiplier >= x
          && (Number(marker.coord_x) * pitchMultiplier) <= x + zoneWidth
          && (Number(marker.coord_y) * pitchMultiplier) >= y
          && (Number(marker.coord_y) * pitchMultiplier) <= y + zoneHeight

      if (markerInZone) {
        zone.count = {
          ...zone.count,
          [marker.id]: marker,
        }
      }
    })

    zones.push(zone)
    circles.push({
      color: 'rgba(104, 134, 189, 0.68)',
      count: markers.filter(
        // eslint-disable-next-line
        ({ coord_x, coord_y }) => (
          Number(coord_x) * pitchMultiplier) >= x
              && (Number(coord_x) * pitchMultiplier) <= x + zoneWidth
              && (Number(coord_y) * pitchMultiplier) >= y
              && (Number(coord_y) * pitchMultiplier) <= y + zoneHeight,
      ),
      cx: x + zoneWidth / 2,
      cy: y + zoneHeight / 2,
      id: i,
      r: 30,
    })
  }
  return { circles, zones };
}
