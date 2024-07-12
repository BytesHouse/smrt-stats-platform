import {
  forwardRef,
  useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import {
  getPlaylistSortedByDate,
  getPlaylistSortedByTitleAsc,
  getPlaylistSortedByTitleDesc,
  getPlaylistState,
} from '../../../../../store/playlist/playerlistSelectors';
import cls from './Playlist.module.css';
import { PlaylistItem } from './PlaylistItem';
import { Spinner } from '../../../../ui';

export const Playlist = forwardRef((props, ref) => {
  const { typeSort } = props;
  const { triggerRef, wrapperRef } = ref;
  const playlistsDefault = useSelector(getPlaylistState);
  const playlistsByDate = useSelector(getPlaylistSortedByDate);
  const playlistByTitleAsc = useSelector(getPlaylistSortedByTitleAsc);
  const playlistByTitleDesc = useSelector(getPlaylistSortedByTitleDesc);
  const loading = useSelector((state) => state.playlist.loadingPlaylist);
  const l = useLexicon();
  const playlists = useMemo(() => {
    switch (typeSort) {
      case 'by_date':
        return playlistsByDate;
      case 'by_title_asc':
        return playlistByTitleAsc;
      case 'by_title_desc':
        return playlistByTitleDesc;
      default:
        return playlistsDefault;
    }
  }, [
    typeSort,
    playlistsDefault,
    playlistByTitleAsc,
    playlistByTitleDesc,
    playlistsByDate,
  ]);

  return (
    <div className={cls.playlistContainer} ref={wrapperRef}>
      {playlists?.length > 0 ? (
        <>
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist.id} playlist={playlist} />
          ))}
          <div ref={triggerRef} />
        </>
      ) : (
        <div className={cls.playlistEmpty}>{l(134)}</div>
      )}
      <div className={cls.loadingContainer}>
        {loading && playlists?.length > 0 && <Spinner />}
      </div>
    </div>
  );
});
