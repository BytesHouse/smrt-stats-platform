/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-len */
import { $api } from 'config/api';
import { Parametr, getGroupedAndSortedParametrs } from 'lib/helpers/getGroupedAndSortedParametrs';
import {
  useEffect,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TDTParametrs } from 'components/TeamProfileComponents/TeamProfileMatchesTable/TDTParametrs';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from '../ShortStats.module.css'

export const Teams = ({ setShowModal, showModal }: {setShowModal: any, showModal: boolean}) => {
  const [teamParams, setTeamParams] = useState([])
  const l = useLexicon()
  const [, setLoadingMathesWithStat] = useState(true);
  const [matchesWithStatHome, setMathesWithStatHome] = useState<any>([]);
  const [matchesWithStatAway, setMathesWithStatAway] = useState<any>([]);
  const match = useSelector((stateRedux:any) => stateRedux?.match?.statisticsMatch?.match);
  const teams = useSelector((stateRedux:any) => stateRedux?.match?.match);
  const handleCheckEvent = (item: any, checked: any) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked
  }

  const getMathesStat = async (
    params: any,
  ) => {
    setLoadingMathesWithStat(true);
    try {
      let allParams = [] as any
      params.forEach(([_, value]: any) => {
        allParams = [...allParams, ...value]
      })
      allParams = allParams?.filter((param: any) => param.checked)
      const checkedParamsIds = allParams?.map((item: any) => item.id);
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

  useEffect(() => {
    const getTeamParams = async () => {
      try {
        let params = null;
        if (sessionStorage.getItem('teamParameters')) {
          params = JSON.parse(sessionStorage.getItem('teamParameters')!)
        } else {
          const response = await $api.get('/stats/parameters/team/');
          const data = response.data?.results;
          if (data) {
            params = getGroupedAndSortedParametrs(data);
          }
        }
        getMathesStat(params)
        setTeamParams(params);
      } catch (e) { /* empty */ }
    }
    getTeamParams();
  }, [match])

  const handleClickConfirm = () => {
    getMathesStat(
      teamParams,
    )
    setShowModal()
  }

  const handleClickReset = async () => {
    teamParams.forEach(([key, value]: [string, Array<any>]) => value.forEach((item: any) => handleCheckEvent(item, true)));
    await getMathesStat(
      teamParams,
    )
  }
  return (
    <div className={cls.teamsWrapper}>
      <div className={cls.teamsNames}>
        <div className={cls.logos}>
          <img width={35} src={teams?.home_squad?.team?.logo} alt='team' />
          <span>{match?.home_team}</span>
        </div>
        <div className={cls.logos}>
          <img width={35} src={teams?.away_squad?.team?.logo} alt='team' />
          <span>{match?.away_team}</span>
        </div>
      </div>
      <div className={cls.listWrapper}>
        <ul className={cls.paramsList}>
          {teamParams.map(([key, values]: any) => {
            const isAllChecked = values.some(((item: Parametr) => item.checked === true))
            return (
              <>
                {!isAllChecked ? <> </> : <p>{key}</p>}
                <ul style={{ width: '100%' }}>
                  {values.map(({ checked, name }: any) => {
                    const tmpHome = matchesWithStatHome.find((stat: any) => stat.parameter_name === name)
                    const tmpAway = matchesWithStatAway.find((stat: any) => stat.parameter_name === name)
                    const linkHome = tmpHome?.markers?.length > 0 ?
                      `/video_cuts?markers=${tmpHome.markers.join(',')}` :
                      null;
                    const linkAway = tmpAway?.markers?.length > 0 ?
                      `/video_cuts?markers=${tmpAway.markers.join(',')}` :
                      null;
                    const sHome = tmpHome?.value ?? '-';
                    const sAway = tmpAway?.value ?? '-';
                    if (!checked) return <> </>
                    return (
                      <li style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                        width: '100%',
                      }}
                      >
                        {linkHome ? <Link to={linkHome}>{sHome}</Link> : <span>{sHome}</span> }
                        <span style={{ width: '350px' }}>{name}</span>
                        {linkAway ? <Link to={linkAway}>{sAway}</Link> : <span>{sAway}</span> }
                      </li>)
                  })}
                </ul>
              </>)
          })}
        </ul>
      </div>
      {showModal &&
        <div className={cls.modalGear}>
          <ul className={cls.modalList}>
            {teamParams.map(([key, value]) => (
              <TDTParametrs
                array={value}
                title={key}
                key={key}
                callback={handleCheckEvent}
              />
            ))}
          </ul>
          <button className={cls.confirmBtn} type='button' onClick={handleClickConfirm}>{l(446)}</button>
          <button className={cls.resetBtn} type='button' onClick={handleClickReset}>Reset</button>
        </div>}
    </div>)
}
