/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies

import { TournamentWrapper } from 'components/TournamentComponents/TournamentWrapper/TournamentWrapper';
import { VideoPlayer } from 'components/VideoPlayer';
import { useLexicon } from 'lib/hooks/useTranslates';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router';
import cls from './TournamentMatchPage.module.css'
import { getMatch } from '../../store/match/matchService';

export const TournamentVideoPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams()
  const match = useSelector((state) => state.match.match);
  const l = useLexicon();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const idMatchParam = searchParams.get('match');
    if (Number(idMatchParam) !== Number(match?.id)) {
      dispatch(getMatch(idMatchParam));
    }
  }, [searchParams, dispatch, match]);

  return (
    <TournamentWrapper>
      <div className={cls.contentContainer}>
        <header>
          <span>{l(117)}</span>
        </header>
        <div className={cls.playerWrapper}>

          {match?.videos?.[0]?.link ? (
            <VideoPlayer
              videoInfo={match?.videos[0]}
              video={match?.videos[0].link}
              playNextVideo=''
            />
          ) : (
            <b>No video</b>
          )}
        </div>
      </div>
    </TournamentWrapper>
  )
};
