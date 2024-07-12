/* eslint-disable postro4no/object-props, max-len */
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
// import { playerSelectedParams } from 'config/parametrs/playerProfileParams';
import { TDTParametrs } from 'components/TeamProfileComponents/TeamProfileMatchesTable/TDTParametrs';
import { THTableItem } from 'components/TeamProfileComponents/TeamProfileMatchesTable/THTableItem';
import { getGroupedAndSortedParametrs } from 'lib/helpers/getGroupedAndSortedParametrs';
import { gkParams } from 'config/parametrs/gkParams';
import {
  MatchesSettings,
} from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings';
import {
  useMatchesSettings,
} from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import {
  Overlay,
  Select,
  Spinner,
} from '../../ui';
import cls from './PlayerProfileMatchesTable.module.css';
import { TDTableItemMatchesPlayer } from './TDTableItemMatchesPlayer';
import { teamActions } from '../../../store/team/teamSlice';
import { $api } from '../../../config/api';
import { getFillteredTeams } from '../../../lib/helpers/getFillteredTeams';

export const PlayerProfileMatchesTable = () => {
  const dispatch = useDispatch();
  // const { setModalActive } = useContext(StubContext)
  const navigate = useNavigate();
  const [openMatchSelector, setOpenMatchSelector] = useState(false);
  const [openParametrsSelector, setOpenParametrSelector] = useState(false);
  const [searchParams] = useSearchParams();
  const l = useLexicon();
  const matches = useSelector(
    (state) => state.player.matchesPlayerStat?.matches,
  );
  const position = useSelector((state) => state.player.position);
  const loading = useSelector((state) => state.player.loadingMatches);
  // const parametrs = useSelector((state) => state.team.parametrs);

  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const playerStatistic = useSelector((state) => state.player.playerStatistic)
  //   const matchesWithStat = useSelector(
  //     (state) => state.player.playerStatistic?.matches
  //   );

  const [playerParams, setPlayerParams] = useState([]);

  const [loadingMatchesWithStat, setLoadingMathesWithStat] = useState(true);
  const [matchesWithStat, setMathesWithStat] = useState([]);

  const { id } = useParams();

  const selectedTeams = useMemo(() => getFillteredTeams(selectedMatches, matches), [matches, selectedMatches]);
  const fillteredArray = useMemo(() => (selectedTeams.length ? selectedTeams : matches), [matches, selectedTeams]);

  const idTeam = playerStatistic?.player?.team?.id

  const idPlayer = useMemo(() => {
    const searchPlayerId = searchParams.get('player');
    if (id || searchPlayerId) {
      return id || searchPlayerId;
    }
    return null;
  }, [id, searchParams]);

  const isGkPlayer = useMemo(() => position?.[0]?.id === 10, [position])

  const getMathesStat = async (
    params,
    mathesList,
    player,
  ) => {
    setLoadingMathesWithStat(true);
    try {
      let allParams = []
      params.forEach(([_, value]) => {
        allParams = [...allParams, ...value]
      })
      allParams = allParams?.filter((param) => param.checked)
      const checkedParamsIds = allParams?.map((item) => item.id);
      const matchesIds = mathesList?.map((item) => item.id);
      const response = await $api.get(`/stats/player/${player}?matches=${matchesIds?.join(',')}&params=${checkedParamsIds?.join(',')}`);
      const data = response.data?.stats;
      if (data?.length > 0) {
        const joinedStatsAndMathesData = mathesList?.map((match) => {
          let parameters = data.find((item) => item.match_id === match.id)?.parameters || [];
          if (parameters?.length > 0) {
            parameters = allParams.map((item) => {
              let commonParamData = { clickable: false, value: '-' };
              const foundedParam = parameters?.find((a) => a.parameter_id === item.id);
              if (foundedParam) {
                commonParamData = { ...foundedParam, value: Math.round(foundedParam.value) }
              }
              return { ...item, ...commonParamData }
            })
          } else {
            parameters = allParams.map((item) => {
              const commonParamData = { clickable: false, value: '-' };
              return { ...item, ...commonParamData }
            })
          }
          return {
            ...match,
            parameters,
          }
        })
        setMathesWithStat(joinedStatsAndMathesData);
      }
    } catch (e) { /* empty */ } finally {
      setLoadingMathesWithStat(false);
    }
  }

  useEffect(() => {
    const getPlayerParams = async (gk) => {
      try {
        let params = null
        if (gk) {
          params = sessionStorage.getItem('gkPlayerParameters');
          if (!params) {
            params = gkParams;
          } else {
            params = JSON.parse(sessionStorage.getItem('gkPlayerParameters'))
          }
        } else {
          params = sessionStorage.getItem('playerParameters');
          if (!params) {
            const response = await $api.get('/stats/parameters/player/');
            const data = response.data?.results;
            if (data) {
              params = getGroupedAndSortedParametrs(data);
            }
          } else {
            params = JSON.parse(sessionStorage.getItem('playerParameters'))
          }
        }
        setPlayerParams(params);
      } catch (e) { /* empty */ }
    }

    getPlayerParams(isGkPlayer);
  }, [isGkPlayer])

  useEffect(() => {
    if (playerParams?.length > 0 && selectedTeams?.length > 0 && idPlayer) {
      getMathesStat(
        playerParams,
        selectedTeams,
        idPlayer,
      )
    } else {
      setMathesWithStat([]);
    }
  }, [playerParams, selectedTeams, idPlayer])

  const postSelectedMatches = async () => {
    try {
      const response = await $api.post(
        `/statistics/player_matches/${idPlayer}`,
        { matches: selectedMatches, params: [] },
      );
      const fileUrl = response.data?.report;
      const fileLink = document.createElement('a');
      fileLink.href = fileUrl;
      fileLink.setAttribute('style', 'visibility: hidden');
      fileLink.setAttribute('download', 'report.xlsx');
      document.body.appendChild(fileLink);
      fileLink.click();
      fileLink.remove();
      dispatch(teamActions.setSelectedMatches([]));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const selectMatchesOptions = useMemo(() => {
    if (matches?.length > 0) {
      if (selectedMatches?.length) {
        selectedMatches.forEach((match) => {
          dispatch(teamActions.setSelectedMatches({ checked: true, id: match }))
        })
      } else {
        matches.forEach((match) => {
          dispatch(teamActions.setSelectedMatches({ checked: true, id: match.id }))
        })
      }

      const options = matches.map((match) => ({
        key: match.id,
        title: `${match.away_team} ${match.score} ${match.home_team} ${match.date?.split('T')[0]
        }, ${match.competition}`,
        ...match,
      }));
      return options;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  useEffect(() => {
    selectMatchesOptions.forEach((match) => {
      dispatch(teamActions.setSelectedMatches({ checked: true, id: match.id }))
    })
  }, [selectMatchesOptions])

  const handleCheckEvent = (item, checked) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked;
  };
  const handleClickConfirm = () => {
    getMathesStat(
      playerParams,
      selectedTeams,
      idPlayer,
    )
    isGkPlayer ?
      sessionStorage.setItem('gkPlayerParameters', JSON.stringify(playerParams)) :
      sessionStorage.setItem('playerParameters', JSON.stringify(playerParams));
    setOpenParametrSelector(false);
  };
  const handleClickReset = async () => {
    isGkPlayer ?
      sessionStorage.setItem('gkPlayerParameters', JSON.stringify(playerParams)) :
      sessionStorage.setItem('playerParameters', JSON.stringify(playerParams));
    playerParams.forEach(([key, value]) => value.forEach((item) => handleCheckEvent(item, true)))
    await getMathesStat(
      playerParams,
      selectedTeams,
      idPlayer,
    )
  }
  const {
    competitions,
    handleChangeSeason,
    handleResetSettings,
    handleSaveSettings,
    handleSelectedCompetition,
    handleSelectedCountMatches,
    seasons,
    selectedCountMatches,
  } = useMatchesSettings({ selectMatchesOptions })
  return (
    <div className={cls.tableWrapper}>
      {openMatchSelector && (
        <div className={cls.matchSelector}>
          <MatchesSettings
            withClose={false}
            className={cls.team_matchesSettings}
            competitions={competitions}
            handleChangeSeason={handleChangeSeason}
            handleResetSettings={handleResetSettings}
            handleSaveSettings={handleSaveSettings}
            handleSelectedCompetition={handleSelectedCompetition}
            seasons={seasons}
            selectedCountMatches={selectedCountMatches}
            setIsOpenSettings={() => setOpenMatchSelector(false)}
            handleSelectedCountMatches={handleSelectedCountMatches}
          />
          <div
            className={cls.matchOptionsWrapper}
          >
            {selectMatchesOptions?.map((option) => {
              const isSelected = selectedMatches.includes(option.id);
              return (
                <div
                  style={isSelected ? { background: 'var(--main-whitesmoke)', color: '#0F1521' } : {}}
                  key={option.id}
                  className={cls.matchOption}
                  onClick={() => {
                    dispatch(teamActions.setSelectedMatches({ checked: !isSelected, id: option.id }))
                  }}
                >
                  <span>{option.title}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {openParametrsSelector && (
        <div className={cls.parametrsSelector}>
          {playerParams.map(([key, value]) => (
            <TDTParametrs
              array={value}
              title={key}
              key={key}
              callback={handleCheckEvent}
            />
          ))}
          <button
            onClick={handleClickConfirm}
            className={cls.btnConfirm}
            type='button'
          >
            {l(446)}
          </button>
          <button
            onClick={handleClickReset}
            className={cls.btnReset}
            type='button'
          >
            Reset
          </button>
        </div>
      )}
      <div className={cls.tableActionBtns}>
        <div
          className={openMatchSelector ? cls.activeBtn : ''}
          onClick={() => setOpenMatchSelector(true)}
        >
          {l(12)}
        </div>
        <div
          className={openParametrsSelector ? cls.activeBtn : ''}
          onClick={() => setOpenParametrSelector(true)}
        >
          {l(13)}
        </div>
        <div
          className={!selectedMatches ? cls.disableBtn : ''}
          disabled={selectedMatches === 0}
          onClick={() => postSelectedMatches()}
        >
          {l(14)}
        </div>
      </div>
      <div className={cls.tableContainer}>
        <table className={cls.matchesTable}>
          <thead>
            <tr>
              <th className={cls.fix} title={l(10)}>
                {l(10)}
              </th>
              <th title={l(11)}>{l(11)}</th>
              {playerParams?.map(([key, value]) => <THTableItem array={value} key={key} />)}
            </tr>
          </thead>
          <tbody>
            {loading || loadingMatchesWithStat ? (
              <tr style={{ textAlign: 'center' }}>
                <td colSpan='32'>
                  <Spinner size='medium' />
                </td>
              </tr>
            ) : (
              <>
                {matchesWithStat?.length > 0 ? (
                  <>
                    {matchesWithStat.map((match) => (
                      <tr key={match.id}>
                        <TDTableItemMatchesPlayer
                          onClick={() => idTeam &&
                            navigate(
                              `/team/match/?team=${idTeam}&match=${match?.id}`,
                            )}
                          value={`${match.away_team} ${match.home_team} ${match.date?.split('T')[0]
                          }, ${match.competition}`}
                          style={{
                            background: '#171f2f',
                            left: '0px',
                            position: 'sticky',
                          }}
                        />
                        <TDTableItemMatchesPlayer
                          style={{
                            background: 'var(--main-whitesmoke)',
                          }}
                          value={
                            match?.positions
                              ?.map((item) => item.title)
                              .join(', ') || position?.[0].name
                          }
                          canHover={false}
                        />
                        {match?.parameters?.map((param) => {
                          const link = param.markers?.length > 0 && param.clickable ?
                            `/video_cuts?markers=${param.markers.join(',')}` :
                            null;
                          return (
                            <TDTableItemMatchesPlayer
                              key={`${param.parameter_id || param.id}-${param.value}${param.name}`}
                              value={param.value}
                              link={link}
                              canHover={param.markers?.length > 0 && param.clickable}
                            />
                          )
                        })}
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr style={{ textAlign: 'center' }}>
                    <td colSpan={`${playerParams?.[0]?.[1].length || 32}`}>{l(315)}</td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>

      <Overlay
        open={openMatchSelector}
        onClose={() => setOpenMatchSelector(false)}
      />
      <Overlay
        open={openParametrsSelector}
        onClose={() => setOpenParametrSelector(false)}
      />
    </div>
  );
};
