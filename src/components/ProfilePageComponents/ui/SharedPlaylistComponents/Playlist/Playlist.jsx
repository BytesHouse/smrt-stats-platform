import { forwardRef, useMemo } from 'react'
import { useLexicon } from 'lib/hooks/useTranslates';
import { Spinner } from 'components/ui';
import cls from './Playlist.module.css';
import { PlaylistItem } from './PlaylistItem';

export const Playlist = forwardRef((props, ref) => {
  const {
    loading,
    sharedPlaylist,
    typeSort,
  } = props;
  const { triggerRef, wrapperRef } = ref;

  const l = useLexicon();

  const playlists = useMemo(() => {
    switch (typeSort) {
      case 'by_date':
        return sharedPlaylist?.sort((a, b) => new Date(b?.date) - new Date(a?.date));
      case 'by_title_asc':
        return sharedPlaylist?.sort((a, b) => a?.playlist_title?.localeCompare(b?.playlist_title));
      case 'by_title_desc':
        return sharedPlaylist?.sort((a, b) => b?.playlist_title.localeCompare(a?.playlist_title));
      default:
        return sharedPlaylist;
    }
  }, [typeSort, sharedPlaylist])

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
        <div className={cls.playlistEmpty}>{loading ? <Spinner /> : l(135)}</div>
      )}
      <div className={cls.loadingContainer}>
        {loading && playlists?.length > 0 && <Spinner />}
      </div>
    </div>
  )
})
