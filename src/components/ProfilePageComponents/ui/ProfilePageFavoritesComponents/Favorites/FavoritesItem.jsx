/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
/* eslint-disable no-alert, no-param-reassign */
import React, { useState } from 'react';
import {
  // useNavigate,
  Link,
} from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'config/api';
import { useDispatch, useSelector } from 'react-redux';
import { removeFav } from 'components/PlayerProfileComponents/PlayerProfileSidebar/PlayerInfo/FavoritesIcon';
import { getFavorites } from 'store/favorites/favoritesService';
import cls from './Favorites.module.css';
import { Spinner } from '../../../../ui';
import smrtPlaceholder from '../../../../../images/smrt_placeholder.jpg';
import avatar from '../../../../../images/avatar.png'

export const FavoritesItem = ({ favorite }) => {
  const { player, player_id } = favorite;
  const sort = useSelector((state) => state.favorites);
  const dispatch = useDispatch();
  const [isLoading] = useState(false);
  const handleDelete = (id) => {
    removeFav(id);
    setTimeout(() => {
      dispatch(getFavorites({ sort }));
    }, 1000);
  }
  return (
    <div
      className={cls.playlistItem}
    >
      <Link to={`/player/${player_id}`} className={cls.favoritesItemLeftContent}>
        <img src={player?.photos?.[0]?.image ? `${API_URL}${player?.photos?.[0]?.image}` : avatar} alt='player' />
        <span>{player?.display_name}</span>
      </Link>
      <Link to={`/team/${player?.teams[0]?.id}`} className={cls.favoritesCentralContent}>
        <span>{player?.teams[0]?.name}</span>
      </Link>
      <div className={cls.playlistItemRightConent}>
        {isLoading ? (
          <Spinner size='small' />
        ) : (
          <svg
            onClick={(e) => handleDelete(player_id)}
            width='32'
            height='39'
            viewBox='0 0 32 39'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M4 9L9 38H16M28 9L23 38H16M16 38V12M1 7H31M6.5 5H25.5M12 3V1H20V3'
              stroke='white'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        )}
      </div>
    </div>
  );
};
