/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable postro4no/object-props */
/* eslint-disable max-len */
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { GearIcon } from 'components/ui/GearIcon/GearIcon';
import { useLexicon } from 'lib/hooks/useTranslates';
import { useSelector } from 'react-redux';
import { secondsToMMSS } from 'lib/helpers/secondToMMSS';
import { EventMap, eventsIcon } from 'assets/icons/EventsIcons';
import { TDTParametrs } from 'components/TeamProfileComponents/TeamProfileMatchesTable/TDTParametrs';
import { CheckBox } from 'components/ui/CheckBox/CheckBox';
import { teamsModalParams } from 'config/parametrs/teamsModalParams';
import { playersModalParams } from 'config/parametrs/playersModalParams';
import { $api, BASE_URL } from 'config/api';
import { goalkeepersModalParams } from 'config/parametrs/goalkeepersModalParams';
import { getGroupedAndSortedParametrs } from 'lib/helpers/getGroupedAndSortedParametrs';
import { Link } from 'react-router-dom';
import cls from './ShortStats.module.css'
import { Teams } from './components/Teams';
import { ListItemStat } from './components/ListItemStat';

export const ShortStats = () => {
  const [state, setState] = useState();
  return (
    <div className={cls.shortWrapper}>
      <TeamPlayer />
      <Events />
    </div>)
}

const TeamPlayer = () => {
  const [isPlayers, setIsPlayers] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const l = useLexicon();
  const handleChangeTab = (num: number) => {
    setIsPlayers(num)
  }
  const handleClickGear = () => setShowModal(!showModal)
  const changeComponent = (value: number) => {
    switch (value) {
      case 1: return <Players showModal={showModal} setShowModal={handleClickGear} />;
      case 2: return <Goalkeepers showModal={showModal} setShowModal={handleClickGear} />;
      default: return <Teams showModal={showModal} setShowModal={handleClickGear} />;
    }
  }
  return (
    <div className={cls.teamPlayer}>
      <button className={cls.xls} type='button'>{l(14)}</button>
      <div className={cls.teamPlayerTabs}>
        <div style={{ display: 'flex', gap: '5px' }}>
          <div
            style={isPlayers !== 0 ? { borderTopLeftRadius: '10px', color: 'black', padding: '10px' }
              : {
                backgroundColor: 'white',
                borderTopLeftRadius: '10px',
                color: 'black',
                padding: '10px',
                textDecoration: 'underline',
              }}
            className={cls.teams}
            onClick={() => handleChangeTab(0)}
          >TEAMS
          </div>
          <div
            style={isPlayers !== 1 ? { color: 'black', padding: '10px' }
              : {
                backgroundColor: 'white',
                color: 'black',
                padding: '10px',
                textDecoration: 'underline',
              }}
            className={cls.players}
            onClick={() => handleChangeTab(1)}
          >PLAYERS
          </div>
          <div
            style={isPlayers !== 2 ? { color: 'black', padding: '10px' }
              : {
                backgroundColor: 'white',
                color: 'black',
                padding: '10px',
                textDecoration: 'underline',
              }}
            className={cls.players}
            onClick={() => handleChangeTab(2)}
          >GOALKEEPERS
          </div>
        </div>
        <div onClick={handleClickGear}><GearIcon /></div>
      </div>
      {
        changeComponent(isPlayers)
      }
    </div>)
}

// TeamPlayer components

