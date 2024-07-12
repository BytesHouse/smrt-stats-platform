import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { convertIsoToYyyyMmDd } from 'lib/helpers/formatDate';
import { CheckBox } from 'components/ui/CheckBox/CheckBox';
import { VideoCutsActionListItem } from './VideoCutsActionListItem';
import cls from './VideoCutsActionList.module.css';
import { videoCutsActions } from '../../../../../store/video_cuts/videoCutsSlice';
import { Spinner } from '../../../../ui';

export const VideoCutsActionList = (props) => {
  const dispatch = useDispatch();
  const {
    handlePlayVideo,
    openAddPlayList,
    setCountEpisode,
    videoCuts,
  } = props;
  const videoCutsState = useSelector((state) => state.video_cuts.videoCuts);
  const videoCutsLoading = useSelector((state) => state.video_cuts.isLoading);
  const formationInfo = useSelector((state) => state.user.userProfile);
  const selectedMarkers = useSelector((state) => state.pitch.selectedMarkers);

  const getVideoName = (item) => `${item.action}, ${new Date(
    +(item.second - (formationInfo.offset_range_begin ?? 0)) * 1000,
  )
    .toISOString()
    .slice(11, 19)} - ${new Date(
    (+item.second + (formationInfo.offset_range_end ?? 0)) * 1000,
  )
    .toISOString()
    .slice(11, 19)}`

  useEffect(() => {
    if (!videoCuts?.length) return

    const allMarkers = videoCuts.reduce((res, videoCut) => {
      if (videoCut.markers.length > 0) {
        res.push({
          braker: true,
          key: Math.random(),
          markers: videoCut.markers,
          match: videoCut.match,
        });
        const tmp = [...videoCut.markers];
        res.push(...tmp.sort((a, b) => {
          if (a?.second && b?.second && +a.second > +b.second) {
            return 1;
          }
          if (a?.second && b?.second && +a.second < +b.second) {
            return -1;
          }
          return 0;
        }));
      }
      return res;
    }, []);
    const preparedMarkers = allMarkers
      ?.map((item) => {
        if (item.braker) {
          return { ...item, checked: false }
        }
        return {
          ...item,
          checked: false,
          title: getVideoName(item) ?? '',
        }
      })
    if (Object.keys(selectedMarkers)?.length) {
      const zones = Object.entries(selectedMarkers)
      // filteredMarkers это обьект созданный методом reduce
      const filteredMarkers = zones.reduce((acc, [id, marker]) => ({
        ...marker,
      }), {})
      // Цикл необходим для того чтобы перезаписать ключи обьекта так filter ниже делает
      // проверку именно по нему

      for (const oldKey in filteredMarkers) {
        // eslint-disable-next-line no-prototype-builtins
        if (filteredMarkers.hasOwnProperty(oldKey)) {
          const newKey = filteredMarkers[oldKey].id;
          filteredMarkers[newKey] = filteredMarkers[oldKey];
          // delete filteredMarkers[oldKey]
        }
      }
      // eslint-disable-next-line max-len
      const tmp = [...preparedMarkers.filter((item) => filteredMarkers[item.id] || item.braker)]
      dispatch(videoCutsActions.setVideoCuts(
        tmp,
      ))
      setCountEpisode(tmp.length - tmp.filter((item) => item.braker).length)
      return
    }
    dispatch(videoCutsActions.setVideoCuts(preparedMarkers));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoCuts, dispatch, formationInfo, selectedMarkers]);
  return (
    <div
      className={cls.videoCutsActionList}
      style={openAddPlayList ? { opacity: '0.1' } : {}}
    >
      {videoCutsLoading ? (
        <div className={cls.spinn}>
          <Spinner />
        </div>
      ) : (
        videoCutsState?.map((item, index) => {
          if (!item.id) {
            return (
              <CheckBoxPanel key={item.key} item={item} />)
          }
          return (<VideoCutsActionListItem
            key={item.id}
            action={item}
            index={index}
            handlePlayVideo={handlePlayVideo}
          />)
        })
      )}
    </div>
  );
};

const CheckBoxPanel = ({ item }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false)
  const handleChangeCheckCut = (checked, items) => {
    items?.markers.forEach((cut) => {
      dispatch(videoCutsActions.toggleCheckCut({ checked, id: cut.id }));
    })
    setState(!state);
  };
  return (
    <div className={cls.cutsPanel} title={`${convertIsoToYyyyMmDd(item.match?.date)} ${item.match.home_team.name} ${item.match?.score} ${item.match.away_team.name}`}>
      <div className={cls.cutsInfo}>
        {`
            ${convertIsoToYyyyMmDd(item.match?.date)}
            ${item.match.home_team.name}
            ${item.match?.score}
            ${item.match.away_team.name}
        `}
      </div>
      <CheckBox checked={state} onChange={(value) => handleChangeCheckCut(value, item)} style={{ right: '28px' }} />
    </div>)
}
