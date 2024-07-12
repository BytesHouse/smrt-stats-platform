import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useLexicon } from 'lib/hooks/useTranslates';
import { videoCutsActions } from '../../../../../store/video_cuts/videoCutsSlice';
import { CheckBox } from '../../../../ui/CheckBox/CheckBox';
import cls from './VideoCutsActionList.module.css';
import { Spinner } from '../../../../ui';
import { PlayIcon } from '../../../../ui/PlayIcon/PlayIcon';

export const VideoCutsActionListItem = ({
  action,
  handlePlayVideo,
  index,
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const videoCutsState = useSelector((state) => state.video_cuts.videoCuts);
  const currentIndex = useSelector((state) => state.video_cuts.indexCurrent)
  const quality = useSelector((state) => state.player.quality);
  const l = useLexicon();
  const checkBoxClasses = classNames({
    checked: true,
    unchecked: !action?.video,
  });
  const checkPlayVideo = index === currentIndex;
  const currentLink = action?.video_tracks?.find((track) => track.resolution === quality)?.link
      ?? action.video

  const handleChangeCheckCut = (checked, id) => {
    dispatch(videoCutsActions.toggleCheckCut({ checked, id }));
  };

  const handlePlay = () => {
    if (action?.video) {
      setIsLoading(true);
      handlePlayVideo(currentLink, action.second, action.id).finally(() => {
        setIsLoading(false);
        dispatch(videoCutsActions.setNextVideo(videoCutsState[index + 1]));
        dispatch(videoCutsActions.setIndexNext(index + 1));
        dispatch(videoCutsActions.setIndexCurrent(index));
      });
    } else {
      // eslint-disable-next-line no-alert
      alert(l(316));
    }
  };

  return (
    <div
      className={cls.videoCutsActionListItem}
      style={{ backgroundColor: checkPlayVideo ? '#202020' : '' }}
      title={`${
        action.creator ? `${action.creator.display_name}` : ''
      }${action.creator_team?.name ? ` - ${action.creator_team?.name} ` : ''}, ${
        action.action
      }`}
    >
      {isLoading ? (
        <Spinner size='small' />
      ) : (
        <div className={cls.videoCutsPlayBtn} onClick={handlePlay}>
          <PlayIcon />
        </div>
      )}
      <p>{action.title}</p>
      <CheckBox
        className={checkBoxClasses}
        checked={action.checked}
        onChange={(value) => handleChangeCheckCut(value, action.id)}
      />
    </div>
  );
};
