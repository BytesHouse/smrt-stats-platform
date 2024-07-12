import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useLocation } from 'react-router-dom';
import { groupEventsByTeam } from 'lib/helpers/groupEventsByTeam';
import Header from '../../components/Header/Header';
import { BackButton, VideoCutsPanel } from '../../components/VideoCuts';
import { VideoPlayer } from '../../components/VideoPlayer';
import { $api, VIDEO_SERVICE_URL } from '../../config/api';
import { getPlaylist } from '../../store/playlist/playlistService';
import { videoCutsActions } from '../../store/video_cuts/videoCutsSlice';
import cls from './VideoCutsPage.module.css';

export const VideoCutsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [countEpisode, setCountEpisode] = useState(0);
  const [countMatches, setCountMatches] = useState(0);
  const [videoCuts, setVideoCuts] = useState([]);
  const [videoHref, setVideoHref] = useState('');
  const videoCutsState = useSelector((state) => state.video_cuts.videoCuts);
  const [videoSecond] = useState('0');
  const formationInfo = useSelector((state) => state.user.userProfile);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    dispatch(getPlaylist({ token: localStorage.getItem('token') }));
    return () => {
      dispatch(videoCutsActions.setVideoCuts([]));
      dispatch(dispatch(videoCutsActions.setLoading()));
    };
  }, [dispatch]);

  useEffect(() => {
    const matches = searchParams.get('match');
    const markers = searchParams.get('markers');
    const actions = searchParams.get('action');
    const param = searchParams.get('param');
    const team = searchParams.get('team');
    const player = searchParams.get('player');

    if (matches && actions && (team || player)) {
      const getMatchMarkers = async (
        matchIds,
        actionsIds,
        teamId,
        playerId,
      ) => {
        try {
          // eslint-disable-next-line no-nested-ternary
          const playerOrTeam = teamId
            ? `&team=${teamId}`
            : playerId
              ? `&player=${playerId}`
              : '';
          const obeParam = param ? `&param=${param}` : '';
          const response = await $api.get(
            `/platform/match_markers/?matches=${matchIds}&actions=${actionsIds}${playerOrTeam}${obeParam}`,
          );

          if (response.data?.length > 0) {
            let count = 0;
            for (let i = 0; i <= response.data.length - 1; i++) {
              count += response.data[i].count;
            }
            setCountEpisode(count);
            setCountMatches(response.data.length);
            setVideoCuts(response.data);
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.log('get match markers err', e.message);
        }
      };

      getMatchMarkers(
        matches,
        actions,
        team,
        player,
      );
    }
  }, [searchParams]);

  useEffect(() => {
    const markers = searchParams.get('markers');

    const getMatchMarkers = async (events) => {
      try {
        const response = await $api.post('/stats/events_search/', { markers: events.split(',') })
        const data = await response.data;
        if (data) {
          const groupedData = groupEventsByTeam(response.data.events)
          setCountEpisode(data.count);
          setCountMatches(groupedData.length);
          setVideoCuts(groupedData);
        }
      } catch { /* empty */ }
    }

    if (markers) {
      getMatchMarkers(markers);
    }
  }, [searchParams])

  const handlePlayVideo = async (link, second, id) => {
    try {
      if (link) {
        const url = `${VIDEO_SERVICE_URL}/cut_video/`;
        const response = await fetch(url, {
          body: JSON.stringify({
            offset_range_begin: formationInfo.offset_range_begin,
            offset_range_end: formationInfo.offset_range_end,
            path: decodeURI(link),
            start: Math.round(second),
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const json = await response.json();

        if (json.status === 'ok') {
          setVideoHref(`${VIDEO_SERVICE_URL}/video/${json.out_file}`);
          const path = searchParams.size ? `?${decodeURI(searchParams.toString())}` : '';
          $api.post('/users/activity/', {
            entity_id: id,
            link_from: `https://platform.smrtstats.com${location.pathname}${path}`,
            link_to: `${VIDEO_SERVICE_URL}/video/${json.out_file}`,
            type: 3,
          })
        } else if (json.status === 'error') {
          // eslint-disable-next-line no-alert
          alert(json.input_path || json.start || json.out_file);
        } else {
          // eslint-disable-next-line no-alert
          alert('Get video error');
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert(`Get video error, ${e.message}`);
      // eslint-disable-next-line no-console
      console.log('get cut video err', e.message);
    }
    // setVideoHref(link);
    // setVideoSecond(second);
  };

  useEffect(() => {
    if (videoCutsState?.length && firstRender) {
      const indexVideo = videoCutsState[0].braker ? 1 : 0;
      const { id, second, video } = videoCutsState[indexVideo]
      handlePlayVideo(video, second, id).finally(() => {
        dispatch(videoCutsActions.setNextVideo(videoCutsState[indexVideo + 1]));
        dispatch(videoCutsActions.setIndexNext(indexVideo + 1));
        dispatch(videoCutsActions.setIndexCurrent(indexVideo));
        setFirstRender(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoCutsState]);

  return (
    <>
      <Header />
      <section className={cls.videoCutsPageContainer}>
        <BackButton />
        <div className={cls.videoCutsWrapper}>
          <VideoCutsPanel
            countEpisode={countEpisode}
            countMatches={countMatches}
            setCountEpisode={setCountEpisode}
            videoCuts={videoCuts}
            handlePlayVideo={handlePlayVideo}
          />
          <VideoPlayer
            videoStylesContainer={{ height: 'calc(80vh * var(--scale-multiplier))' }}
            video={videoHref}
            toSecond={videoSecond}
            playNextVideo={handlePlayVideo}
            videos={videoCuts}
          />
        </div>
      </section>
    </>
  );
};
