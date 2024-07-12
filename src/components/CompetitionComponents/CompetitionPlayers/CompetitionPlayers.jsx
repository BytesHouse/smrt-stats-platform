import React from 'react';
import { Link } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { getPositionTranslate } from 'lib/helpers/getPositionTranslate';
import cls from './CompetitionPlayers.module.css';

export const CompetitionPlayers = ({ player }) => {
  const l = useLexicon();
  return (
    <article className={cls.article}>
      <div className={cls.containerLeft}>
        <img className={cls.flag} src={player?.nation_flag ? player.nation_flag : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt='flag' />
        <img className={cls.photo} src={player?.photo ? player.photo : 'https://archive.org/download/no-photo-available/no-photo-available.png'} alt='logo' />
        <p className={cls.name}>{player?.display_name}</p>
      </div>
      <div className={cls.containerCenter}>
        <p className={cls.age}>{l(327)} {player?.age}</p>
      </div>
      <div className={cls.containerRight}>
        <p className={cls.position}>{l(11)} {l(getPositionTranslate(player?.position))}</p>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <Link to={`/player/${player.id}`}>
          <p
            className={cls.button}
          >
            <span>{l(320)}</span>
          </p>
        </Link>
      </div>
    </article>
  )
}
