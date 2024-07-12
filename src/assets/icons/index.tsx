import { PlayCircleIcon } from 'assets/icons/PlayCircleIcon';
import { RewindCircleIcon } from 'assets/icons/RewindCircleIcon';
import { SettingsIcon } from 'assets/icons/SettingsIcon';
import { PlayIcon } from './PlayIcon';
import { SoundOffIcon } from './SoundOffIcon';
import { SoundOnIcon } from './SoundOnIcon';
import { SystemSettingsIcon } from './SystemSettingsIcon';
import { ArrowIcon } from './ArrowIcon';
import { DownloadIcon } from './DownloadIcon';
import { PenIcon } from './PenIcon';
import { CloseIcon } from './CloseIcon';
import { Plus5SecIcon } from './Plus5SecIcon';
import { Plus10SecIcon } from './Plus10SecIcon';
import { Minus10SecIcon } from './Minus10SecIcon';
import { Minus5SecIcon } from './Minus5SecIcon';
import { ScreenshotIcon } from './ScreenshotIcon';
import { FullScreenIcon } from './FullScreenIcon';
import { RecordIcon } from './RecordIcon';
import { RecordPointIcon } from './RecordPointIcon';
import { AddToPlaylistIcon } from './AddToPlaylistIcon';
import { EditIcon } from './EditIcon';

enum Icons {
  ADD_TO_PLAYLIST = 'ADD_TO_PLAYLIST',
  ARROW = 'ARROW',
  CLOSE = 'CLOSE',
  DOWNLOAD = 'DOWNLOAD',
  EDIT = 'EDIT',
  FULL_SCREEN = 'FULL_SCREEN',
  MINUS_10SEC = 'MINUS_10SEC',
  MINUS_5SEC = 'MINUS_5SEC',
  PEN = 'PEN',
  PLAY = 'PLAY',
  PLAY_CIRCLE = 'PLAY_CIRCLE',
  PLUS_10SEC = 'PLUS_10SEC',
  PLUS_5SEC = 'PLUS_5SEC',
  RECORD = 'RECORD',
  RECORD_POINT = 'RECORD_POINT',
  REWIND_CIRCLE = 'REWIND_CIRCLE',
  SCREENSHOT = 'SCREENSHOT',
  SETTINGS = 'SETTINGS',
  SOUND_OFF = 'SOUND_OFF',
  SOUND_ON = 'SOUND_ON',
  SYSTEM_SETTINGS = 'SYSTEM_SETTINGS'
}

export const IconComponent = {
  [Icons.PLAY]: () => <PlayIcon />,
  [Icons.SOUND_OFF]: () => <SoundOffIcon />,
  [Icons.SOUND_ON]: () => <SoundOnIcon />,
  [Icons.SYSTEM_SETTINGS]: () => <SystemSettingsIcon />,
  [Icons.ARROW]: () => <ArrowIcon />,
  [Icons.DOWNLOAD]: () => <DownloadIcon />,
  [Icons.PEN]: () => <PenIcon />,
  [Icons.SETTINGS]: () => <SettingsIcon />,
  [Icons.PLAY_CIRCLE]: () => <PlayCircleIcon />,
  [Icons.REWIND_CIRCLE]: () => <RewindCircleIcon />,
  [Icons.CLOSE]: () => <CloseIcon />,
  [Icons.PLUS_5SEC]: () => <Plus5SecIcon />,
  [Icons.PLUS_10SEC]: () => <Plus10SecIcon />,
  [Icons.MINUS_10SEC]: () => <Minus10SecIcon />,
  [Icons.MINUS_5SEC]: () => <Minus5SecIcon />,
  [Icons.SCREENSHOT]: () => <ScreenshotIcon />,
  [Icons.FULL_SCREEN]: () => <FullScreenIcon />,
  [Icons.RECORD]: () => <RecordIcon />,
  [Icons.RECORD_POINT]: () => <RecordPointIcon />,
  [Icons.ADD_TO_PLAYLIST]: () => <AddToPlaylistIcon />,
  [Icons.EDIT]: () => <EditIcon />,
};
