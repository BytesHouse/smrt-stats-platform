import { TMarker } from '../types';
import { Zone } from './getZones';

type TMarkerInZone = {
  markers: Array<TMarker>,
  pitchMultiplier: number,
  zone: Zone,
  zoneHeight: number,
  zoneWidth: number,
}

export const getMarkersInZone = ({
  markers,
  pitchMultiplier,
  zone,
  zoneHeight,
  zoneWidth,
}: TMarkerInZone) => markers.filter(
  ({ coord_x, coord_y }) => (
    Number(coord_x) * pitchMultiplier) >= zone.x
        && (Number(coord_x) * pitchMultiplier) <= zone.x + zoneWidth
        && (Number(coord_y) * pitchMultiplier) >= zone.y
        && (Number(coord_y) * pitchMultiplier) <= zone.y + zoneHeight,
)
