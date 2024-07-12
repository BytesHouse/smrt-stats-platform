/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import { DownloadNotification } from 'components/Notification/DownloadNotification';
import { VIDEO_SERVICE_URL } from '../../../../config/api';
import { Spinner } from '../../../ui';
import cls from './VideoCutsActionBtns.module.css';

export const VideoCutsActionBtns = ({ showAddPlayList }) => {
  const selectedCuts = useSelector((state) => state.video_cuts.selectedCuts);
  const videoCuts = useSelector((state) => state.video_cuts.videoCuts);
  const formationInfo = useSelector((state) => state.user.userProfile);
  const [loadingDownloadCuts, setLoadingDownloadCuts] = useState(false);
  const [openButtons, setOpenButtons] = useState(false);
  const l = useLexicon();

  const groupBy = (arr, key) => arr.reduce((rv, x) => {
    // eslint-disable-next-line no-param-reassign
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});

  const prepeareCutsForServer = (data) => {
    // eslint-disable-next-line consistent-return,array-callback-return
    const cuts = Object.entries(data).map(([key, values]) => {
      const path = decodeURI(values.video);
      return {
        end: Math.round(+values.second) + formationInfo.offset_range_end,
        path,
        start: Math.round(+values.second) - formationInfo.offset_range_begin,
      };
    });
    return cuts;
  };

  const handleDownloadSelectedCuts = async () => {
    setLoadingDownloadCuts(true);
    try {
      const data = selectedCuts?.length === 0 ? videoCuts : selectedCuts;
      const cuts = prepeareCutsForServer(
        data.filter((item) => Boolean(item.video)),
      );
      if (cuts.length > 0) {
        const url = `${VIDEO_SERVICE_URL}/cut_many_video/?out=zip`;
        const response = await fetch(url, {
          body: JSON.stringify(cuts),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const json = await response.json();

        if (json.status === 'ok') {
          const a = document.createElement('a');
          a.href = `${VIDEO_SERVICE_URL}/video/${json.out_file}`;
          a.download = json.out_file;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else if (json.status === 'error') {
          alert(
            json.input_path ||
              json.seconds ||
              json.out_file ||
              json.content_type,
          );
        } else {
          alert('Get zip archive error');
        }
      } else {
        alert('There are no videos available for download');
      }
    } catch (e) {
      alert(`Get zip archive error, ${e.message}`);
    } finally {
      setLoadingDownloadCuts(false);
    }
  };

  const handleDownloadSelectedCutsInOneClip = async () => {
    setLoadingDownloadCuts(true);
    try {
      const data = selectedCuts?.length === 0 ? videoCuts : selectedCuts;
      const cuts = prepeareCutsForServer(
        data.filter((item) => Boolean(item.video)),
      );
      if (cuts.length > 0) {
        const url = `${VIDEO_SERVICE_URL}/cut_many_video/?out=file`;
        const response = await fetch(url, {
          body: JSON.stringify(cuts),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        const json = await response.json();

        if (json.status === 'ok') {
          const a = document.createElement('a');
          a.href = `${VIDEO_SERVICE_URL}/video/${json.out_file}`;
          a.download = json.out_file;
          document.body.appendChild(a);
          a.click();
          a.remove();
        } else if (json.status === 'error') {
          alert(
            json.input_path ||
              json.seconds ||
              json.out_file ||
              json.content_type,
          );
        } else {
          alert('Get zip archive error');
        }
      } else {
        alert('There are no videos available for download');
      }
    } catch (e) {
      alert(`Get zip archive error, ${e.message}`);
    } finally {
      setLoadingDownloadCuts(false);
    }
  };
  // for only 1 video download
  // const handleDownloadVideo = () => {
  //   const a = document.createElement('a')
  //   a.href = videoLink
  //   a.download = videoLink.split('/').pop()
  //   document.body.appendChild(a)
  //   a.click()
  //   document.body.removeChild(a)
  // }

  return (
    <header className={cls.videoCutsActionBtnsContainer}>
      <button type='button' onClick={showAddPlayList}>
        {l(426)}
      </button>
      <button
        type='button'
        disabled={
          (!selectedCuts?.length || loadingDownloadCuts) && !videoCuts?.length
        }
        onClick={() => setOpenButtons(true)}
      >
        {selectedCuts?.length > 0 ? 'download selected videos' : l(427)}
      </button>
      {openButtons && (
        <div className={cls.downloadbtns}>
          <button
            className={cls.closebtn}
            type='button'
            onClick={() => setOpenButtons(false)}
          >
            x
          </button>
          <button
            className={cls.clipbtn}
            type='button'
            onClick={() => handleDownloadSelectedCutsInOneClip()}
          >
            One clip
          </button>
          <button
            style={{ marginLeft: '40px' }}
            className={cls.clipbtn}
            type='button'
            onClick={() => handleDownloadSelectedCuts()}
          >
            Separate clips
          </button>
        </div>
      )}
      {loadingDownloadCuts &&
      <DownloadNotification>
        The video is being processed. Please do not leave this page until it starts downloading.
      </DownloadNotification>}
    </header>
  );
};
