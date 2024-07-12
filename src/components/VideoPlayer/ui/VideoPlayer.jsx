// import video from "@/shared/assets/video/woman-football.mp4";
import {
  useState,
  useEffect,
  useRef,
} from 'react';
import './VideoPlayer.css';
import { useDispatch, useSelector } from 'react-redux';
import { IconComponent } from 'assets/icons';
import { addPlaylist, getCutVideo } from 'requests';
import { recordPlaylist } from 'requests/records/recordPlaylist';
import { Notification } from 'components/Notification';
import { Offset } from 'components/Offset';
import { AddPlayListModal } from 'components/VideoCuts/ui/VideoCutsPanel/AddPlayListModal/AddPlayListModal';
import { addEventsToPlaylist } from 'requests/playlists/addEventsToPlaylist';
import { convertIsoToYyyyMmDd } from 'lib/helpers/formatDate';
import { RecordIcon } from 'assets/icons/RecordIcon';
import { VideoSettings } from './VideoSettings';
import { videoCutsActions } from '../../../store/video_cuts/videoCutsSlice';
import { playerActions } from '../../../store/player/playerSlice';

export const VideoPlayer = ({
  handleSwitchEvent,
  playNextVideo,
  video: videoLink,
  videoInfo,
  videoStyles = {},
  videoStylesContainer = {},
}) => {
  const videoRef = useRef(null);
  const videoContainer = useRef(null);
  const playPauseBtn = useRef(null);
  const totalTimeElem = useRef(null);
  const currentTimeElem = useRef(null);
  const timelineContainer = useRef(null);
  const volumeSlider = useRef(null);
  const speedSlider = useRef(null);
  const pausedOverlay = useRef(null);

  const wasPaused = useRef(true);
  const isScrubbing = useRef(false);
  const dispatch = useDispatch();

  const nextVideo = useSelector((state) => state.video_cuts.nextVideo);
  const videoCutsState = useSelector((state) => state.video_cuts.videoCuts);
  const index = useSelector((state) => state.video_cuts.indexNext);
  const indexCurrent = useSelector((state) => state.video_cuts.indexCurrent);
  const currentIndex = useSelector((state) => state.video_cuts.indexCurrent);
  const [showSettings, setShowSettings] = useState(false);
  const [qualities, setQualities] = useState([]);
  const [paused, setPaused] = useState(false);
  const [recordTime, setRecordTime] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [record, setRecord] = useState(null);
  const formationInfo = useSelector((state) => state.user.userProfile);
  const [addPlaylistOpenModal, setAddPlaylistOpenModal] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)

  const activeQuality = qualities?.find(({ active }) => active);
  const handleKeyDown = (e) => {
    const tagName = document?.activeElement?.tagName.toLowerCase();

    if (tagName === 'input') return;
    // TODO: исправить на keyCode
    switch (e.key.toLowerCase()) {
      case ' ':
        if (tagName === 'button') return;
        togglePlay();
        break;
      case 'f':
        toggleFullScreenMode();
        break;
      case 'arrowleft':
      case 'j':
        skip(-1);
        break;
      case 'arrowright':
      case 'l':
        skip(1);
        break;
      default:
        break;
    }
  };

  function fetchFile(url) {
    const tempUrl = url;
    const aTag = document.createElement('a');
    aTag.href = tempUrl;
    // eslint-disable-next-line
    aTag.download = url.replace(/^.*[\\\/]/, '');
    document.body.appendChild(aTag);
    aTag.click();
    URL.revokeObjectURL(tempUrl);
    aTag.remove();
  }

  const handleSavePlaylist = async () => {
    try {
      if (recordTime?.startTime) {
        await getCutVideo({
          end: Math.ceil(recordTime.endTime ?? videoRef.current.currentTime),
          path: videoCutsState[indexCurrent]?.video ?? videoLink,
          start: Math.floor(recordTime.startTime),
        });

        const videoParams = videoCutsState[indexCurrent] || videoInfo
        const params = {
          end_second: Math.ceil(
            recordTime.endTime ?? videoRef.current.currentTime,
          ),
          start_second: Math.floor(recordTime.startTime),
        };

        if (videoInfo?.link) {
          params.video_id = videoInfo?.id;
        } else {
          params.event_id = videoCutsState[indexCurrent]?.id || videoInfo?.id;
        }
        if (!selectedPlaylist?.id) {
          const playlist = await addPlaylist({
            title: selectedPlaylist?.title,
          })
          const newRecord = await addEventsToPlaylist({
            event: [{
              ...params,
              title: `Record from ${params.start_second} to ${params.end_second}`,
            }],
            playlistId: playlist.data?.id,
          });
          setRecord(newRecord.data);
        } else {
          const newRecord = await addEventsToPlaylist({
            event: [{
              ...params,
              title: `Record from ${params.start_second} to ${params.end_second}`,
            }],
            playlistId: selectedPlaylist?.id,
          });
          setRecord(newRecord.data);
        }
        setIsShowNotification(true);
        setRecordTime(null)
        setTimeout(() => {
          setIsShowNotification(false);
          setRecord(null);
        }, 15000);
      }
    } catch (e) {
      setIsShowNotification(false);
    }
  };

  const playNext = async () => {
    await handleSavePlaylist();

    if (handleSwitchEvent) {
      handleSwitchEvent(1);
      return;
    }

    playNextVideo(nextVideo.video, nextVideo.second, nextVideo.id);
    dispatch(videoCutsActions.setIndexNext(index + 1));
    dispatch(videoCutsActions.setIndexCurrent(index));
    dispatch(videoCutsActions.setNextVideo(videoCutsState[index + 1]));
  };

  const playPrevious = async () => {
    await handleSavePlaylist();

    if (handleSwitchEvent) {
      handleSwitchEvent(-1);
      return;
    }
    const previousVideo = videoCutsState[currentIndex - 1];
    playNextVideo(previousVideo?.video, previousVideo?.second, previousVideo?.id);
    dispatch(videoCutsActions.setIndexNext(currentIndex - 1));
    dispatch(videoCutsActions.setNextVideo(videoCutsState[currentIndex - 1]));
    dispatch(videoCutsActions.setIndexCurrent(currentIndex - 1));
  };

  useEffect(() => {
    if (videoInfo || videoCutsState.length) {
      // TODO: убрать, если это не сломает автовоспроизведение видео
      // videoRef.current.play();
      const tracks = videoCutsState?.length
        ? videoCutsState[index - 1]?.video_tracks
        : videoInfo?.tracks;

      setQualities(
        tracks?.map((quality, ind) => ({ ...quality, active: ind === 0 })),
      );
      dispatch(playerActions.setQuality(activeQuality?.resolution));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoInfo, videoLink, index, videoCutsState]);

  const handleChangeQuality = (resolution) => {
    if (resolution === activeQuality.resolution) return;

    setQualities((prev) => prev.map((qual) => ({
      ...qual,
      active: resolution === qual.resolution,
    })));
    dispatch(playerActions.setQuality(resolution));
  };

  useEffect(() => {
    // togglePlay()
  }, [activeQuality]);

  const formatDuration = (time) => {
    const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
      minimumIntegerDigits: 2,
    });
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);
    if (hours === 0) {
      return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
    }
    return `${hours}:${leadingZeroFormatter.format(
      minutes,
    )}:${leadingZeroFormatter.format(seconds)}`;
  };

  useEffect(() => {
    const handleLoadedData = () => {
      if (totalTimeElem?.current) {
        totalTimeElem.current.textContent = formatDuration(
          videoRef.current?.duration || 0,
        );
      }
      setPaused(true);
      videoRef.current.play();
    };

    const handleVideoTimeUpdate = () => {
      if (currentTimeElem.current && timelineContainer.current) {
        currentTimeElem.current.textContent = formatDuration(
          videoRef.current?.currentTime || 0,
        );
        const percent = videoRef.current
          ? // eslint-disable-next-line no-unsafe-optional-chaining
          videoRef.current?.currentTime / videoRef.current?.duration
          : 0;
        timelineContainer.current.style.setProperty(
          '--progress-position',
          percent.toString(),
        );
      }
    };

    const handleAddClassToVideoContainer = () => {
      videoContainer.current?.classList.add('paused');
      pausedOverlay.current?.classList.add('active');
    };

    const handleRemoveClassToVideoContainer = () => {
      videoContainer.current?.classList.remove('paused');
      pausedOverlay.current?.classList.remove('active');
    };

    const handleMouseUpFromTimeLine = (e) => {
      if (isScrubbing.current) toggleScrubbing(e);
    };

    playPauseBtn.current?.addEventListener('click', togglePlay);

    videoRef.current?.addEventListener('click', togglePlay);
    videoRef.current?.addEventListener('loadeddata', handleLoadedData);
    videoRef.current?.addEventListener('timeupdate', handleVideoTimeUpdate);
    videoRef.current?.addEventListener(
      'play',
      handleRemoveClassToVideoContainer,
    );
    videoRef.current?.addEventListener('pause', handleAddClassToVideoContainer);
    videoRef.current?.addEventListener('volumechange', onVolumeChange);
    videoRef.current?.addEventListener('ratechange', onSpeedChange);

    document.addEventListener('keydown', handleKeyDown);

    timelineContainer.current?.addEventListener('mousedown', toggleScrubbing);
    document.addEventListener('mouseup', handleMouseUpFromTimeLine);
    document.addEventListener('fullscreenchange', () => {
      videoContainer?.current?.classList.toggle(
        'full-screen',
        document.fullscreenElement,
      );
    });

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      playPauseBtn.current?.removeEventListener('click', togglePlay);
      videoRef.current?.removeEventListener('click', togglePlay);
      videoRef.current?.removeEventListener('loadeddata', handleLoadedData);
      videoRef.current?.removeEventListener(
        'timeupdate',
        handleVideoTimeUpdate,
      );
      videoRef.current?.removeEventListener(
        'play',
        handleRemoveClassToVideoContainer,
      );
      videoRef.current?.removeEventListener(
        'pause',
        handleAddClassToVideoContainer,
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoRef.current?.removeEventListener('volumechange', onVolumeChange);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoRef.current?.removeEventListener('ratechange', onSpeedChange);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timelineContainer.current?.removeEventListener(
        'mousedown',
        toggleScrubbing,
      );

      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mouseup', handleMouseUpFromTimeLine);
      document.removeEventListener('fullscreenchange', () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        videoContainer?.current?.classList.toggle(
          'full-screen',
          document.fullscreenElement,
        );
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    setShowSettings(false);
    wasPaused.current = !videoRef.current?.paused;
    videoRef.current?.paused
      ? videoRef.current?.play()
      : videoRef.current?.pause();
    setPaused(!videoRef.current?.paused);
  };

  function skip(duration) {
    if (videoRef.current) {
      videoRef.current.currentTime += duration;
    }
  }

  function toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
      videoContainer?.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  function onVolumeChange() {
    if (volumeSlider.current && videoRef.current && videoContainer.current) {
      volumeSlider.current.value = videoRef.current.volume.toString();
      let volumeLevel;
      if (videoRef.current.muted || videoRef.current.volume === 0) {
        volumeSlider.current.value = '0';
        volumeLevel = 'muted';
      } else if (videoRef.current.volume >= 0.5) {
        volumeLevel = 'high';
      } else {
        volumeLevel = 'low';
      }

      videoContainer.current.dataset.volumeLevel = volumeLevel;
    }
  }

  function onSpeedChange() {
    if (speedSlider.current && videoRef.current && videoContainer.current) {
      videoRef.current.playbackRate = speedSlider.current.value;
    }
  }

  function toggleScrubbing(e) {
    const rect = timelineContainer.current?.getBoundingClientRect();
    if (rect && videoContainer.current && videoRef.current) {
      const percent =
        Math.min(Math.max(0, e.x * 1.33 - rect.x), rect.width) / rect.width;
      // eslint-disable-next-line no-bitwise
      isScrubbing.current = (e.buttons & 1) === 1;
      videoContainer.current.classList.toggle('scrubbing', isScrubbing.current);
      if (isScrubbing.current) {
        wasPaused.current = videoRef.current.paused;
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = percent * videoRef.current.duration;
        if (!wasPaused.current) videoRef.current.play();
      }
    }

    handleTimelineUpdate(e);
  }

  function handleTimelineUpdate(e) {
    if (timelineContainer.current && videoRef.current) {
      const rect = timelineContainer.current.getBoundingClientRect();
      const percent =
        Math.min(Math.max(0, e.x * 1.33 - rect.x), rect.width) / rect.width;

      if (isScrubbing) {
        e.preventDefault();
        timelineContainer.current.style.setProperty(
          '--progress-position',
          percent.toString(),
        );
      }
    }
  }

  const handleChangeVolume = (e) => {
    if (videoRef.current) {
      videoRef.current.volume = +e.target.value;
      videoRef.current.muted = +e.target.value === 0;
    }
  };

  const handleChangeSpeed = (e) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = +e.target.value;
      setPlaybackRate(e.target.value);
    }
  };

  const toogleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleScreenshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current?.videoWidth;
    canvas.height = videoRef.current?.videoHeight;

    if (videoRef.current) {
      const context = canvas.getContext('2d');
      context.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current?.videoWidth,
        videoRef.current?.videoHeight,
      );
    }
    const dataURL = canvas.toDataURL('image/jpeg');

    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `Screenshot_${videoRef.current?.currentTime}_match_${videoCutsState[indexCurrent]?.title}.jpeg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleRecord = async (second) => {
    if (!recordTime?.startTime) {
      setRecord(null);
      setRecordTime({ startTime: second });
    } else if (recordTime?.startTime && recordTime.startTime < second) {
      setRecordTime((prev) => ({ ...prev, endTime: second }));
      !paused && togglePlay()
      setAddPlaylistOpenModal(true)
      // await handleSavePlaylist();
    }
  };
  const handleChangeSecond = (second) => {
    videoRef.current.currentTime += second;
  };

  const video1 = document.getElementById('video');
  if (video1) {
    // eslint-disable-next-line func-names
    video1.onwaiting = function () {
      document.getElementById('spinner').style.display = 'block';
    };
  }

  if (video1) {
    // eslint-disable-next-line func-names
    video1.onplaying = function () {
      document.getElementById('spinner').style.display = 'none';
    };
  }
  return (
    <div
      ref={videoContainer}
      style={videoStylesContainer}
      className='video-container paused'
      data-volume-level='high'
    >
      <div className={`video-settings${showSettings ? ' opened' : ''}`}>
        <svg
          onClick={toogleSettings}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='24'
          height='24'
        >
          <path fill='none' d='M0 0h24v24H0z' />
          <path d='M2.213 14.06a9.945 9.945 0 0 1 0-4.12c1.11.13 2.08-.237 2.396-1.001.317-.765-.108-1.71-.986-2.403a9.945 9.945 0 0 1 2.913-2.913c.692.877 1.638 1.303 2.403.986.765-.317 1.132-1.286 1.001-2.396a9.945 9.945 0 0 1 4.12 0c-.13 1.11.237 2.08 1.001 2.396.765.317 1.71-.108 2.403-.986a9.945 9.945 0 0 1 2.913 2.913c-.877.692-1.303 1.638-.986 2.403.317.765 1.286 1.132 2.396 1.001a9.945 9.945 0 0 1 0 4.12c-1.11-.13-2.08.237-2.396 1.001-.317.765.108 1.71.986 2.403a9.945 9.945 0 0 1-2.913 2.913c-.692-.877-1.638-1.303-2.403-.986-.765.317-1.132 1.286-1.001 2.396a9.945 9.945 0 0 1-4.12 0c.13-1.11-.237-2.08-1.001-2.396-.765-.317-1.71.108-2.403.986a9.945 9.945 0 0 1-2.913-2.913c.877-.692 1.303-1.638.986-2.403-.317-.765-1.286-1.132-2.396-1.001zM4 12.21c1.1.305 2.007 1.002 2.457 2.086.449 1.085.3 2.22-.262 3.212.096.102.195.201.297.297.993-.562 2.127-.71 3.212-.262 1.084.45 1.781 1.357 2.086 2.457.14.004.28.004.42 0 .305-1.1 1.002-2.007 2.086-2.457 1.085-.449 2.22-.3 3.212.262.102-.096.201-.195.297-.297-.562-.993-.71-2.127-.262-3.212.45-1.084 1.357-1.781 2.457-2.086.004-.14.004-.28 0-.42-1.1-.305-2.007-1.002-2.457-2.086-.449-1.085-.3-2.22.262-3.212a7.935 7.935 0 0 0-.297-.297c-.993.562-2.127.71-3.212.262C13.212 6.007 12.515 5.1 12.21 4a7.935 7.935 0 0 0-.42 0c-.305 1.1-1.002 2.007-2.086 2.457-1.085.449-2.22.3-3.212-.262-.102.096-.201.195-.297.297.562.993.71 2.127.262 3.212C6.007 10.788 5.1 11.485 4 11.79c-.004.14-.004.28 0 .42zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
        </svg>
        {showSettings && (
          <VideoSettings
            fetchFile={() => fetchFile(activeQuality?.link ?? videoLink)}
            handleChangeQuality={handleChangeQuality}
            handleChangeVolume={handleChangeVolume}
            handleChangeSpeed={handleChangeSpeed}
            playbackRate={playbackRate}
            qualities={qualities}
            volumeSlider={volumeSlider}
            speedSlider={speedSlider}
          />
        )}
      </div>

      <div className='video-controls-container'>
        <div ref={currentTimeElem} className='current-time'>
          0:00
        </div>
        <div ref={timelineContainer} className='timeline-container'>
          <div className='timeline'>
            <div className='thumb-indicator' />
            {recordTime?.startTime && (
              <>
                <div
                  className='record-point__timeline'
                  style={{
                    left: `${
                      (recordTime.startTime / videoRef.current.duration) * 100
                    }%`,
                    width: `calc(${
                      (((recordTime.endTime ?? videoRef.current.currentTime) -
                        recordTime.startTime) /
                        videoRef.current.duration) *
                      100
                    }%)`,
                  }}
                />
                <div
                  className='record-point'
                  style={{
                    left: `${
                      (recordTime.startTime / videoRef.current.duration) * 100
                    }%`,
                  }}
                >
                  <div className='record-point__time'>
                    {formatDuration(recordTime.startTime)}
                  </div>
                  <IconComponent.RECORD_POINT />
                </div>
              </>
            )}
            {recordTime?.endTime && (
              <div
                className='record-point'
                style={{
                  left: `${
                    (recordTime.endTime / videoRef.current.duration) * 100
                  }%`,
                }}
              >
                <div className='record-point__time'>
                  {formatDuration(recordTime.endTime)}
                </div>
                <IconComponent.RECORD_POINT />
              </div>
            )}
          </div>
        </div>
        <div className='controls'>
          <div className='controls__left'>
            <button
              onClick={() => setAddPlaylistOpenModal((prev) => !prev)}
              type='button'
            >
              <IconComponent.ADD_TO_PLAYLIST />
            </button>
            <button
              type='button'
              className='controls__left-record-btn'
              onClick={() => handleRecord(videoRef.current?.currentTime ?? 0)}
            >
              <RecordIcon fill={recordTime?.startTime && !recordTime?.endTime ? 'red' : 'white'} />
            </button>
            <button type='button' className='controls__left-screenshot-btn' onClick={handleScreenshot}>
              <IconComponent.SCREENSHOT />
            </button>
            <Offset
              offset_range_begin={formationInfo?.offset_range_begin}
              offset_range_end={formationInfo?.offset_range_end}
            />
          </div>
          <div className='controls__main'>
            <div
              className='controls__main-rewind controls__main-rewind--left'
              onClick={playPrevious}
              title='Previous episode'
            >
              <IconComponent.REWIND_CIRCLE />
            </div>
            <div
              className='player-control-icon'
              onClick={() => handleChangeSecond(-10)}
              title='- 10 seconds'
            >
              <IconComponent.MINUS_10SEC />
            </div>
            <div
              className='player-control-icon'
              onClick={() => handleChangeSecond(-5)}
              title='- 5 seconds'
            >
              <IconComponent.MINUS_5SEC />
            </div>
            {!paused ? (
              <div
                className='player-play-button player-control-icon'
                onClick={togglePlay}
              >
                <IconComponent.PLAY_CIRCLE />
              </div>
            ) : (
              <div className='player-pause-icon' onClick={togglePlay}>
                | |
              </div>
            )}
            <div
              className='player-control-icon'
              onClick={() => handleChangeSecond(5)}
              title='+ 5 seconds'
            >
              <IconComponent.PLUS_5SEC />
            </div>
            <div
              className='player-control-icon'
              onClick={() => handleChangeSecond(10)}
              title='+ 10 seconds'
            >
              <IconComponent.PLUS_10SEC />
            </div>
            <div
              onClick={playNext}
              className='controls__main-rewind controls__main-rewind--right'
              title='Next episode'
            >
              <IconComponent.REWIND_CIRCLE />
            </div>
          </div>
          <div className='controls__right'>
            <button type='button' onClick={toggleFullScreenMode}>
              <IconComponent.FULL_SCREEN />
            </button>
          </div>
        </div>
      </div>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        style={videoStyles}
        ref={videoRef}
        src={videoInfo && activeQuality?.link ? activeQuality?.link : videoLink}
        id='video'
        onEnded={playNext}
        autoPlay
        // muted={timelineContainer.current > 0}
        muted
        playsInline
        crossOrigin='anonymous'
      />
      {/* add playlist modal */}
      {addPlaylistOpenModal && (
        <AddPlayListModal
          hideModal={() => setAddPlaylistOpenModal(false)}
          title1={recordTime?.endTime ? 'ADD RECORD TO NEW PLAYLIST' : ''}
          title2={recordTime?.endTime ? 'ADD RECORD TO PLAYLIST' : ''}
          record={record}
          setSelectedPlaylist={setSelectedPlaylist}
          handleSavePlaylist={handleSavePlaylist}
        />
      )}
      <div className='spinner' id='spinner' />
      {isShowNotification && record && (
        <Notification handleClose={() => setIsShowNotification(false)}>
          Your recorded video has been saved into
          <a
            href='/profile/playlist'
            target='_blank'
            style={{ fontWeight: 'bold', textDecoration: 'underline' }}
            rel='noreferrer'
          >
            “Playlist”
          </a> folder.
          You can view it now by clicking on it or access it
          later via “My profile” tab.
        </Notification>
      )}
    </div>
  );
};