export const Players = ({ setShowModal, showModal }: {setShowModal: any, showModal: boolean}) => {
  // other commands
  const l = useLexicon()
  let selectParametrs = playersModalParams;
  if (!sessionStorage.getItem('playersParamsModal') || JSON.parse(sessionStorage.getItem('playersParamsModal')!).length !== playersModalParams.length) {
    sessionStorage.setItem('playersParamsModal', JSON.stringify(playersModalParams))
  } else {
    selectParametrs = JSON.parse(sessionStorage.getItem('playersParamsModal')!)
  }
  // States
  const [matchesWithStatHome, setMathesWithStatHome] = useState<any>([]);
  const [matchesWithStatAway, setMathesWithStatAway] = useState<any>([]);
  const [playerParams, setPlayerParams] = useState<any>([])
  const [homePlayer, setHomePlayer] = useState<any>(null);
  const [awayPlayer, setAwayPlayer] = useState<any>(null);
  const match = useSelector((state: any) => state?.match?.matchPlayers)
  // Functions changes select
  const handleSelectChangeHome = (event: any) => {
    const tmp = match?.players_stats?.home_team.find((item: any) => item.id === +event.target.value)
    setHomePlayer(tmp);
  };

  const handleSelectChangeAway = (event: any) => {
    const tmp = match?.players_stats?.away_team.find((item: any) => item.id === +event.target.value)
    setAwayPlayer(tmp);
  };
  // handlers
  const handleClickConfirm = () => {
    sessionStorage.setItem('playersParamsModal', JSON.stringify(selectParametrs))
    setShowModal()
  }
  const handleCheckEvent = (item: any, checked: any) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked
  }
  // use effects
  useEffect(() => {
    setHomePlayer(match?.players_stats?.home_team[0])
    setAwayPlayer(match?.players_stats?.away_team[0])
  }, [])

  useEffect(() => {
    const getTeamParams = async () => {
      try {
        const response = await $api.get('/stats/parameters/player/');
        const data = response.data?.results;
        if (data) {
          setPlayerParams(getGroupedAndSortedParametrs(data) as any);
        }
      } catch (e) { /* empty */ }
    }

    getTeamParams();
  }, [])
  // Memo

  /* const groupedAndSortedPlayerParams = useMemo(() => {
    if (playerParams?.length > 0) {
      return getGroupedAndSortedParametrs(playerParams);
    }
    return [];
  }, [playerParams]); */

  //  useEffect(() => {
  //    const getTeamParams = async () => {
  //      try {
  //        const response = await $api.get('/stats/parameters/player/');
  //        const data = response.data?.results;
  //        if (data) {
  //          setPlayerParams(getGroupedAndSortedParametrs(playerParams) as any);
  //        }
  //      } catch (e) { /* empty */ }
  //    }
  //
  //  getTeamParams();
  //  }, [])

  const handleClickReset = () => {
    const newParams: Array<[string, Array<{ [key: string]: any }>]>
  = playerParams.map(([key, value]: [string, Array<any>]) => [key, value.map((item: any) => ({ ...item, checked: false }))]);
    setPlayerParams(newParams)
  }

  return (
    <div className={cls.teamsWrapper}>
      <div className={cls.teamsNames}>
        <div className={cls.logos}>
          {/* <img width={35} src={homePlayer?.photo} alt='pl' /> */}
          <select value={homePlayer?.id} onChange={(e) => handleSelectChangeHome(e)}>
            {match?.players_stats?.home_team.filter((item: any) => item.positions[0] !== 'GK').map((item: any) => (
              <option
                key={item.display_name + Math.random()}
                value={item.id}
                data-value={item.id}
              >{`${item?.name} ${item?.surname}`}
              </option>))}
          </select>
        </div>
        <div className={cls.logos}>
          {/* <img width={35} src={awayPlayer?.photo} alt='pl' /> */}
          <select value={awayPlayer?.id} onChange={(e) => handleSelectChangeAway(e)}>
            {match?.players_stats?.away_team.filter((item: any) => item.positions[0] !== 'GK').map((item: any) => (
              <option
                key={item.display_name + Math.random()}
                value={item.id}
                data-value={item.id}
              >{`${item?.name} ${item?.surname}`}
              </option>))}
          </select>
        </div>
      </div>
      <div className={cls.listWrapper}>
        <ul className={cls.paramsList}>
          {playerParams.map(([key, value]: any) => (
            <>
              <p>{key}</p>
              <ul style={{ width: '100%' }}>
                {value.map((item2: any) => {
                  if (!item2.checked) return <> </>
                  return (
                    <li style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                      <span>{homePlayer?.stats?.find((stat: any) => stat.parameter_name === item2.name)?.value}</span>
                      <span style={{ width: '250px' }}>{item2.name}</span>
                      <span>{awayPlayer?.stats?.find((stat: any) => stat.parameter_name === item2.name)?.value}</span>
                    </li>)
                })}
              </ul>
            </>))}
          {/* <li className={cls.nodataava}>No data available</li> */}
          {/* {selectParametrs.map((item, index) => selectParametrs[index].checked && <ListItemStat key={item.key} away={awayPlayer?.statistics?.[item.key] ?? '-'} home={homePlayer?.statistics?.[item.key] ?? '-'} title={item.label} />)} */}
        </ul>
      </div>
      {showModal &&
      <div className={cls.modalGear}>
        <ul className={cls.modalList}>
          {playerParams.map(([key, value]: any) => (
            <TDTParametrs
              array={value}
              title={key}
              key={key}
              callback={handleCheckEvent}
            />
          ))}
        </ul>
        <button type='button' className={cls.confirmBtn} onClick={handleClickConfirm}>{l(446)}</button>
        <button type='button' className={cls.resetBtnPlayers} onClick={handleClickReset}>Reset</button>
      </div>}
    </div>)
}

