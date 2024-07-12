import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './TournamentStatItem.module.css';
import { IconComponent } from '../../../../assets/icons';

export const TournamentStatItem = ({ match, title }) => {
  const { t } = useTranslation();
  const l = useLexicon();
  const { id } = useParams()
  return (
    <div className={cls.itemWrapper}>
      <h4 className={cls.teamName}>{match.home_team.name}</h4>
      <b>{match.score}</b>
      <h4 className={cls.teamName}>{match.away_team.name}</h4>
      <p className={cls.title}>
        {match.date?.split('T')[0]}, {title}
      </p>
      {/* To-Do */}
      {match?.video && (
        <Link
          to={`/tournament/video/${id}?match=${match.id}`}
          className={cls.playBtn}
        >
          <IconComponent.PLAY
            width='26'
            height='26'
            // color={team.name === match.away_team ? 'white' : 'black'}
          />
        </Link>
      )}

      <div className={cls.btns}>
        <Link to={`/team/match?team=${match.home_team.id}&match=${match.id}`}>
          <button
            type='button'
            // onClick={navigateToMatch}
          >{l(117)}
          </button>
        </Link>
        <Link to={`/video_cuts?action=79,2,26,36,76,58,50,45,44,97,53,65,70,34,30,38,50,45,54,28&match=${match?.id}&team=${match.home_team.id}`}>
          <button
            type='button'
          >{t('on_ball_events')}
          </button>
        </Link>
        <Link to={`/video_cuts?action=65,79&match=${match?.id}&team=${match.home_team.id}`}>
          <button
            type='button'
          >{t('goals_plus_assists')}
          </button>
        </Link>
        {/* <Link to={`/team/match/mistakes?team=${match.home_team.id}&match=${match.id}`}> */}
        <Link to={`/tournament/video/${id}?match=${match.id}`}>
          <button
            type='button'
          > {l(118)}
          </button>
        </Link>
        <Link to={`/video_cuts?action=69,61&match=${match?.id}&team=${match.home_team.id}`}>
          <button
            type='button'
          >{l(17)}
          </button>
        </Link>
      </div>
      <hr className={cls.hr} />
    </div>
  );
};
