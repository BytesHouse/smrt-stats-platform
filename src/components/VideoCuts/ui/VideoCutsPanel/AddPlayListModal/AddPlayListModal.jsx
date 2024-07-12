import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylistState } from '../../../../../store/playlist/playerlistSelectors';
import {
  createPlaylist,
  editPlaylistEvents,
  getPlaylist,
} from '../../../../../store/playlist/playlistService';
import cls from './AddPlayListModal.module.css';

export const AddPlayListModal = ({
  handleSavePlaylist,
  hideModal,
  record,
  setSelectedPlaylist: setAddedPlaylist,
  title1,
  title2,
}) => {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const playlists = useSelector(getPlaylistState);
  const selectedCuts = useSelector((state) => state.video_cuts.selectedCuts);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState(undefined);

  useEffect(() => {
    dispatch(getPlaylist({ token: localStorage.getItem('token') }));
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        hideModal?.();
      }
    };
    document.addEventListener(
      'click',
      handleClickOutside,
      true,
    );

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        true,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeSelect = (e) => {
    const id = e.target.options[e.target.selectedIndex].dataset.value;
    setSelectedPlaylist({ id, value: e.target.value });
    setAddedPlaylist && setAddedPlaylist({ id, value: e.target.value })
  }

  const handleAddPlaylist = async () => {
    if (handleSavePlaylist) {
      await handleSavePlaylist()
      hideModal?.()
      return
    }

    if (!selectedCuts.length && !record) {
      // eslint-disable-next-line no-alert
      alert('Please select events');
      return;
    }
    const events = selectedCuts.map(({ id, title }) => ({
      event_id: id,
      title,
    }));

    if (selectedPlaylist?.id) {
      dispatch(editPlaylistEvents({
        events: record ? [record] : events,
        id: selectedPlaylist.id,
        token: localStorage.getItem('token'),
      }))
      setSelectedPlaylist(undefined);
      setAddedPlaylist && setAddedPlaylist(null);
    } else {
      const newPlaylist = await dispatch(createPlaylist({
        events: record ? [record] : events,
        title: newPlaylistName,
        token: localStorage.getItem('token'),
      }))
      await dispatch(editPlaylistEvents({
        events: record ? [record] : events,
        id: newPlaylist?.payload?.id,
        token: localStorage.getItem('token'),
      }))
      setSelectedPlaylist(undefined);
      setAddedPlaylist && setAddedPlaylist(null);
      setNewPlaylistName('');
    }
    hideModal?.()
  }

  return (
    <div className={cls.addPlayListModal} ref={modalRef}>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='name_playlist'>{title1 || 'NEW PLAYLIST'}</label>
        <input
          onChange={(e) => {
            setNewPlaylistName(e.target.value)
            setAddedPlaylist && setAddedPlaylist({ title: e.target.value })
          }}
          value={newPlaylistName}
          type='text'
          id='name_playlist'
        />
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor='name_playlist'>{title2 || 'ADD TO PLAYLIST'}</label>
        <select onChange={handleChangeSelect} value={selectedPlaylist?.value}>
          {playlists.length > 0 ? (
            <>
              <option value={undefined}>NONE</option>
              {playlists
                .map(
                  (playlist) => (
                    <option
                      key={playlist.id}
                      value={playlist.title}
                      data-value={playlist.id}
                    >{playlist.title}
                    </option>
                  ),
                )}
            </>
          ) : <option disabled value='NONE'>NONE</option>}
        </select>
      </div>
      <button
        type='button'
        onClick={handleAddPlaylist}
      >DONE
      </button>
    </div>
  );
};
