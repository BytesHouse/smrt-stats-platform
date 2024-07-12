import {
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link,
  // useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { Offset } from 'components/Offset';
import cls from './WatchEvents.module.css';
import {
  Spinner,
  UiCheckbox,
  UiDropdown,
} from '../../../ui';
import { userActions } from '../../../../store/user/userSlice';
import { DownloadPitchBtn } from './components/DownloadPitchBtn';

export const WatchEvents = ({
  count,
  loadingEvents,
  resultMarkers,
  setCount,
}) => {
  // const navigate = useNavigate();
  // const selectedMatches = useSelector((state) => state.team.selectedMatches);
  // const selectedActions = useSelector((state) => state.team.selectedActions);
  const [searchParams] = useSearchParams();
  const l = useLexicon();
  // const [teamId, setTeamId] = useState(null);
  // const [playerId, setPlayerId] = useState(null);

  const watchEventsVideoSettingsRef = useRef();
  const [openVideoSettings, setOpenVideoSettings] = useState(false);
  const formationInfo = useSelector((state) => state.user.userProfile);
  const dispatch = useDispatch();
  const [pitchSettings, setPitchSettings] = useState({});

  const onSelected = (option) => {
    setPitchSettings((prev) => ({
      ...prev,
      selectedZone: option,
    }));
  };

  const markersIds = useMemo(() => {
    if (resultMarkers?.length > 0) {
      return resultMarkers.map((marker) => marker.id);
    }
    return [];
  }, [resultMarkers])

  const patchFormationInfo = async (id) => {
    try {
      const response = await fetch(
        `https://platform.smrtstats.com:8888/api/v1/users/profile_settings/${id}/`,
        {
          body: JSON.stringify({
            offset_range_begin: formationInfo.offset_range_begin,
            offset_range_end: formationInfo.offset_range_end,
          }),
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          method: 'PATCH',
        },
      );
      const json = await response.json();
      if (pitchSettings.wholePitch) setCount(0)
      // eslint-disable-next-line no-console
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('patch info err', e);
      // eslint-disable-next-line no-alert
      alert('patch info error', e.message);
    } finally {
      setOpenVideoSettings(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        watchEventsVideoSettingsRef.current &&
        !watchEventsVideoSettingsRef.current.contains(event.target)
      ) {
        setOpenVideoSettings(false);
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
  }, []);

  // useEffect(() => {
  //   const team = searchParams.get('team');
  //   const player = searchParams.get('player');
  //   team && setTeamId(team);
  //   player && setPlayerId(player);
  // }, [searchParams]);

  // eslint-disable-next-line no-nested-ternary
  // const playerOrTeam = playerId
  //   ? `&player=${playerId}`
  //   : teamId
  //     ? `&team=${teamId}`
  //     : '';
  // const handleClickWatchEvents = () => {
  //   navigate(
  //     `/video_cuts?action=${selectedActions.join(
  //       ',',
  //     )}&match=${selectedMatches.join(',')}${playerOrTeam}`,
  //   );
  // };

  useEffect(() => {
    dispatch(userActions.setPitchSettings(pitchSettings));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pitchSettings]);
  return (
    <div className={cls.watchEventsContainer}>
      <Link
        to={`/video_cuts?markers=${markersIds.join(',')}`}
        style={{ pointerEvents: !count || count <= 0 || loadingEvents ? 'none' : '' }}
        className={cls.watchEventsButton}
        // onClick={handleClickWatchEvents}
      >
        {loadingEvents ? (
          <Spinner size='small' />
        ) : (
          <>
            <svg
              width={34}
              height={34}
              xmlns='http://www.w3.org/2000/svg'
              fill='#0f1521'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='#0f1521'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
              />
            </svg>

            <span>{l(26).replace(/%/g, count)}</span>
          </>
        )}
      </Link>
      <button
        type='button'
        className={cls.watchEventsButton}
        onClick={() => setOpenVideoSettings((prev) => !prev)}
      >
        {l(27)}
      </button>
      <DownloadPitchBtn />

      {openVideoSettings && (
        <div
          ref={watchEventsVideoSettingsRef}
          className={cls.watchEventsVideoSettings}
        >
          <div className={cls.watchEventsSettingsHeader}>
            <div>
              <span>{l(27)}</span>
              <span>{l(136)}</span>
            </div>
            <span>{l(29)}</span>
          </div>
          <div className={cls.watchEventsVideoSettingsOffset}>
            <Offset
              offset_range_begin={formationInfo?.offset_range_begin}
              offset_range_end={formationInfo?.offset_range_end}
            />
          </div>
          <div className={cls.pitchSettings}>
            {l(423)}
            <form>
              <UiCheckbox
                text={l(421)}
                disabled
                checked={pitchSettings?.direction}
                onChange={() => setPitchSettings((prev) => ({
                  ...prev,
                  direction: !prev.direction,
                }))}
              />
              <UiCheckbox
                text={l(422)}
                checked={pitchSettings?.wholePitch}
                onChange={() => setPitchSettings((prev) => ({
                  ...prev,
                  wholePitch: !prev.wholePitch,
                }))}
              />
              <UiDropdown
                onSelected={onSelected}
                options={[3, 6, 12, 14, 18].map((zone) => ({
                  label: `${zone} ${l(450)}`,
                  value: zone,
                }))}
                title={pitchSettings?.selectedZone?.label ?? l(450)}
              />
            </form>
          </div>
          <button
            type='button'
            onClick={() => patchFormationInfo(formationInfo.user)}
          >
            {l(30)}
          </button>
        </div>
      )}
    </div>
  );
};
