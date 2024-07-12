/* eslint-disable no-param-reassign */
import React from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { getPositionTranslate } from 'lib/helpers/getPositionTranslate';
import cls from './TeamProfilePlayersTableItem.module.css';
import avatar from '../../../images/avatar.png';
import smrtPlaceholder from '../../../images/smrt_placeholder.jpg';

export const TeamProfilePlayersTableItem = ({ player }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const l = useLexicon();
  return (
    <Link
      to={`/player/${player.id}`}
      key={player.id}
      className={cls.tablePlayersListItem}
    >
      <div className={cls.playerName}>
        <img
          className={cls.playerFlag}
          // eslint-disable-next-line no-return-assign
          onError={(e) => (e.target.src = smrtPlaceholder)}
          src={player?.nation_flag ? player?.nation_flag : smrtPlaceholder}
          alt='player flag'
          title={player?.nationality?.[0].name}
        />

        <img
          className={cls.playerImg}
          // eslint-disable-next-line no-return-assign
          onError={(e) => (e.target.src = avatar)}
          src={player?.photo ? player.photo : avatar}
          alt='player avatar'
        />
        <p>{player?.display_name}</p>
      </div>
      <div>
        {l(327)} {player?.age}
      </div>
      <div>
        {l(11)} <span>{l(getPositionTranslate(player?.position))}</span>
      </div>
    </Link>
  );
};
