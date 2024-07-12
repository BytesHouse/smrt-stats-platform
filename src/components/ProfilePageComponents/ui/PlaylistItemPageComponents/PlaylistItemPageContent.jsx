/* eslint-disable no-alert */

import React, { useEffect, useState } from 'react'
import { useLexicon } from 'lib/hooks/useTranslates'
import { Spinner } from 'components/ui'
import { useSearchParams } from 'react-router-dom'
import { $api, VIDEO_SERVICE_URL } from '../../../../config/api'
import { VideoPlayer } from '../../../VideoPlayer'
import cls from './PlaylistItemPageContent.module.css'
import { PlayListItemPageEventsCard } from './PlayListItemPageEventsCard'
import { PlaylistItemPageHeader } from './PlaylistItemPageHeader/PlaylistItemPageHeader'

export const PlaylistItemPageContent = ({
  availablePlaylist,
  loadingPlaylist,
  playlist,
  playlist_id,
  type,
}) => {
  const [videoHref, setVideoHref] = useState('');
  const [playingEvent, setPlayingEvent] = useState(null);
  const [searchParams] = useSearchParams();
  const l = useLexicon();

  const increaseTheView = async (markerId, playlistId) => {
    try {
      await $api.post(`/users/shared_playlist/${playlistId}`, { id: markerId })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('increase view playlist error', e);
    }
  }
  const handlePlayVideo = async (
    link,
    second,
    event,
  ) => {
    if (!link) {
      alert(l(316));
    }
    try {
      const fileNameArr = link?.split('/');
      const fileName = fileNameArr[fileNameArr.length - 1];

      if (fileName) {
        const url = `${VIDEO_SERVICE_URL}/cut_video/`;
        const params = {
          path: decodeURI(event?.details?.video),
          start: Math.round(second),
        }

        if (event) {
          setPlayingEvent(event)

          if (event?.end_second) {
            params.end = Math.round(event?.end_second)
            params.start = Math.round(event?.start_second)
          }
        }

        const response = await fetch(url, {
          body: JSON.stringify(params),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const json = await response.json();

        if (json.status === 'ok') {
          setVideoHref(`${VIDEO_SERVICE_URL}/video/${json.out_file}`);
          type === 'shared' && playlist_id && await increaseTheView(event.id, playlist_id);
        } else if (json.status === 'error') {
          alert(json.input_path || json.start || json.out_file);
        } else {
          alert('Get video error');
        }
      }
    } catch (e) {
      alert(`Get video error, ${e.message}`);
      // eslint-disable-next-line no-console
      console.log('get cut video err', e.message);
    }
    // setVideoHref(link);
    // setVideoSecond(second);
  };

  useEffect(() => {
    const videoParametr = searchParams.get('video');
    if (playlist?.videos?.length) {
      (async () => {
        const event = playlist?.videos?.find((item) => item.id === Number(videoParametr))
        await handlePlayVideo(
          event?.details?.video,
          event?.details?.second,
          event,
        )
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlist]);

  if (loadingPlaylist) {
    return (
      <div>
        <PlaylistItemPageHeader title={playlist?.title} />
        <div className={cls.playlistItemPageMainContainer}>
          <div className={cls.centeredContent}>
            <Spinner />
          </div>
        </div>
      </div>
    )
  }

  if (!availablePlaylist) {
    return (
      <div>
        <PlaylistItemPageHeader title={playlist?.title} />
        <div className={cls.playlistItemPageMainContainer}>
          <div className={cls.centeredContent}>
            <h3>The playlist is unavailable or does not exist</h3>
          </div>
        </div>
      </div>
    )
  }

  const handleSwitchEvent = async (index) => {
    const eventIndex = playlist?.videos?.findIndex((event) => event.id === playingEvent.id)
    const nextEvent = playlist?.videos?.[eventIndex + index]

    if (!nextEvent) return

    await handlePlayVideo(
      nextEvent?.details.video,
      nextEvent?.details.second,
      nextEvent,
    )
  }

  return (
    <div>
      <PlaylistItemPageHeader title={playlist?.title} />
      <div className={cls.playlistItemPageMainContainer}>
        <PlayListItemPageEventsCard
          handlePlayVideo={handlePlayVideo}
          events={playlist?.videos}
          playingEvent={playingEvent}
          playlistId={playlist_id}
        />
        <VideoPlayer
          videoStylesContainer={{ height: 'calc(77vh * var(--scale-multiplier))' }}
          video={videoHref}
          handleSwitchEvent={handleSwitchEvent}
          videoInfo={playingEvent}
        />
      </div>
    </div>
  )
}
