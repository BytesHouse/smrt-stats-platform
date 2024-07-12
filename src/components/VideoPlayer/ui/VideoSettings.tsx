import { ChangeEvent, MutableRefObject } from 'react';
import { IconComponent } from '../../../assets/icons';
import { useLexicon } from '../../../lib/hooks/useTranslates';

type TQuality ={
  active: boolean,
  link: string,
  resolution: number,
}

type TVideoSettings = {
  fetchFile:() => void,
  handleChangeQuality: (quality: number) => void,
  handleChangeSpeed:(e: ChangeEvent<HTMLInputElement>) => void,
  handleChangeVolume:(e: ChangeEvent<HTMLInputElement>) => void,
  playbackRate: number,
  qualities: Array<TQuality>,
  speedSlider: MutableRefObject<null | HTMLInputElement>,
  volumeSlider: MutableRefObject<null | HTMLInputElement>,
}

interface NoResolutionsProps {
  text: string,
}

const NoResolutions = ({ text }:NoResolutionsProps) => (
  <span className='video-settings__empty-block'>{text}</span>
)

export const VideoSettings = ({
  fetchFile,
  handleChangeQuality,
  handleChangeSpeed,
  handleChangeVolume,
  playbackRate,
  qualities,
  speedSlider,
  volumeSlider,
}: TVideoSettings) => {
  const l = useLexicon();

  return (
    <div>
      <div className='video-settings__actions'>
        <div className='video-settings__btns'>
          {qualities?.length
            ? qualities.map(({ active, resolution }) => (
              <div
                key={resolution}
                onClick={() => handleChangeQuality(resolution)}
                className={`video-settings__btn-quality${active ? ' active' : ''}`}
              >
                {resolution}
              </div>
            ))
            : (<NoResolutions text={l(311)} />)}
        </div>
        <div className='video-volume-slider_container'>
          {l(448)}
          <input
            ref={volumeSlider}
            className='video-volume-slider'
            type='range'
            min={0}
            max={1}
            step='any'
            defaultValue={0}
            onChange={handleChangeVolume}
          />
          <div className='video-volume__icons'>
            <IconComponent.SOUND_ON />
            <IconComponent.SOUND_OFF />
          </div>
        </div>
        <div className='video-speed-control'>
          {l(449)} x{playbackRate}
          <input
            ref={speedSlider}
            className='video-speed-control__slider'
            type='range'
            min={0.25}
            max={4}
            step='0.25'
            defaultValue={playbackRate}
            onChange={handleChangeSpeed}
          />
        </div>
        <div
          id='downloadBtn'
          className='video-settings__btn-download'
          onClick={fetchFile}
        >
          {l(116)}
        </div>
      </div>
    </div>
  )
}
