/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState } from 'react';
import { useLexicon } from 'lib/hooks/useTranslates';
import { Link, useNavigate } from 'react-router-dom';
import cls from './CompetitionTeam.module.css';
import { $api } from '../../../config/api';
import { Spinner } from '../../ui';
import { CompetitionPlayers } from '../CompetitionPlayers/CompetitionPlayers';

export const DEFAULT_LOGO = 'https://archive.org/download/no-photo-available/no-photo-available.png'

export const CompetitionTeam = ({ team }) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false)
  const [openPlayers, setOpenPlayers] = useState(false)
  const l = useLexicon();
  const getPlayers = async (id) => {
    try {
      setLoading(true)
      const response = await $api.get(`/statistics/team/${id}`);
      setPlayers(response.data.players_list);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const onClickPlayerBtn = (event) => {
    event.stopPropagation()
    setOpenPlayers((prev) => !prev)
    if (players.length === 0 && !openPlayers) {
      getPlayers(team.id)
    }
  }

  const onClickArticle = () => {
    navigate(`/team/${team.id}`)
  }

  return (
    <>
      <article role='button' onClick={onClickArticle} className={cls.article}>
        <div className={cls.leftContainer}>
          <img
            className={cls.teamLogo}
            src={team?.logo ?? DEFAULT_LOGO}
            alt='teamLogo'
          />
          <p className={cls.teamTitle}>{team.name}</p>
        </div>
        <div className={cls.rightContainer}>
          <Link
            to={`/team/${team.id}`}
            className={cls.button}
          >{l(340)}
          </Link>
          <button
            type='button'
            onClick={(event) => onClickPlayerBtn(event)}
            className={cls.button}
          >{l(321)}
          </button>
        </div>
      </article>
      <>
        {
          loading ? (
            <div
              style={{
                background: 'rgb(23, 31, 47)',
                padding: 20,
                textAlign: 'center',
              }}
            >
              <Spinner size='medium' />
            </div>
          ) : (
            <>
              {openPlayers
                  && players?.map(
                    (player) => <CompetitionPlayers player={player} key={player.id} />,
                  )}
            </>
          )
        }
      </>
    </>
  )
}
