import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { getPlaylist, getRecords } from 'requests';
import { ProfilePageWrapper } from '../../components/ProfilePageComponents'
import { PlaylistItemPageContent } from '../../components/ProfilePageComponents/ui/PlaylistItemPageComponents/PlaylistItemPageContent';
import { $api } from '../../config/api';

export const PlaylistItemPage = ({ type }) => {
  const [currentPlaylist, setCurrentPlaylist] = useState(null)
  const [availablePlaylist, setAvailablePlaylist] = useState(true);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const getOnePlaylist = async (playlistId) => {
      setLoadingPlaylist(true)
      try {
        if (pathname.includes('records')) {
          const records = await getRecords()
          if (records?.length) {
            setCurrentPlaylist(records[0])
          }
        } else {
          const playlists = await getPlaylist({ playlistId });
          setCurrentPlaylist(playlists);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log('get playlist err', error);

        // eslint-disable-next-line no-alert
        alert('get playlist error', error.message);
      } finally {
        setLoadingPlaylist(false);
      }
    }

    const getSharedPlaylist = async (idHash) => {
      setLoadingPlaylist(true)
      setAvailablePlaylist(false);
      try {
        const response = await $api.get(`/users/shared_playlist/${idHash}`);
        if (response.status === 200) {
          setCurrentPlaylist(response.data);
          setAvailablePlaylist(true);
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('get shared playlist error', e);
      } finally {
        setLoadingPlaylist(false);
      }
    }

    if (type === 'shared' && id) {
      getSharedPlaylist(id);
    } else {
      id && getOnePlaylist(id);
    }
  }, [id, type, pathname])

  return (
    <ProfilePageWrapper>
      <PlaylistItemPageContent
        playlist={currentPlaylist}
        availablePlaylist={availablePlaylist}
        loadingPlaylist={loadingPlaylist}
        type={type}
        playlist_id={id}
      />
    </ProfilePageWrapper>
  )
}
