import { ReactElement } from 'react';
import { Substitution } from './Substitution';
import { BallIcon } from './BallIcon';
import { RedCard } from './RedCard';
import { YellowCard } from './YellowCard';

export type EventMap = {
  Goal: ReactElement,
  'Red card': ReactElement,
  Substitution: ReactElement,
  'Yellow card': ReactElement,
};

export const eventsIcon: EventMap = {
  Goal: <BallIcon />,
  'Red card': <RedCard />,
  Substitution: <Substitution />,
  'Yellow card': <YellowCard />,
}
