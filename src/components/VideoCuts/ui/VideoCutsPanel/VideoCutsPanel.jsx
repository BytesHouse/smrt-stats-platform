import React, { useState } from 'react';
import { VideoCutsActionBtns } from './VideoCutsActionBtns';
import { VideoCutsActionList } from './VideoCutsActionList/VideoCutsActionList';
import { VideoCutsFooterInfo } from './VideoCutsFooterInfo';
import cls from './VideoCutsPanel.module.css';
import { AddPlayListModal } from './AddPlayListModal/AddPlayListModal';

export const VideoCutsPanel = (props) => {
  const {
    countEpisode,
    countMatches,
    handlePlayVideo,
    setCountEpisode,
    videoCuts,
  } = props;
  const [addPlaylistOpenModal, setAddPlaylistOpenModal] = useState(false);
  return (
    <aside className={cls.videoCutsPanel}>
      <VideoCutsActionBtns
        showAddPlayList={() => setAddPlaylistOpenModal((prev) => !prev)}
      />
      <div
        style={
          addPlaylistOpenModal
            ? {
              border: '1px solid #B4EB54',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              position: 'relative',
            }
            : {}
        }
      >
        <VideoCutsActionList
          setCountEpisode={setCountEpisode}
          handlePlayVideo={handlePlayVideo}
          videoCuts={videoCuts}
          openAddPlayList={addPlaylistOpenModal}
        />
        <VideoCutsFooterInfo
          countEpisode={countEpisode}
          countMatches={countMatches}
          openAddPlayList={addPlaylistOpenModal}
        />

        {/* add playlist modal */}
        {addPlaylistOpenModal && (
          <AddPlayListModal hideModal={() => setAddPlaylistOpenModal(false)} />
        )}
      </div>
    </aside>
  );
};
