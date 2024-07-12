/* eslint-disable max-len */
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { teamSelectedParams } from 'config/parametrs/teamProfileParams';
import { getGroupedAndSortedParametrs } from 'lib/helpers/getGroupedAndSortedParametrs';
import { MatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings';
import { useMatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import { getMatchesStatistics } from 'store/team/teamService';
import {
  Overlay,
  Select,
  Spinner,
} from '../../ui';
import { TDTableItem } from './TDTableItem';
import { $api, API_URL } from '../../../config/api';
import cls from './TeamProfileMatchesTable.module.css';
import { teamActions } from '../../../store/team/teamSlice';
import { getFillteredTeams } from '../../../lib/helpers/getFillteredTeams';
import { TDTParametrs } from './TDTParametrs';
import { THTableItem } from './THTableItem';

export const TeamProfileMatchesTable = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [openMatchSelector, setOpenMatchSelector] = useState(false);
  const [openParametrsSelector, setOpenParametrSelector] = useState(false);
  // Состояние открытия выпадающего меню в XML
  const [openXMLmenu, setOpenXMLmenu] = useState(false);
  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const { id } = useParams();
  const idSeason = searchParams.get('season');
  const matches = useSelector(
    (state) => state.team.teamStatistic?.matches_list,
  );
  const l = useLexicon();
  const loading = useSelector((state) => state.team?.loadingMatchesStatistic);
  const matchesStat = useSelector(
    (state) => state.team.matchesStatistic?.matches,
  );

  const [teamParams, setTeamParams] = useState([]);

  const [loadingMatchesWithStat, setLoadingMathesWithStat] = useState(true);
  const [matchesWithStat, setMathesWithStat] = useState([]);

  const idTeam = useMemo(() => {
    const searchTeamId = searchParams.get('idTeam');
    if (id || searchTeamId) {
      return id || searchTeamId;
    }
    return null;
  }, [id, searchParams]);

  const preapreLink = (response) => {
    const fileUrl = response.data?.report;
    const fileLink = document.createElement('a');
    fileLink.href = fileUrl;
    fileLink.setAttribute('style', 'visibility: hidden');
    fileLink.setAttribute('download', 'report.xlsx');
    document.body.appendChild(fileLink);
    fileLink.click();
    fileLink.remove();
    dispatch(teamActions.setSelectedMatches([]));
  };

  const postSelectedMatches = async () => {
    const preparedMatches = matches.map((match) => match.id);
    try {
      const response = await $api.post(`/statistics/team_matches/${id}`, {
        matches: selectedMatches.length ? selectedMatches : preparedMatches,
        params: [],
      });
      preapreLink(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  function downloadFile(url, fileName) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = window.URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        window.URL.revokeObjectURL(blobUrl); // Освобождение ресурсов
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.error('Ошибка при скачивании файла:', e));
  }

  const postSelectedMatchesXML = async () => {
    const preparedMatches = matches.map((match) => match.id);
    try {
      const response = await $api.post(
        idSeason
          ? `/statistics/team_matches_xml/${id}?year_season_id=${idSeason}`
          : `/statistics/team_matches_xml/${id}`,
        {
          matches: selectedMatches.length ? selectedMatches : preparedMatches,
          params: [],
        },
      );
      const fileUrl = response.data?.file_url;
      downloadFile(fileUrl, 'report.xml')
      setOpenXMLmenu(false)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  // Раскоментировать в случае надобности скачивания Events
  // const postSelectedMatchesEventsXML = async () => {
  //   const preparedMatches = matches.map((match) => match.id)
  //   if (selectedMatches.length === 0) {
  //     alert('Please select mathes');
  //     return
  //   }
  //   try {
  //     const response = await $api.post('/statistics/match_event_unload', {
  //       file_type: 'xml',
  //       matches: selectedMatches,
  //     });
  //     const fileUrl = response.data?.file_url;
  //     downloadFile(`${API_URL}${fileUrl}`, 'report.zip')
  //     dispatch(teamActions.setSelectedMatches([]));
  //     setOpenXMLmenu(false)
  //   } catch (error) {
  //     // eslint-disable-next-line no-console
  //     console.log(error);
  //   }
  // };

  const selectMatchesOptions = useMemo(() => {
    if (matches?.length > 0) {
      if (selectedMatches?.length) {
        selectedMatches.forEach((match) => {
          dispatch(teamActions.setSelectedMatches({ checked: false, id: match }))
        })
      } else {
        matches.forEach((match) => {
          dispatch(teamActions.setSelectedMatches({ checked: false, id: match.id }))
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

  const selectedTeams = useMemo(() => getFillteredTeams(selectedMatches, matchesStat), [matchesStat, selectedMatches]);
  // Раскомментировать, если понадобится
  // const fillteredArray = useMemo(() => (selectedTeams.length ? selectedTeams : matchesStat), [matchesStat, selectedTeams]);

  const getMathesStat = async (
    params,
    mathesList,
    team,
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
      const response = await $api.get(`/stats/team/${team}?matches=${matchesIds?.join(',')}&params=${checkedParamsIds?.join(',')}`);
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
    const getTeamParams = async () => {
      try {
        let params = null;
        if (sessionStorage.getItem('teamParameters')) {
          params = JSON.parse(sessionStorage.getItem('teamParameters'))
        } else {
          const response = await $api.get('/stats/parameters/team/');
          const data = response.data?.results;
          if (data) {
            params = getGroupedAndSortedParametrs(data);
          }
        }
        setTeamParams(params);
      } catch (e) { /* empty */ }
    }

    getTeamParams();
  }, [])

  useEffect(() => {
    if (teamParams?.length > 0 && selectedTeams?.length > 0 && idTeam) {
      getMathesStat(
        teamParams,
        selectedTeams,
        idTeam,
      )
    } else {
      setMathesWithStat([]);
    }
  }, [teamParams, selectedTeams, idTeam])

  const handleCheckEvent = (item, checked) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked
  }

  const handleClickConfirm = () => {
    getMathesStat(
      teamParams,
      selectedTeams,
      id,
    )
    sessionStorage.setItem('teamParameters', JSON.stringify(teamParams))
    setOpenParametrSelector(false)
  }
  const handleClickReset = async () => {
    sessionStorage.setItem('teamParameters', JSON.stringify(teamParams))
    teamParams.forEach(([key, value]) => value.forEach((item) => handleCheckEvent(item, true)))
    await getMathesStat(
      teamParams,
      selectedTeams,
      id,
    )
  }
  // Сейчас не используется так как вынесли логику скачивания на страницу Матча
  const handleClickXML = () => {
    setOpenXMLmenu(!openXMLmenu)
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
            handleSaveSettings={() => {
              handleSaveSettings()
              setOpenMatchSelector(false)
            }}
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
                  style={isSelected ? { background: 'var(--main-whitesmoke)', color: 'black' } : {}}
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
          {teamParams.map(([key, value]) => (
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
        <button
          type='button'
          className={openMatchSelector ? cls.activeBtn : ''}
          onClick={() => setOpenMatchSelector(true)}
        >
          {l(12)}
        </button>
        <button
          type='button'
          className={openParametrsSelector ? cls.activeBtn : ''}
          // раскомментировать после того, как отпадёт надобность в заглушке
          // onClick={() => /* setOpenParametrSelector(true) */ setModalActive(true)}
          onClick={() => setOpenParametrSelector(true)}
        >
          {l(13)}
        </button>
        <button
          type='button'
          className={selectedMatches.length < 0 ? cls.disableBtn : cls.btnXML}
          onClick={() => postSelectedMatchesXML()}
          // onClick={handleClickXML}
        >
          {l(339)}
          {/* Раскоментировать в случае надобности */}
          {/* {openXMLmenu &&
          <div className={cls.modalXML}>
            <button type='button' onClick={() => postSelectedMatchesXML()}>Download Parameters</button>
            <button className={selectedMatches.length === 0 ? cls.disableBtn : ''} type='button' onClick={() => postSelectedMatchesEventsXML()}>Download Events</button>
          </div>} */}
        </button>
        <button
          type='button'
          className={selectedMatches.length < 0 ? cls.disableBtn : ''}
          onClick={() => postSelectedMatches()}
        >
          {l(14)}
        </button>
      </div>
      <div className={cls.tableContainer}>
        <table className={cls.matchesTable}>
          <thead>
            <tr>
              <th className={cls.fixDate} title='Date'>
                {l(121)}
              </th>
              <th className={cls.fixOpponent} title={l(122)}>
                {l(122)}
              </th>
              <th className={cls.fixScore} title={l(123)}>
                {l(123)}
              </th>
              {teamParams?.map(([key, value]) => <THTableItem array={value} key={key + Math.random()} />)}
            </tr>
          </thead>
          <tbody>
            {/* eslint-disable-next-line no-nested-ternary */}
            {loading || loadingMatchesWithStat ? (
              <tr style={{ textAlign: 'center' }}>
                <td colSpan='32'>
                  <Spinner size='medium' />
                </td>
              </tr>
            ) : matchesWithStat?.length > 0 ? (
              <>
                {matchesWithStat.map((match) => {
                  let scoreColor;
                  const score = match.score.split(':');

                  if (match?.home_away === 'Home match') {
                    if (+score[0] > +score[1]) {
                      scoreColor = '#03AC00';
                    } else if (+score[0] === +score[1]) {
                      scoreColor = '#BDB600';
                    } else {
                      scoreColor = '#D30D00';
                    }
                  } else if (+score[1] > +score[0]) {
                    scoreColor = '#03AC00';
                  } else if (+score[0] === +score[1]) {
                    scoreColor = '#BDB600';
                  } else {
                    scoreColor = '#D30D00';
                  }
                  return (
                    <tr key={match.id}>
                      <TDTableItem
                        style={{
                          background: 'var(--main-whitesmoke)',
                          left: '0px',
                          position: 'sticky',
                        }}
                        value={match.date?.split('T')?.[0]}
                        canHover={false}
                        match={match}
                      />
                      <TDTableItem
                        style={{
                          background: 'var(--main-whitesmoke)',
                          left: '100px',
                          position: 'sticky',
                        }}
                        onClick={() => window.open(
                          `/team/match?team=${id}&match=${match?.id}`,
                          '_blank',
                        )}
                        value={match.opponent}
                        match={match}
                      />
                      <TDTableItem
                        className={cls.stroke}
                        link={`/team/match/mistakes?team=${id}&match=${match.id}`}
                        style={{
                          background: 'var(--main-whitesmoke)',
                          color: scoreColor,
                          fontSize: 17,
                          fontWeight: 700,
                          left: '300px',
                          position: 'sticky',
                        }}
                        value={match.score}
                        match={match}
                        canHover={false}
                      />
                      {match?.parameters?.map((param) => {
                        const link = param.markers?.length > 0 && param.clickable ?
                          `/video_cuts?markers=${param.markers.join(',')}` :
                          null;
                        return (
                          <TDTableItem
                            key={param.parameter_id}
                            value={param.value}
                            match={match}
                            canHover={param.markers?.length > 0 && param.clickable}
                            link={link}
                          />
                        )
                      })}
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr style={{ textAlign: 'center' }}>
                <td colSpan='32'>{l(315)}</td>
              </tr>
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
