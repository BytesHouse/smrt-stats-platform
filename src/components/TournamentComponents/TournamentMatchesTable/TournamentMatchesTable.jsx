/* eslint-disable no-empty */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useMemo, useState } from 'react';
import { teamSelectedParams } from 'config/parametrs/teamProfileParams';
import { TDTParametrs } from 'components/TeamProfileComponents/TeamProfileMatchesTable/TDTParametrs';
import { TDTableItem } from 'components/TeamProfileComponents/TeamProfileMatchesTable/TDTableItem';
import {
  Overlay,
  Select,
  Spinner,
} from 'components/ui';
import { useLexicon } from 'lib/hooks/useTranslates';
import { THTableItem } from 'components/TeamProfileComponents/TeamProfileMatchesTable/THTableItem';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupedAndSortedParametrs } from 'lib/helpers/getGroupedAndSortedParametrs';
import { $api, API_URL } from 'config/api';
import { MatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings';
import { useMatchesSettings } from 'components/TeamProfileComponents/TeamProfileEvents/MatchesSettings/hooks';
import { teamActions } from 'store/team/teamSlice';
import cls from './TournamentMatchesTable.module.css';

export const TournamnetMatchesTable = () => {
  const dispatch = useDispatch();
  const [openMatchSelector, setOpenMatchSelector] = useState(false);
  const [openParametrsSelector, setOpenParametrSelector] = useState(false);
  const [teamParams, setTeamParams] = useState([]);
  const matchesStat = useSelector(
    (state) => state.tournament?.tournaments?.matches,
  );
  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const loading = useSelector((state) => state.tournament?.loadingTournaments);
  const paginateLoading = useSelector(
    (state) => state.tournament?.paginateLoading,
  );
  const { id } = useParams();
  const l = useLexicon();
  let selectParametrs = teamSelectedParams;

  if (!sessionStorage.getItem('teamParams')) {
    sessionStorage.setItem('teamParams', JSON.stringify(teamSelectedParams));
  } else {
    selectParametrs = JSON.parse(sessionStorage.getItem('teamParams'));
  }

  const handleCheckEvent = (item, checked) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked;
  };
  const handleClickConfirm = () => {
    sessionStorage.setItem('teamParams', JSON.stringify(selectParametrs));
    setOpenParametrSelector(false);
  };

  const handleClickReset = () => {
    sessionStorage.setItem('teamParams', JSON.stringify(selectParametrs));
    teamParams.forEach(([key, value]) => value.forEach((item) => handleCheckEvent(item, true)))
    setOpenParametrSelector(false);
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
  const postSelectedMatchesEventsXML = async () => {
    const ids = matchesStat.map((item) => item.id);
    if (ids.length === 0) {
      return
    }
    try {
      const response = await $api.post('/statistics/match_event_unload', {
        file_type: 'xlsx',
        matches: ids,
      });
      const fileUrl = response.data?.file_url;
      downloadFile(`${API_URL}${fileUrl}`, 'report.zip')
      // dispatch(teamActions.setSelectedMatches([]));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const selectMatchesOptions = useMemo(() => {
    if (matchesStat?.length > 0) {
      if (selectedMatches?.length) {
        selectedMatches.forEach((match) => {
          dispatch(teamActions.setSelectedMatches({ checked: false, id: match }))
        })
      } else {
        matchesStat.forEach((match) => {
          dispatch(teamActions.setSelectedMatches({ checked: false, id: match.id }))
        })
      }

      const options = matchesStat.map((match) => ({
        key: match.id,
        title: `${match.away_team.name} ${match.score} ${match.home_team.name} ${match.date?.split('T')[0]
        }`,
        ...match,
      }));
      return options;
    }

    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchesStat]);

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
    <>
      <div className={cls.headerContainer}>
        <div className={cls.selectContainer}>
          <h2 className={cls.headerGameWeek}>Game Week</h2>
          {/* <select className={cls.headerSelect}>
            <option value='Group Stage'>Group Stage</option>
          </select> */}
        </div>
      </div>
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
              isCompetition
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
            onClick={() => setOpenParametrSelector(true)}
          >
            {l(13)}
          </button>
          {/* раскомментировать, когда появиться возможность скачивать xls */}
          <button
            type='button'
            className={matchesStat?.length < 0 ? cls.disableBtn : ''}
            onClick={() => postSelectedMatchesEventsXML()}
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
                <th className={cls.fixOpponent} title={l(3)}>
                  {l(3)}
                </th>
                <th className={cls.fixScore} title={l(123)}>
                  {l(123)}
                </th>
                {teamParams?.map(([key, value]) => <THTableItem array={value} key={key} />)}
              </tr>
            </thead>
            <tbody>
              {/* eslint-disable-next-line no-nested-ternary */}
              {loading || paginateLoading ? (
                <tr style={{ textAlign: 'center' }}>
                  <td colSpan='41'>
                    <Spinner size='medium' />
                  </td>
                </tr>
              ) : matchesStat?.length > 0 ? (
                <>
                  {matchesStat?.map((match) => (
                    <MatchStat handler={handleClickConfirm} matchParams={teamParams} match={match} id={id} />
                  ))}
                </>
              ) : (
                <tr style={{ textAlign: 'center' }}>
                  <td colSpan='16'>No matches</td>
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
    </>
  );
};

const MatchStat = ({
  id,
  match,
  matchParams,
}) => {
  const [matchesWithStatHome, setMathesWithStatHome] = useState([]);
  const [matchesWithStatAway, setMathesWithStatAway] = useState([]);
  const [, setLoadingMathesWithStat] = useState(true);

  useEffect(() => {
    const getMathesStat = async (
      params,
    ) => {
      setLoadingMathesWithStat(true);
      try {
        let allParams = []
        params.forEach(([_, value]) => {
          allParams = [...allParams, ...value]
        })
        allParams = allParams?.filter((param) => param.checked)
        const checkedParamsIds = allParams?.map((item) => item.id);
        const response = await $api.get(`/stats/match_teams/${match.id}?params=${checkedParamsIds?.join(',')}`);
        const dataHome = response.data?.teams_stats?.home_team?.stats;
        const dataAway = response.data?.teams_stats?.away_team?.stats;
        setMathesWithStatHome(dataHome);
        setMathesWithStatAway(dataAway);
      } catch (e) {
        // console.log(e);
      } finally {
        setLoadingMathesWithStat(false);
      }
    }
    getMathesStat(matchParams)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchParams])
  const getWinner = (score, isHome) => {
    let scoreColor;
    if (isHome) {
      if (+score[0] > +score[2]) {
        scoreColor = '#03AC00';
      } else if (+score[0] === +score[2]) {
        scoreColor = '#BDB600';
      } else {
        scoreColor = '#D30D00';
      }
    } else if (+score[2] > +score[0]) {
      scoreColor = '#03AC00';
    } else if (+score[0] === +score[2]) {
      scoreColor = '#BDB600';
    } else {
      scoreColor = '#D30D00';
    }
    return scoreColor
  }
  return (
    <>
      <tr key={match.id}>
        <TDTableItem
          style={{
            background: 'var(--main-whitesmoke)',
            color: 'black',
            left: '0px',
            position: 'sticky',
          }}
          value={match.date?.split('T')?.[0]}
          canHover={false}
          rowSpan='2'
          match={match}
        />
        <TDTableItem
          style={{
            background: 'var(--main-whitesmoke)',
            left: '100px',
            position: 'sticky',
          }}
          onClick={() => window.open(
            `/team/match?team=${match.home_team.id}&match=${match?.id}`,
            '_blank',
          )}
          value={match.home_team.name}
          match={match}
        />
        <TDTableItem
          className={cls.stroke}
          style={{
            background: 'var(--main-whitesmoke)',
            color: getWinner(match?.score, true),
            fontSize: '17px',
            fontWeight: 700,
            left: '300px',
            position: 'sticky',
          }}
          value={match.home_team.stats['Goals scored']}
          canHover={false}
          match={match}
          link={`/tournament/video/${id}?match=${match.id}`}
        />
        {matchParams.map(([_, value]) => value.map(({ checked, name }) => {
          const tmp = matchesWithStatHome.find((matchItem) => matchItem.parameter_name === name);
          const link = tmp?.markers?.length > 0 ?
            `/video_cuts?markers=${tmp?.markers.join(',')}` :
            null;
          return (checked && <TDTableItem
            key={tmp?.parameter_id}
            value={tmp?.value}
            match={match}
            canHover={tmp?.markers?.length > 0 && tmp?.clickable}
            link={link}
          />)
        }))}
      </tr>
      <tr>
        <TDTableItem
          style={{
            background: 'var(--main-whitesmoke)',
            left: '100px',
            position: 'sticky',
          }}
          value={match.away_team.name}
          match={match}
          onClick={() => window.open(
            `/team/match?team=${match.away_team.id}&match=${match?.id}`,
            '_blank',
          )}
        />
        <TDTableItem
          className={cls.stroke}
          style={{
            background: 'var(--main-whitesmoke)',
            color: getWinner(match?.score, false),
            fontWeight: 700,
            left: '300px',
            position: 'sticky',
          }}
          value={match.away_team.stats['Goals scored']}
          match={match}
          canHover={false}
          link={`/tournament/video/${id}?match=${match.id}`}
        />
        {matchParams.map(([_, value]) => value.map(({ checked, name }) => {
          const tmp = matchesWithStatAway.find((matchItem) => matchItem.parameter_name === name);
          const link = tmp?.markers?.length > 0 ?
            `/video_cuts?markers=${tmp?.markers.join(',')}` :
            null;
          return (checked && <TDTableItem
            key={tmp?.parameter_id}
            value={tmp?.value}
            match={match}
            canHover={tmp?.markers?.length > 0 && tmp?.clickable}
            link={link}
          />)
        }))}
      </tr>
    </>)
}