export const Goalkeepers = ({ setShowModal, showModal }: {setShowModal: any, showModal: boolean}) => {
  const [homePlayer, setHomePlayer] = useState<any>(null);
  const [awayPlayer, setAwayPlayer] = useState<any>(null);
  const [selectParametrs, setSelectParametrs] = useState<typeof goalkeepersModalParams>([])
  const l = useLexicon()
  const match = useSelector((state: any) => state?.match?.matchPlayers)

  const handleSelectChangeHome = (event: any) => {
    const tmp = match?.players_stats?.home_team.find((item: any) => item.id === +event.target.value)
    setHomePlayer(tmp);
  };

  const handleSelectChangeAway = (event: any) => {
    const tmp = match.players_stats?.away_team.find((item: any) => item.id === +event.target.value)
    setAwayPlayer(tmp);
  };
  useEffect(() => {
    setHomePlayer(match?.players_stats?.home_team.filter((item: any) => item.positions[0] === 'GK')[0])
    setAwayPlayer(match?.players_stats?.away_team.filter((item: any) => item.positions[0] === 'GK')[0])
    const checkExistSelectedParams = () => {
      try {
        if (!sessionStorage.getItem('goalkeepersParamsModal') || JSON.parse(sessionStorage.getItem('goalkeepersParamsModal')!).length !== goalkeepersModalParams.length) {
          sessionStorage.setItem('goalkeepersParamsModal', JSON.stringify(goalkeepersModalParams))
          setSelectParametrs(goalkeepersModalParams)
        } else {
          setSelectParametrs(JSON.parse(sessionStorage.getItem('goalkeepersParamsModal')!))
        }
      } catch (e) {
        console.log('check exist selected params err');
      }
    }

    checkExistSelectedParams();
  }, [])

  const handleClickConfirm = () => {
    sessionStorage.setItem('goalkeepersParamsModal', JSON.stringify(selectParametrs))
    setShowModal()
  }
  const handleClickReset = () => {
    const resetedParametrs = selectParametrs.map((item) => ({ ...item, checked: false }))
    setSelectParametrs(resetedParametrs);
    sessionStorage.setItem('goalkeepersParamsModal', JSON.stringify(resetedParametrs))
  }
  const handleCheckEvent = (item: any, checked: any) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked
  }
  const selectedGroup1 = selectParametrs.filter(
    (item) => item.groupe === 'General',
  );
  const selectedGroup2 = selectParametrs.filter(
    (item) => item.groupe === 'Shots / Saves',
  );
  const selectedGroup3 = selectParametrs.filter(
    (item) => item.groupe === 'GK Actions',
  );
  const selectedGroup4 = selectParametrs.filter(
    (item) => item.groupe === 'Passes',
  );
  const selectedGroup5 = selectParametrs.filter(
    (item) => item.groupe === 'Passes by distance',
  );
  const selectedGroup6 = selectParametrs.filter(
    (item) => item.groupe === 'Passes by side',
  );

  return (
    <div className={cls.teamsWrapper}>
      <div className={cls.teamsNames}>
        <div className={cls.logos}>
          {/* <img width={35} src={homePlayer?.photo} alt='pl' /> */}
          <select value={homePlayer?.id} onChange={(e) => handleSelectChangeHome(e)}>
            {match?.players_stats?.home_team?.filter((item: any) => item.positions[0] === 'GK').map((item: any) => (
              <option
                key={item.name + Math.random()}
                value={item.id}
                data-value={item.id}
              >{item?.name}
              </option>))}
          </select>
        </div>
        <div className={cls.logos}>
          {/* <img width={35} src={awayPlayer?.photo} alt='pl' /> */}
          <select value={awayPlayer?.id} onChange={(e) => handleSelectChangeAway(e)}>
            {match?.players_stats?.away_team?.filter((item: any) => item.positions[0] === 'GK').map((item: any) => (
              <option
                key={item.name + Math.random()}
                value={item.id}
                data-value={item.id}
              >{item?.name} {item?.surname}
              </option>))}
          </select>
        </div>
      </div>
      <div className={cls.listWrapper}>
        <ul className={cls.paramsList}>
          {/* <li className={cls.nodataava}>No data available</li> */}
          {selectParametrs.map((item, index) => selectParametrs[index].checked && <ListItemStat key={item.name} away={awayPlayer?.stats.find((item2: any) => item2.parameter_name === item.name)?.value ?? '-'} home={homePlayer?.stats.find((item2: any) => item2.parameter_name === item.name)?.value ?? '-'} title={item.label} />)}
        </ul>
      </div>
      {showModal &&
      <div className={cls.modalGear}>
        <ul className={cls.modalList}>
          <TDTParametrs array={selectedGroup1} callback={handleCheckEvent} title='General' />
          <TDTParametrs array={selectedGroup2} callback={handleCheckEvent} title='Shots / Saves' />
          <TDTParametrs array={selectedGroup3} callback={handleCheckEvent} title='GK Actions' />
          <TDTParametrs array={selectedGroup4} callback={handleCheckEvent} title='Passes' />
          <TDTParametrs array={selectedGroup5} callback={handleCheckEvent} title='Passes by distance' />
          <TDTParametrs array={selectedGroup6} callback={handleCheckEvent} title='Passes by side' />
        </ul>
        <button type='button' className={cls.confirmBtn} onClick={handleClickConfirm}>{l(446)}</button>
        <button type='button' className={cls.resetBtnGK} onClick={handleClickReset}>Reset</button>
      </div>}
    </div>)
}

