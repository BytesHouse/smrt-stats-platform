import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getPlaylist } from 'store/playlist/playlistService';
import { useInifiniteScroll } from 'lib/hooks/useInfiniteScroll';
import { getPlaylistState } from 'store/playlist/playerlistSelectors';
import { playlistActions } from 'store/playlist/playlistSlice';
import { $api } from 'config/api';
import { getPlaylists, getRecords } from 'requests';
import { Playlist } from './Playlist/Playlist';
import cls from './PlayListPageContent.module.css';
import { PlayListPageHeader } from './PlayListPageHeader/PlayListPageHeader';

export const PlayListPageContent = () => {
  const dispatch = useDispatch();
  const playlists = useSelector(getPlaylistState);
  const currentPage = useSelector((state) => state.playlist.currentPage)
  const total = useSelector((state) => state.playlist.totalCountPlaylist)
  const loading = useSelector((state) => state.playlist.loadingPlaylist);

  const wrapperRef = useRef();
  const triggerRef = useRef();

  const [currSort, setCurrSort] = useState('');

  useEffect(() => {
    dispatch(getPlaylist({ page: 1, token: localStorage.getItem('token') }));

    return () => {
      dispatch(playlistActions.setCurrentPlaylistPage(1));
      dispatch(playlistActions.setTotalPlaylist(0));
      dispatch(playlistActions.setLoadingPlaylist(false));
    }
  }, [dispatch]);

  const handleChangeSort = (sort) => {
    setCurrSort(sort);
  }

  const getAllPlaylists = useCallback(async (page = 1) => {
    dispatch(playlistActions.setLoadingPlaylist(true));
    try {
      const allPlaylists = await getPlaylists()

      return allPlaylists
    } catch (e) {
      return [];
    } finally {
      dispatch(playlistActions.setLoadingPlaylist(false));
    }
  }, [dispatch])

  // const loadMore = useCallback(() => {
  //   if (!loading && playlists.length < total) {
  //     getPlaylists(currentPage + 1).then((res) => {
  //       dispatch(playlistActions.setCurrentPlaylistPage(currentPage + 1));
  //       dispatch(playlistActions.addPlayLists(res))
  //     });
  //   }
  // }, [currentPage, dispatch, getPlaylists, loading, playlists?.length, total])

  // useInifiniteScroll({
  //   callback: loadMore,
  //   triggerRef,
  //   wrapperRef,
  // })

  return (
    <div className={cls.playListPageContent}>
      <PlayListPageHeader handleChangeSort={handleChangeSort} />
      <Playlist typeSort={currSort} ref={{ triggerRef, wrapperRef }} />
    </div>
  )
}
