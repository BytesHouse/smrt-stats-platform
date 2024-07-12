import { Dispatch, SetStateAction } from 'react';
import { $api } from 'config/api';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './PlayerInfo.module.css';

export const FavoritesIcon = ({
  id,
  isFav,
  setIsFav,
}: {
  id: number,
  isFav: boolean,
  setIsFav: Dispatch<SetStateAction<boolean>>,
}) => {
  const handleClickFav = () => (isFav ? removeFav(id) : addFavoritePlayer({ player: id }));
  const l = useLexicon();
  return (
    <div onClick={handleClickFav} className={cls.favWrapper}>
      <svg
        onClick={() => setIsFav(!isFav)}
        className={cls.favoritesIcon}
        width='46'
        height='46'
        viewBox='0 0 46 46'
        fill={isFav ? 'white' : 'none'}
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='23' cy='23' r='22.5' fill='#252844' stroke='white' />
        <path
          d='M22.5274 9.90123C22.6824 9.45212 23.3176 9.45212 23.4726 9.90124L26.1115 17.5452C26.3203 18.15 26.8897 18.5557 27.5294 18.5557H35.9339C36.4256 18.5557 36.622 19.1909 36.2162 19.4685L29.5231 24.0452C28.9653 24.4266 28.7314 25.134 28.9519 25.7729L31.5327 33.2484C31.6899 33.7037 31.1755 34.0962 30.7778 33.8243L23.8467 29.0847C23.3362 28.7356 22.6638 28.7356 22.1533 29.0847L15.2222 33.8243C14.8245 34.0962 14.3101 33.7037 14.4673 33.2484L17.0481 25.7729C17.2686 25.1341 17.0347 24.4266 16.4769 24.0452L9.78384 19.4685C9.37798 19.1909 9.5744 18.5557 10.0661 18.5557H18.4706C19.1103 18.5557 19.6797 18.15 19.8885 17.5452L22.5274 9.90123Z'
          stroke='#F5F5F5'
        />
      </svg>
      <div className={cls.tooltip}>{isFav ? l(434) : l(433)}</div>
    </div>
  );
};

export const removeFav = async (id: number) => {
  try {
    const response = await $api.delete(`/users/favorites/players/${id}/`);
    if (!response) {
      throw new Error(`Error: ${response}`);
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const addFavoritePlayer = async (player: { player: number }) => {
  try {
    const response = await $api.post('/users/favorites/players/', player);
    await $api.post('/users/activity/', {
      entity_id: player.player,
      link_to: `https://platform.smrtstats.com/player/${player.player}`,
      type: 4,
    })
    if (!response) {
      throw new Error(`Error: ${response}`);
    }
    return response.data;
  } catch (error) {
    return null;
  }
};
