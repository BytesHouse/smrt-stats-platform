import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  deletePlaylistEvent,
  renamePlaylistEvent,
} from 'requests';
import { UiInput } from 'components/ui/UiInput/UiInput';
import { useOutsideClick } from 'hooks';
import { IconComponent } from 'assets/icons';
import cls from './PlaylistItemPageContent.module.css';

export const PlayListItemPageEventsCard = ({
  events,
  handlePlayVideo,
  playingEvent,
  playlistId,
}) => (
  <div className={cls.playListItemPageEventsCard}>
    <b>VIDEO</b>
    {events?.length > 0 ? (
      <>
        {events.map((event) => (
          <EventItem
            key={playlistId + Math.random()}
            event={event}
            handlePlayVideo={handlePlayVideo}
            playingEvent={playingEvent}
            playlistId={playlistId}
          />
        ))}
      </>
    ) : (
      <div>
        <span>No events</span>
      </div>
    )}
  </div>
);

const EventItem = ({
  event,
  handlePlayVideo,
  playingEvent,
  playlistId,
}) => {
  const episodeName = (e) => {
    if (e.title) return e.title

    if (e?.record) {
      const splittetUrl = decodeURI(e?.details?.video).split('/');

      return `${splittetUrl[splittetUrl.length - 1] ?? ''} - ${
        e?.id ?? ''
      }`;
    }

    if (e?.details?.action) {
      return `${e?.details?.action} - ${e?.details?.creator_team?.name} [${event?.details?.creator?.name} ${event?.details?.creator?.surname}]`;
    }
    return '-';
  };
  const [playlistItemEditing, setPlaylistItemEditing] = useState(false)
  const [eventName, setEventName] = useState(episodeName(event))
  const inputRef = useRef(null)

  const handleSaveEventName = async () => {
    try {
      await renamePlaylistEvent({
        playlistEventId: event.id,
        playlistId,
        title: eventName,
      })
    } catch (e) {
      setPlaylistItemEditing(false)
    }
  }
  useEffect(() => {
    if (playlistItemEditing) {
      inputRef.current?.focus()
    }

    if (!playlistItemEditing && episodeName(event) !== eventName) {
      handleSaveEventName()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistItemEditing]);

  useOutsideClick({
    handleClick: () => setPlaylistItemEditing(false),
    ref: inputRef,
  })

  const uniqKey = (e) => `${e?.type}_${e?.id}`
  return (
    <div
      key={uniqKey(event)}
      onClick={() => handlePlayVideo(
        event?.details?.video,
        event?.details?.second,
        event,
      )}
      title={episodeName(event)}
      style={{
        background:
          uniqKey(playingEvent) === uniqKey(event)
            ? '#e9f8ff'
            : '',
      }}
    >
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
        <path
          d='M7.75194 5.43872L18.2596 11.5682C18.4981 11.7073 18.5787 12.0135 18.4396 12.252C18.3961 12.3265 18.3341 12.3885 18.2596 12.432L7.75194 18.5615C7.51341 18.7006 7.20725 18.62 7.06811 18.3815C7.0235 18.305 7 18.2181 7 18.1296V5.87061C7 5.59446 7.22386 5.37061 7.5 5.37061C7.58853 5.37061 7.67547 5.39411 7.75194 5.43872Z'
        />
      </svg>
      {playlistItemEditing
        ? (
          <div
            style={{ width: '50%' }}
          >
            <UiInput
              innerRef={inputRef}
              value={eventName}
              handleChange={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setEventName(e.target.value)
              }}
            />
          </div>)
        : (
          <span>
            {eventName}
          </span>
        )}
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setPlaylistItemEditing((prev) => !prev)
        }}
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '18px',
          width: '18px',
        }}
      >
        <IconComponent.EDIT />
      </div>
      <div
        onClick={() => deletePlaylistEvent({
          playlistEventId: event?.record?.id ?? event.id,
          playlistId,
        })}
        style={{
          alignItems: 'center',
          display: 'flex',
          fill: 'var(--main-midnight-blue)',
          height: '24px',
          width: '24px',
        }}
      >
        {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M13.5759 17.2714L8.46576 14.484C7.83312 15.112 6.96187 15.5 6 15.5C4.067 15.5 2.5 13.933 2.5 12C2.5 10.067 4.067 8.5 6 8.5C6.96181 8.5 7.83301 8.88796 8.46564 9.51593L13.5759 6.72855C13.5262 6.49354 13.5 6.24983 13.5 6C13.5 4.067 15.067 2.5 17 2.5C18.933 2.5 20.5 4.067 20.5 6C20.5 7.933 18.933 9.5 17 9.5C16.0381 9.5 15.1669 9.11201 14.5343 8.48399L9.42404 11.2713C9.47382 11.5064 9.5 11.7501 9.5 12C9.5 12.2498 9.47383 12.4935 9.42408 12.7285L14.5343 15.516C15.167 14.888 16.0382 14.5 17 14.5C18.933 14.5 20.5 16.067 20.5 18C20.5 19.933 18.933 21.5 17 21.5C15.067 21.5 13.5 19.933 13.5 18C13.5 17.7502 13.5262 17.5064 13.5759 17.2714Z' /></svg> */}
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path
            d='M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z'
          />
        </svg>
      </div>
    </div>
  )
}
