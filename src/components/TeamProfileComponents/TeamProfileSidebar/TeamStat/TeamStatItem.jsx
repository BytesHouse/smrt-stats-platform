import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  Link,
  useNavigate,
} from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './TeamStatItem.module.css';
import { IconComponent } from '../../../../assets/icons';

export const TeamStatItem = ({ match }) => {
  const { t } = useTranslation();
  const l = useLexicon();
  const navigate = useNavigate();
  const team = useSelector((state) => state.team.teamStatistic?.team);

  const style = useMemo(() => {
    if (team.name === match.away_team) {
      return {
        backgroundColor: '#0F1521',
        borderBottom: '5px solid #fff',
        color: 'white',
        padding: '10px 10px 0 10px',
        position: 'relative',
        textAlign: 'center',
      };
    }
    return {
      backgroundColor: '#e2e2e2',
      borderBottom: '5px solid #fff',
      padding: '10px 10px 0 10px',
      position: 'relative',
      textAlign: 'center',
    };
  }, [team.name, match.away_team]);

  const navigateToMatch = () => {
    if (team?.id && match?.id) {
      navigate(`/team/match?team=${team.id}&match=${match.id}`);
    }
  };
  return (
    <div style={style}>
      <h4 className={cls.teamName}>{match.home_team}</h4>
      <b>{match.status === 6 || match.status === 7 || match.status === 1 ? '-:-' : match.score}</b>
      <h4 className={cls.teamName}>{match.away_team}</h4>
      <p>
        {match.date?.split('T')[0]}, {match.competition}
      </p>
      {match?.videos?.length > 0 && (
        <div
          className={cls.playBtn}
        >
          <Link to={`/team/match/mistakes?team=${team.id}&match=${match.id}`}>
            <IconComponent.PLAY
              width='26'
              height='26'
              color={team.name === match.away_team ? 'white' : 'black'}
            />
          </Link>
        </div>
      )}

      <div className={cls.btns}>
        <Link to={`/team/match?team=${team.id}&match=${match.id}`}>
          <button
            type='button'
            onClick={navigateToMatch}
          >{l(117)}
          </button>
        </Link>
        <Link to={`/video_cuts?action=79,2,26,36,76,58,50,45,44,97,53,65,70,34,30,38,50,45,54,28&match=${match?.id}&team=${team.id}`}>
          <button
            type='button'
          >{l(326)}
          </button>
        </Link>
        <Link to={`/video_cuts?action=65,79&match=${match?.id}&team=${team.id}`}>
          <button
            type='button'
          >{t('goals_plus_assists')}
          </button>
        </Link>
        <Link to={`/team/match/mistakes?team=${team.id}&match=${match.id}`}>
          <button
            type='button'
          > {l(118)}
          </button>
        </Link>
        <Link to={`/video_cuts?action=69,61&match=${match?.id}&team=${team.id}`}>
          <button
            type='button'
          >{l(17)}
          </button>
        </Link>
      </div>
    </div>
  );
};
