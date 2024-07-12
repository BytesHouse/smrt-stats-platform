/* eslint-disable no-param-reassign */
import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { Skeleton } from '../../../ui';
import {
  $api,
  API_URL,
  BASE_URL,
} from '../../../../config/api';
import cls from './PlayerInfo.module.css';
import avatar from '../../../../images/avatar.png';
import smrtPlacholderImg from '../../../../images/smrt_placeholder.jpg';
import { FavoritesIcon } from './FavoritesIcon';
import { getPlayerStatisticMatches, getPlayerStatistics } from '../../../../store/player/playerService';

export const PlayerInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const player = useSelector((state) => state.player.playerStatistic?.player);
  const stat = useSelector((state) => state.player.playerStatistic);
  const loading = useSelector((state) => state.player.loadingPlayerStatistic);
  const l = useLexicon();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFavorites, setIsFavorites] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('');

  const idPlayer = useMemo(() => {
    const searchPlayerId = searchParams.get('player');
    if (id || searchPlayerId) {
      return id || searchPlayerId;
    }
    return null;
  }, [id, searchParams]);

  const idTeam = useMemo(() => {
    if (player?.team?.id) {
      return player.team.id;
    }

    if (player?.teams?.[0]?.id) {
      return player.teams[0].id;
    }

    return null;
  }, [player]);

  const playerLogo = useMemo(() => {
    if (player?.photos?.length > 0) {
      return `${API_URL}${player?.photos?.[0].image}`;
    }
    return avatar;
  }, [player]);

  const nationalityFlag = useMemo(() => {
    if (player?.nationality?.[0]?.flag) {
      return player.nationality[0].flag;
    }
    return smrtPlacholderImg;
  }, [player]);

  const teamLogo = useMemo(() => {
    if (player?.team?.logo) {
      return player?.team?.logo;
    }

    if (player?.teams?.[0]?.logo) {
      return `${API_URL}${player.teams[0].logo}`;
    }
    return smrtPlacholderImg;
  }, [player]);

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      try {
        const response = await $api.get(`${BASE_URL}/users/favorites/players/${idPlayer}/`);
        setIsFavorites(response.data.in_favorites);
      } catch (error) {
        // console.error(error)
      }
    };
    idPlayer && fetchFavoriteStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (stat?.year_season) {
      setSelectedSeason(stat.year_season);
    }
  }, [stat])

  const onChangeSeason = (e) => {
    const idSeason = e.target.options[e.target.selectedIndex].dataset.value;
    const { value } = e.target
    if (idPlayer) {
      setSelectedSeason(value)
      dispatch(getPlayerStatistics({ id: idPlayer, year_season_id: idSeason }))
      dispatch(getPlayerStatisticMatches({ id: idPlayer, year_season_id: idSeason }))
      searchParams.set('season', idSeason)
      setSearchParams(searchParams)
    }
  }

  return (
    <div className={cls.playerInfoContainer}>
      <header className={cls.statheader}>
        <span>{l(99)}</span>
        <select onChange={onChangeSeason} value={selectedSeason} className={cls.playerSeasonSelect}>
          {stat?.available_seasons?.length > 0 ? (
            <>
              {stat.available_seasons.map((season) => (
                <option
                  key={season.id}
                  value={season.years}
                  data-value={season.id}
                >
                  {season.years}
                </option>
              ))}
            </>
          ) : <option disabled>No available seasons</option>}
        </select>
      </header>
      <article className={cls.teamInfoContainer}>
        {loading ? (
          <Skeleton width={236} height={300} />
        ) : (
          <>
            <img
            // eslint-disable-next-line no-return-assign
              onError={(e) => (e.target.src = avatar)}
              src={playerLogo}
              alt='player logo'
            />
            <div className={cls.playerLogos}>
              <img
              // eslint-disable-next-line no-return-assign
                onError={(e) => (e.target.src = smrtPlacholderImg)}
                src={nationalityFlag}
                alt='nationality flag'
                title={player?.nationality?.[0].name}
              />
              <img
              // eslint-disable-next-line no-return-assign
                onError={(e) => (e.target.src = smrtPlacholderImg)}
                src={teamLogo}
                alt='team logo'
              />
            </div>
          </>
        )}
        {!loading && <FavoritesIcon id={+id} isFav={isFavorites} setIsFav={setIsFavorites} />}
        {loading ? (
          <div style={{ marginTop: 10 }}>
            <Skeleton width={236} height={150} />
          </div>
        ) : (
          <h3>
            <span
              title={player?.display_name}
              style={{ cursor: 'pointer' }}
              onClick={() => idPlayer && navigate(`/player/${idPlayer}`)}
            >
              {player?.display_name}
            </span>
            <span
              title={player?.team?.name || player?.teams?.[0]?.name}
              onClick={() => idTeam && navigate(`/team/${idTeam}`)}
              style={{ cursor: 'pointer', fontSize: 17 }}
            >
              {player?.team?.name || player?.teams?.[0]?.name}
            </span>
          </h3>
        )}

        <ul>
          {stat && (
            <>
              <li>
                {l(110)}: {stat?.player?.birth_date}
              </li>
              <li>
                {l(111)}: {stat?.player?.nationality?.[0]?.name}
              </li>
              <li>
                {l(112)}: {l(stat?.player?.leg_lexic_id)}
              </li>
              <li>
                {l(113)}: {stat?.player?.height}
              </li>
              <li>
                {l(114)}: {stat?.player?.position?.[0]?.name
                  ? l(stat?.player?.position?.[0]?.lexic_id)
                  : '-'}
              </li>
              <li>
                {l(115)}:{' '}
                {stat?.player?.position?.[1]?.name
                  ? l(stat?.player?.position?.[1]?.lexic_id)
                  : '-'}
              </li>
            </>
          )}
        </ul>
      </article>
    </div>
  );
};
