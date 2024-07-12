/* eslint-disable max-len */
/* eslint-disable no-alert, no-param-reassign */
import {
  useState,
  useMemo,
  useRef,
  useEffect,
} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'components/ui/Modal/Modal';
import { IconComponent } from 'assets/icons';
import { UiInput } from 'components/ui/UiInput/UiInput';
import { useOutsideClick } from 'hooks';
import { renamePlaylist, renamePlaylistEvent } from 'requests/playlists';
import { combineCuts } from 'requests/combineCuts';
import cls from './Playlist.module.css';
import { VIDEO_SERVICE_URL } from '../../../../../config/api';
import { Spinner } from '../../../../ui';
import {
  deletePlaylist,
  getPlaylist,
} from '../../../../../store/playlist/playlistService';
import { SharePlaylistModal } from './SharePlaylistModal';

const getPlaylistItemName = (event) => (event.title ? event.title : `${event?.id}
    ${event?.details?.action ?? ''} - ${event?.details?.creator_team?.name ?? ''} [
      ${event?.details?.creator?.name ?? ''}${event?.details?.creator?.surname ?? ''}]`)

export const PlaylistItem = ({ playlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expaned, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const formationInfo = useSelector((state) => state.user.userProfile);
  const [playlistName, setPlaylistName] = useState(playlist.title)
  const [playlistItemName, setPlaylistItemName] = useState()
  const [openShareModal, setOpenShareModal] = useState(false);
  const inputRef = useRef(null)
  const [downloadLink, setDownloadLink] = useState('')

  const groupBy = (arr, key) => arr.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  const prepeareCutsForServer = (data) => {
    const groupCutsByVideoname = groupBy(data, 'video');
    // eslint-disable-next-line consistent-return,array-callback-return
    const cuts = Object.entries(groupCutsByVideoname).map(([key, values]) => {
      const path = decodeURI(key);
      const seconds = values.map((item) => [
        Math.round(+item.second),
        item.title,
      ]);
      if (path && seconds.length > 0) {
        return {
          offset_range_begin: formationInfo.offset_range_begin,
          offset_range_end: formationInfo.offset_range_end,
          path,
          seconds,
        };
      }
    });
    return cuts;
  };

  const handleDownloadSelectedCuts = async (event, data) => {
    event.stopPropagation();
    setIsLoading(true);
    try {
      const cuts = data.map(({
        details,
        end_second,
        start_second,
      }) => ({
        end: end_second,
        path: details.video,
        start: start_second,
      }))
      if (cuts.length > 0) {
        if (downloadLink) {
          const a = document.createElement('a');
          a.href = downloadLink;
          a.setAttribute('target', '_blank');
          a.download = downloadLink;
          document.body.appendChild(a);
          a.click();
          a.remove();
          return
        }

        const combinedCuts = await combineCuts(cuts)

        if (combinedCuts?.out_file) {
          setDownloadLink(`${VIDEO_SERVICE_URL}/video/${combinedCuts.out_file}`)
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.href = `${VIDEO_SERVICE_URL}/video/${combinedCuts.out_file}`;
          a.download = combinedCuts.out_file;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else {
          alert('Get zip archive error');
        }
      } else {
        alert('There are no videos available for download');
      }
    } catch (e) {
      alert(`Get zip archive error, ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (
    e,
    id,
  ) => {
    e.stopPropagation();
    await dispatch(deletePlaylist({ id }));
    dispatch(getPlaylist({ token: localStorage.getItem('token') }));
  };

  const handleOpenShareModal = (e) => {
    e.stopPropagation();
    setOpenShareModal(true);
  }

  const onChangePlaylistName = (e) => {
    setPlaylistName(e.target.value)
  }

  const handleSavePlaylistName = async () => {
    try {
      await renamePlaylist({
        playlistId: playlist.id,
        title: playlistName,
      })
    } catch (e) {
      setIsEditing(false)
    }
  }

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
    }

    if (!isEditing && playlistName !== playlist.title) {
      handleSavePlaylistName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditing]);

  useOutsideClick({
    handleClick: () => setIsEditing(false),
    ref: inputRef,
  })

  return (
    <>
      <div
        className={cls.playlistItem}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <div className={cls.playlistItemLeftConent}>
          <svg
            width='63'
            height='57'
            viewBox='0 0 63 57'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M61.5 14.5V55H1.5V14.5H24M61.5 14.5V2H51.5V7.75M61.5 14.5H51.5M51.5 14.5H38M51.5 14.5V7.75M51.5 7.75H38M38 7.75V14.5M38 7.75H24V14.5M38 14.5H24M41 35L26 43.2272V26.7728L41 35Z'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          {isEditing
            ? (
              <div
                style={{ width: '50%' }}
              >
                <UiInput
                  innerRef={inputRef}
                  value={playlistName}
                  handleChange={onChangePlaylistName}
                />
              </div>
            )
            : (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsEditing((prev) => !prev)
                }}
              >
                {playlistName}
              </span>)}
        </div>
        <div className={cls.playlistItemRightConent}>
          <span>
            {(playlist.date || playlist.date_update)
              && new Date(
                playlist.date || playlist.date_update,
              ).toLocaleDateString('zh-Hans-CN')}
          </span>
          {isLoading ? (
            <Spinner size='small' />
          ) : (
            <>
              <div
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setIsEditing((prev) => !prev)
                }}
                style={{
                  height: '24px',
                  width: '24px',
                }}
              >
                <IconComponent.EDIT />
              </div>
              {playlist?.videos?.length ? (
                <div
                  onClick={(event) => handleDownloadSelectedCuts(event, playlist?.videos)}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='#fff'
                    width='45'
                    height='28'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                    />
                  </svg>
                </div>) : null}
            </>
          )}
          <svg
            width='45'
            height='28'
            viewBox='0 0 45 28'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            onClick={(e) => handleOpenShareModal(e)}
          >
            <path
              d='M2 26C15.7787 -6.00001 28.5492 -5.99999 43 26M43 2.00001C29.2213 32.6667 16.4508 32.6667 2 2.00001'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
            />
          </svg>
          <svg
            onClick={(e) => handleDelete(
              e,
              playlist.id,
            )}
            width='32'
            height='39'
            viewBox='0 0 32 39'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 9L9 38H16M28 9L23 38H16M16 38V12M1 7H31M6.5 5H25.5M12 3V1H20V3'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>
      </div>

      {expaned && (
        playlist?.videos?.length ? (
          <>
            {playlist.videos.map((playlistEvent) => (
              <PlaylistItemRow
                key={playlistEvent?.id}
                playlist={playlist}
                event={playlistEvent}
              />
            ))}
          </>
        ) : (
          <div className={cls.playlistItemEvent}>No events</div>
        )
      )}

      <Modal
        title={`Share playlist ${playlist.title}`}
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
      >
        <SharePlaylistModal playlist={playlist} onCloseModal={() => setOpenShareModal(false)} />
      </Modal>
    </>
  );
};

const PlaylistItemRow = ({ event, playlist }) => {
  const [playlistItemEditing, setPlaylistItemEditing] = useState(false)
  const [rowName, setRowName] = useState(getPlaylistItemName(event))
  const inputRef = useRef(null)
  const navigate = useNavigate();

  const handleSaveEventName = async () => {
    try {
      await renamePlaylistEvent({
        playlistEventId: event.id,
        playlistId: playlist.id,
        title: rowName,
      })
    } catch (e) {
      setPlaylistItemEditing(false)
    }
  }

  useEffect(() => {
    if (playlistItemEditing) {
      inputRef.current?.focus()
    }
    if (!playlistItemEditing && getPlaylistItemName(event) !== rowName) {
      handleSaveEventName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistItemEditing]);

  useOutsideClick({
    handleClick: () => setPlaylistItemEditing(false),
    ref: inputRef,
  })

  return (
    <Link to={`/profile/playlist/${playlist.id}?video=${event.id}`}>
      <div
        key={event?.record ? event?.record?.id : event.id}
        className={cls.playlistItemEvent}
      >
        <div className={cls.playlistItemEventLeftContent}>
          <svg
            width='67'
            height='48'
            viewBox='0 0 67 48'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M2 4C2 2.89543 2.89543 2 4 2H63C64.1046 2 65 2.89543 65 4V44C65 45.1046 64.1046 46 63 46H4C2.89543 46 2 45.1046 2 44V4Z'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M28.5 32.5V16L43 24L28.5 32.5Z'
              stroke='white'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          {playlistItemEditing
            ? (
              <div
                style={{ width: '50%' }}
              >
                <UiInput
                  value={rowName}
                  innerRef={inputRef}
                  handleChange={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setRowName(e.target.value)
                  }}
                />
              </div>)
            : (
              <span
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setPlaylistItemEditing((prev) => !prev)
                }}
              >
                {rowName}
              </span>
            )}
        </div>
        <div className={cls.playlistItemEventRightContent}>
          <div
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setPlaylistItemEditing((prev) => !prev)
            }}
            style={{
              height: '24px',
              width: '24px',
            }}
          >
            <IconComponent.EDIT />
          </div>
        </div>
      </div>
    </Link>
  )
}
