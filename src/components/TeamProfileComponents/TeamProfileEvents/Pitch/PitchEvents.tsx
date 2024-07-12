import { memo } from 'react';
import { usePitch } from './hooks/usePitch';
import type { TPitchEvent } from './types';
import { HintDot } from './components/HintDot';
import { Pen } from './components/Pen';

export const PitchEvents = memo((props: TPitchEvent) => {
  const { selectedDot, setShowDraw } = usePitch(props)

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/mouse-events-have-key-events */}
      <Pen setShowDraw={setShowDraw} />
      <div id='pitch-events'>
        <HintDot marker={selectedDot} />
      </div>
    </>
  )
})
