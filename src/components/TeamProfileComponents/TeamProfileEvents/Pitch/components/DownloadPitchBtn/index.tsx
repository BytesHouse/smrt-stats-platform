import React from 'react';
import html2canvas from 'html2canvas';
import { useLexicon } from 'lib/hooks/useTranslates';
import { IconComponent } from 'assets/icons';
import { ScDownloadWrapper } from './styled';

export const DownloadPitchBtn = () => {
  const handleDownloadPitchEvents = () => {
    const pitch = document.getElementById('pitch-events')
    pitch && html2canvas(pitch)
      .then((canvas) => {
        const filename = `${Date.now()}_pitch_events.jpeg`;
        const data = canvas.toDataURL('image/jpeg', 1.0);
        const a = document.createElement('a');
        a.href = data;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      // eslint-disable-next-line no-alert
      }).catch((e) => alert(`Get picture error, ${e}`));
  };
  const l = useLexicon();

  return (
    <ScDownloadWrapper
      onClick={handleDownloadPitchEvents}
      title={l(28) ?? ''}
    >
      <IconComponent.DOWNLOAD />
    </ScDownloadWrapper>
  );
};
