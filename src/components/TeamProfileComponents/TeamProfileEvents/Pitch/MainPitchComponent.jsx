import cls from './Pitch.module.css';
import { PitchEvents } from './PitchEvents';
import { PitchTabs } from './PitchTabs';
import { WatchEvents } from './WatchEvents';

export const MainPitchComponent = (props) => {
  const {
    foundedActionsCount,
    loadingEvents,
    resultMarkers,
    setfoundedActionsCount,
  } = props;
  return (
    <div className={cls.pitchContainer}>
      <PitchTabs />
      <WatchEvents
        count={foundedActionsCount || 0}
        setCount={setfoundedActionsCount}
        loadingEvents={loadingEvents}
        resultMarkers={resultMarkers}
      />
      <PitchEvents resultMarkers={resultMarkers} />
    </div>
  );
};
