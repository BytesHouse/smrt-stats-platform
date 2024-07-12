import { MatchEvents } from './types';

export const colorEvents = {
  [MatchEvents.MISTAKES]: '#c10200',
  [MatchEvents.SHOTS]: '#ff881a',
  [MatchEvents.PASSES]: '#ffec45',
  [MatchEvents.ATTACKS]: '#ffffff',
  [MatchEvents.DUELS]: '#b4eb53',
  [MatchEvents.REFEREE_DECISIONS]: '#24f2ff',
  [MatchEvents.OTHER_EVENTS]: '#0a4fff',
  [MatchEvents.GK_EVENTS]: '#b925ff',
}