export const Events = () => {
  const [state, setState] = useState<Array<any>>([]);
  const events = useSelector((reduxState: any) => reduxState.match?.eventsMatch);
  const loading = useSelector((reduxState: any) => reduxState.match?.loadginEvents);
  useEffect(() => {
    setState(events.markers)
  }, [events])

  const l = useLexicon()
  return (
    <div className={cls.events}>
      <button className={cls.xls} type='button'>{l(14)}</button>
      <div className={cls.teamPlayerTabs}>
        <div />
        <div style={{
          color: 'black',
          fontSize: '20px',
          padding: '7px',
          textDecoration: 'underline',
        }}
        >MATCH EVENTS
        </div>
        <GearIcon />
      </div>
      <div className={cls.teamsWrapper}>
        <div className={cls.eventsHeading}>
          <div style={{ textAlign: 'center' }}>EVENT</div>
          <div>MIN OF MATCH</div>
          <div>DESCRIPTION</div>
        </div>
        <div className={cls.listWrapper}>
          {!loading &&
          <ul className={cls.paramsListEvent}>
            {state?.length > 0 ? state.map((item: any) => {
              const time = secondsToMMSS(item.second);
              return (
                <Link to={`/video_cuts?markers=${item.id}`} className={cls.eventItem} key={item.second + Math.random()}>
                  <div style={{ display: 'flex', gap: '15px' }}><div style={{ width: '15px' }}>{eventsIcon[item.action.title as keyof EventMap] }</div>{l(item.action.lexic_id) || item.action.title}</div>
                  <div style={{ textAlign: 'center' }}>{time}</div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {item?.creator && <img width={25} src={`https://platform.smrtstats.com:8888${item?.team_logo}`} alt='' />}
                    {item?.creator && <img width={25} src={`https://platform.smrtstats.com:8888${item?.creator?.photo}`} alt='' />}
                    {item.action === 'Substitution' ?
                      <><p style={{ margin: 0 }}>{item?.creator?.surname} Off, {item?.recipient?.surname} On</p><img width={25} src={`https://platform.smrtstats.com:8888${item?.recipient?.photo}`} alt='' /></>
                      : <p style={{ margin: 0 }}>{l(item.action.lexic_id) || item?.action?.title} {item?.creator?.surname}</p>}
                    {/* <div>{item.description?.text}</div> */}
                  </div>
                </Link>)
            })
              : <li className={cls.nodataava}>No data available</li>}
          </ul>}
        </div>
      </div>
    </div>)
}

