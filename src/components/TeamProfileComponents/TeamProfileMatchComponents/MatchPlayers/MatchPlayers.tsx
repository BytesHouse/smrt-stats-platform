/* eslint-disable postro4no/object-props */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {
  useEffect,
  useMemo,
  useState,
} from 'react'
import { GearIcon } from 'components/ui/GearIcon/GearIcon'
import { useLexicon } from 'lib/hooks/useTranslates';
import { EyeIcon } from 'components/ui/EyeIcon/EyeIcon';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TDTParametrs } from 'components/TeamProfileComponents/TeamProfileMatchesTable/TDTParametrs';
import { $api } from 'config/api';
import { getGroupedAndSortedParametrs } from 'lib/helpers/getGroupedAndSortedParametrs';
import cls from './MatchPlayers.module.css'

export const MatchPlayers = () => {
  const [showModal, setShowModal] = useState(false);
  const [playerParams, setPlayerParams] = useState([]);
  const [isPlayer, setIsPlayer] = useState(true)
  const handleClickGear = () => setShowModal(!showModal)
  const l = useLexicon();
  const match = useSelector((state: any) => state?.match.match)
  const players = useSelector((state: any) => state?.match?.matchPlayers)
  const loading = useSelector((state: any) => state?.match.loadingMatch);
  const handleClickConfirm = () => {
    handleClickGear()
  }

  const groupedAndSortedPlayerParams = useMemo(() => {
    if (playerParams?.length > 0) {
      return getGroupedAndSortedParametrs(playerParams);
    }
    return [];
  }, [playerParams]);

  useEffect(() => {
    const getPlayerParams = async () => {
      try {
        const response = await $api.get('/stats/parameters/player/');
        const data = response.data?.results;
        if (data) {
          setPlayerParams(data);
        }
      } catch (e) { /* empty */ }
    }

    getPlayerParams();
  }, [])
  const handleCheckEvent = (item: any, checked: any) => {
    // eslint-disable-next-line no-param-reassign
    item.checked = !checked;
  };
  return (
    <div className={cls.wrapper}>
      <div className={cls.header}>
        <span />
        <div className={cls.headerNav}>
          <button
            style={{ textDecoration: isPlayer ? 'underline' : '' }}
            className={cls.playerBtn}
            type='button'
            onClick={() => setIsPlayer(true)}
          >{l(5)}
          </button>
          <button
            style={{ textDecoration: isPlayer ? '' : 'underline' }}
            className={cls.playerBtn}
            type='button'
            onClick={() => setIsPlayer(false)}
          >Goalkeepers
          </button>
        </div>
        <div onClick={handleClickGear}><GearIcon /></div>
      </div>
      {
        !loading && (
          <div className={cls.players}>
            <PlayersTable
              group={groupedAndSortedPlayerParams}
              team={players?.players_stats?.home_team}
              isPlayers={isPlayer}
              squad={match.home_squad}
            />
            <PlayersTable
              group={groupedAndSortedPlayerParams}
              team={players?.players_stats?.away_team}
              isPlayers={isPlayer}
              squad={match.away_squad}
            />
            {showModal &&
            <div className={cls.modalGear}>
              {groupedAndSortedPlayerParams.map(([key, value]) => (
                <TDTParametrs
                  array={value}
                  title={key}
                  key={key}
                  callback={handleCheckEvent}
                />
              ))}
              <button className={cls.confirmBtn} type='button' onClick={handleClickConfirm}>{l(446)}</button>
            </div>}
          </div>
        )
      }
      {showModal &&
      <div className={cls.modalGear}>
        <ul className={cls.modalList}>
          {groupedAndSortedPlayerParams.map(([key, value]) => (
            <TDTParametrs
              array={value}
              title={key}
              key={key}
              callback={handleCheckEvent}
            />
          ))}
        </ul>
        <button className={cls.confirmBtn} type='button' onClick={handleClickConfirm}>{l(446)}</button>
      </div>}
    </div>)
}

const PlayersTable = ({
  group,
  isPlayers,
  squad,
  team,
}: { group: any, isPlayers: boolean, squad: any, team: any }) => {
  const callback = !isPlayers ? (item: any) => item.positions[0] === 'GK' : (item: any) => item.positions[0] !== 'GK'
  return (
    <div>
      <div className={cls.playersHeading}>
        <div className={cls.leftStats}>
          <span>№</span>
          <span>Names</span>
          {/* <span><EyeIcon /></span> */}
        </div>
        <ul className={cls.rightStats}>
          {group.map((item:any) => item[1].map((item2: any) => item2.checked && <ListItem key={item2.id} id={item2.id} title={item2.name} />))}
        </ul>
      </div>
      <div className={cls.statsWrapper}>
        <div className={cls.teamName} style={{ backgroundColor: squad?.color, color: squad?.color_number }}><img src={squad?.team?.logo} width='45' height='45' alt='teamLogo' /><div className={cls.text}>{squad?.team?.name}</div></div>
        <div style={{ background: 'var(--main-light-blue)', flex: 1, minHeight: '430px' }}>
          {team?.filter(callback).map((item: any) => (
            <div className={cls.row}>
              <div className={cls.rowLeftStats}>
                <span style={{ width: '15px' }}>{item.number}</span>
                <Link to={`/player/${item.id}`} style={{ width: '350px' }}>{item?.name} {item?.surname}</Link>
                <span style={{ fontWeight: 'bold' }}>{item?.positions?.[0]}</span>
              </div>
              <ul className={cls.rowRightStats}>
                {group.map((item2:any) => item2[1].map((item3: any) => {
                  const tmp = item?.stats.find((stat: any) => stat.parameter_name === item3.name)
                  const link = tmp?.markers?.length > 0 ?
                    `/video_cuts?markers=${tmp.markers.join(',')}` :
                    null;
                  return item3.checked && <li key={item3 + Math.random()} className={cls.itemLi}>{link ? <Link className={cls.links} to={link}>{Math.round(tmp?.value)}</Link> : <>{Math.round(tmp?.value)}</>}</li>
                }))}
              </ul>
            </div>))}
        </div>
      </div>
    </div>)
}

const ListItem = ({ id, title }: { id: number, title: string }) => {
  const [state, setState] = useState('false');

  return (
    <li title={title}>
      {/* {extractFirstCharacters(title)} <Dot /> */}
      {extractFirstCharacters(title)}
    </li>
  )
}

const Dot = () => (
  <svg width='7' height='7' viewBox='0 0 7 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <circle cx='3.5' cy='3.5' r='3.5' fill='#B4EB54' />
  </svg>
)
export function extractFirstCharacters(str: string) {
  if (!str) return ''
  // Разбиваем строку на слова
  const tmp = str.replace('-', ' - ')
  const words = tmp.split(' ');

  // Получаем первый символ каждого слова
  const firstCharacters = words.map((word: any) => word.charAt(0));

  // Соединяем первые символы в новую строку
  const result = firstCharacters.join('');

  return result;
}
