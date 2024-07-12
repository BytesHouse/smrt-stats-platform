import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './PlaylistItemPageHeader.module.css';

export const PlaylistItemPageHeader = ({ title, type }) => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const l = useLexicon()
  return (
    <div className={cls.playlistItemPageHeader}>
      {token && (
        <div onClick={() => navigate(-1)}>
          <svg
            width='50'
            height='50'
            viewBox='0 0 64 57'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M62 14.5V55H2V14.5H24.5M62 14.5V2H52V7.75M62 14.5H52M52 14.5H38.5M52 14.5V7.75M52 7.75H38.5M38.5 7.75V14.5M38.5 7.75H24.5V14.5M38.5 14.5H24.5M41.5 35L26.5 43.2272V26.7728L41.5 35Z'
              stroke='#f5f5f5'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <defs>
              <linearGradient
                id='paint0_linear_137_95'
                x1='32'
                y1='2'
                x2='32'
                y2='55'
                gradientUnits='userSpaceOnUse'
              >
                <stop offset='0.1875' stopColor='#5499FF' />
                <stop offset='1' stopColor='#0066FF' stopOpacity='0.87' />
              </linearGradient>
            </defs>
          </svg>
          <span>{l(451)}</span>
        </div>
      )}
      <h3>{title}</h3>
    </div>
  );
};
