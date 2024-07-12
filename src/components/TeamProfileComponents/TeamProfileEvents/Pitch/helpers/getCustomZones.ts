import {
  Circle,
  TResponseZone,
  TZones,
  Zone,
} from './getZones';

const customZones = (
  pitchHeight: number,
  pitchWidth: number,
  pitchMultiplier: number,
  quantity = 12,
) => {
  const correctParam = quantity === 14 ? 1 : 2

  const additionalZones = quantity === 14 ? [
    {
      height: ((pitchHeight / 2) + 11 - 4.85) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * correctParam,
      x: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * correctParam,
      y: (pitchHeight - pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
    },
    {
      height: ((pitchHeight / 2) + 11 - 4.85) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * correctParam,
      x: (pitchWidth - 16.5) * pitchMultiplier * correctParam,
      y: (pitchHeight - pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
    },
  ] : []
  return [
    /* угловые зоны */
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      x: 0,
      y: 0,
    },
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      x: (pitchWidth - 16.5 * 2) * pitchMultiplier,
      y: 0,
    },
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      x: 0,
      y: (pitchHeight - (pitchHeight / 2 - 11 - 9.15)) * pitchMultiplier,
    },
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      x: (pitchWidth - 16.5 * 2) * pitchMultiplier,
      y: (pitchHeight - (pitchHeight / 2 - 11 - 9.15)) * pitchMultiplier,
    },
    /* штрафные площади */
    {
      height: ((pitchHeight / 2) + 11 - 4.85) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * correctParam,
      x: 0,
      y: (pitchHeight - pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
    },
    {
      height: ((pitchHeight / 2) + 11 - 4.85) * pitchMultiplier,
      width: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * correctParam,
      x: (pitchWidth - 16.5 * 2) * pitchMultiplier,
      y: (pitchHeight - pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
    },
    /* центральные зоны сбоку */
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth / 4 - 6.85) * pitchMultiplier,
      x: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      y: 0,
    },
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth / 4 - 6.85) * pitchMultiplier,
      x: (pitchWidth - pitchWidth / 2) * pitchMultiplier,
      y: 0,
    },
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth / 4 - 6.85) * pitchMultiplier,
      x: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      y: (pitchHeight - (pitchHeight / 2 - 11 - 9.15)) * pitchMultiplier,
    },
    {
      height: (pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
      width: (pitchWidth / 4 - 6.85) * pitchMultiplier,
      x: (pitchWidth - pitchWidth / 2) * pitchMultiplier,
      y: (pitchHeight - (pitchHeight / 2 - 11 - 9.15)) * pitchMultiplier,
    },
    /* центр поля */
    {
      height: ((pitchHeight / 2) + 11 - 4.85) * pitchMultiplier,
      width: (pitchWidth / 4 - 6.85) * pitchMultiplier,
      x: (pitchWidth - (pitchWidth - 16.5)) * pitchMultiplier * 2,
      y: (pitchHeight - pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
    },
    {
      height: ((pitchHeight / 2) + 11 - 4.85) * pitchMultiplier,
      width: (pitchWidth / 4 - 6.85) * pitchMultiplier,
      x: (pitchWidth / 2) * pitchMultiplier,
      y: (pitchHeight - pitchHeight / 2 - 11 - 9.15) * pitchMultiplier,
    },
    ...additionalZones,
  ]
}

export const getCustomZones = ({
  height,
  markers,
  pitchMultiplier,
  quantity,
  width,
}: TZones): TResponseZone => {
  const zones: Array<Zone> = []
  const circles: Array<Circle> = []

  const pitchWidth = width / pitchMultiplier;
  const pitchHeight = height / pitchMultiplier;

  customZones(
    pitchHeight,
    pitchWidth,
    pitchMultiplier,
    quantity,
  )
    ?.forEach((zone, i) => {
      zones.push({
        color: 'rgba(0, 0, 0, 0.2)',
        count: markers.filter(
          ({ coord_x, coord_y }) => (
            Number(coord_x) * pitchMultiplier) >= zone.x
                && (Number(coord_x) * pitchMultiplier) <= zone.x + zone.width
                && (Number(coord_y) * pitchMultiplier) >= zone.y
                && (Number(coord_y) * pitchMultiplier) <= zone.y + zone.height,
        ),
        id: i,
        ...zone,
      })
      circles.push({
        color: 'rgba(104, 134, 189, 0.68)',
        count: markers.filter(
          ({ coord_x, coord_y }) => (
            Number(coord_x) * pitchMultiplier) >= zone.x
              && (Number(coord_x) * pitchMultiplier) <= zone.x + zone.width
              && (Number(coord_y) * pitchMultiplier) >= zone.y
              && (Number(coord_y) * pitchMultiplier) <= zone.y + zone.height,
        ),
        cx: zone.x + zone.width / 2,
        cy: zone.y + zone.height / 2,
        r: 30,
      })
    })

  return { circles, zones };
}
