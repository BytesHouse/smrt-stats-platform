/* eslint-disable max-len */
import { useState } from 'react';
import { Modal } from 'components/ui/Modal/Modal';
import cls from './Playlist.module.css';
import { SharePlaylistModal } from '../../ProfilePagePlaylistComponents/Playlist/SharePlaylistModal';

export const PlaylistItem = ({ playlist }) => {
  const [expaned, setExpanded] = useState(false);
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleOpenShareModal = (e) => {
    e.stopPropagation();
    setOpenShareModal(true);
  }

  return (
    <>
      <div className={cls.playlistItem} onClick={() => setExpanded((prev) => !prev)}>
        <div className={cls.playlistItemLeftConent}>
          <div className={cls.playlistItemViews} title='Count views'>
            <svg width='45' height='28' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3ZM12.0003 19C16.2359 19 19.8603 16.052 20.7777 12C19.8603 7.94803 16.2359 5 12.0003 5C7.7646 5 4.14022 7.94803 3.22278 12C4.14022 16.052 7.7646 19 12.0003 19ZM12.0003 16.5C9.51498 16.5 7.50026 14.4853 7.50026 12C7.50026 9.51472 9.51498 7.5 12.0003 7.5C14.4855 7.5 16.5003 9.51472 16.5003 12C16.5003 14.4853 14.4855 16.5 12.0003 16.5ZM12.0003 14.5C13.381 14.5 14.5003 13.3807 14.5003 12C14.5003 10.6193 13.381 9.5 12.0003 9.5C10.6196 9.5 9.50026 10.6193 9.50026 12C9.50026 13.3807 10.6196 14.5 12.0003 14.5Z' fill='currentColor' /></svg>
            {playlist.views_count}
          </div>
          <svg width='63' height='57' viewBox='0 0 63 57' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M61.5 14.5V55H1.5V14.5H24M61.5 14.5V2H51.5V7.75M61.5 14.5H51.5M51.5 14.5H38M51.5 14.5V7.75M51.5 7.75H38M38 7.75V14.5M38 7.75H24V14.5M38 14.5H24M41 35L26 43.2272V26.7728L41 35Z' stroke='white' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          <span>{playlist.playlist_title}</span>
        </div>
        <div className={cls.playlistItemRightConent}>
          <span>{(playlist.date) && new Date(playlist.date).toLocaleDateString('zh-Hans-CN')}</span>
          <svg onClick={(e) => handleOpenShareModal(e)} width='45' height='28' viewBox='0 0 45 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M2 26C15.7787 -6.00001 28.5492 -5.99999 43 26M43 2.00001C29.2213 32.6667 16.4508 32.6667 2 2.00001' stroke='white' strokeWidth='3' strokeLinecap='round' />
          </svg>

          {/* <svg width='32' height='39' viewBox='0 0 32 39' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M4 9L9 38H16M28 9L23 38H16M16 38V12M1 7H31M6.5 5H25.5M12 3V1H20V3' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg> */}
        </div>
      </div>

      {expaned && (
        <>
          {playlist?.share_with?.length > 0 ? (
            <>
              {playlist.share_with.map((email) => (
                <div className={cls.playlistItemEmail}>
                  <div className={cls.playlistItemEventLeftContent}>
                    <svg width='67' height='48' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75' />
                    </svg>
                    <span>
                      {email}
                    </span>
                  </div>
                  <div className={cls.playlistItemEventRightContent}>
                    {/* <svg width='45' height='28' viewBox='0 0 45 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M2 26C15.7787 -6.00001 28.5492 -5.99999 43 26M43 2.00001C29.2213 32.6667 16.4508 32.6667 2 2.00001' stroke='white' strokeWidth='3' strokeLinecap='round' />
                    </svg>
                    <svg width='32' height='39' viewBox='0 0 32 39' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path d='M4 9L9 38H16M28 9L23 38H16M16 38V12M1 7H31M6.5 5H25.5M12 3V1H20V3' stroke='white' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
                    </svg> */}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className={cls.playlistItemEvent}>
              No emails
            </div>
          )}
        </>
      )}
      <Modal
        title={`Share playlist ${playlist.playlist_title}`}
        open={openShareModal}
        onClose={() => setOpenShareModal(false)}
      >
        <SharePlaylistModal playlist={{ id: playlist.playlist }} onCloseModal={() => setOpenShareModal(false)} />
      </Modal>
    </>
  )
}
