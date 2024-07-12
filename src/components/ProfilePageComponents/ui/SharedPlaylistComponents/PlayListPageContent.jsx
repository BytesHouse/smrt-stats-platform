import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { $api } from 'config/api';
import { useInifiniteScroll } from 'lib/hooks/useInfiniteScroll';
import { Playlist } from './Playlist/Playlist';
import cls from './PlayListPageContent.module.css';
import { PlayListPageHeader } from './PlayListPageHeader/PlayListPageHeader';

export const PlayListPageContent = () => {
  const [sharedPlaylist, setSharedPlaylist] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currSort, setCurrSort] = useState('');

  // for pagination by scrolling
  const wrapperRef = useRef();
  const triggerRef = useRef();

  const getSharedPlaylist = async (page = 1, initialRequest = false) => {
    setLoading(true);
    try {
      const response = await $api.get(`/users/user_shared_playlists/?page=${page}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` },
      });
      initialRequest && setTotal(response.data.count);
      initialRequest && setSharedPlaylist(response.data.results);
      return response.data.results;
    } catch (e) {
      return [];
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSharedPlaylist(1, true);

    return () => {
      setTotal(0);
      setCurrentPage(1);
      setLoading(false);
    }
  }, [])

  const handleChangeSort = (sort) => {
    setCurrSort(sort);
  }

  const loadMore = useCallback(() => {
    if (!loading && sharedPlaylist.length < total) {
      getSharedPlaylist(currentPage + 1).then((res) => {
        setCurrentPage(currentPage + 1);
        setSharedPlaylist([...sharedPlaylist, res]);
      });
    }
  }, [currentPage, loading, sharedPlaylist, total])

  useInifiniteScroll({
    callback: loadMore,
    triggerRef,
    wrapperRef,
  })

  return (
    <div className={cls.playListPageContent}>
      <PlayListPageHeader handleChangeSort={handleChangeSort} />
      <Playlist
        loading={loading}
        sharedPlaylist={sharedPlaylist}
        typeSort={currSort}
        ref={{ triggerRef, wrapperRef }}
      />
    </div>
  )
}
