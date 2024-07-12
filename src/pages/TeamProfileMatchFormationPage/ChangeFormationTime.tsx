import {
  FC,
  useMemo,
} from 'react'
import cls from './TeamProfileMatchFormationPage.module.css';

interface ChangeFormationTimeProps {
  disableNextButton: boolean,
  disablePrevButton: boolean,
  nextAction: () => void,
  prevAction: () => void,
  time: number,
}

export const ChangeFormationTime: FC<ChangeFormationTimeProps> = (
  {
    disableNextButton,
    disablePrevButton,
    nextAction,
    prevAction,
    time,
  },
) => {
  const timeString = useMemo(() => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = Math.floor(time - (hours * 3600) - (minutes * 60));
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  }, [time]);

  return (
    <div className={cls.matchTime}>
      <svg style={{ opacity: disablePrevButton ? 0.5 : 1, pointerEvents: disablePrevButton ? 'none' : 'auto' }} onClick={prevAction} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path fill='none' d='M0 0h24v24H0z' /><path d='M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z' /></svg>
      <span>{timeString}</span>
      <svg style={{ opacity: disableNextButton ? 0.5 : 1, pointerEvents: disableNextButton ? 'none' : 'auto' }} onClick={nextAction} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'><path fill='none' d='M0 0h24v24H0z' /><path d='M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z' /></svg>
    </div>
  )
}
