import { tactics } from '../constants/tacticContsants';
import { TacticI, ZoneI } from '../types/tacticTypes';

export const getZonesTactic = (
  tactic: keyof TacticI,
  zonesArr: Array<ZoneI>,
) => {
  const currTactic = tactics[tactic];
  const tacticPositions = zonesArr.filter((item) => currTactic.includes(item.short_name));
  return tacticPositions;
};

export const getZoneByPositionId = (
  id: number,
  zonesArr: Array<ZoneI>,
) => {
  const zone = zonesArr.filter((item) => item.position_id === id);
  return zone?.[0] ?? null;
};

export const getZoneByActionId = (
  id: number,
  zonesArr: Array<ZoneI>,
) => {
  const zone = zonesArr.filter((item) => item.action_id === id);
  return zone?.[0] ?? null;
};

export const getZoneByShortName = (
  name: string,
  zonesArr: Array<ZoneI>,
) => {
  const zone = zonesArr.filter((item) => item.short_name === name);
  return zone?.[0] ?? null;
};

export const getCoordsPosInZone = (
  x1: number,
  x2: number,
  y1: number,
  y2: number,
) => ({
  x: +((x1 + x2) / 2).toFixed(2),
  y: +((y1 + y2) / 2).toFixed(2),
});
