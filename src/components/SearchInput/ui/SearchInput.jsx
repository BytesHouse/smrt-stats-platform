/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import React/* eslint-disable no-param-reassign */, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { useDispatch, useSelector } from 'react-redux';
import { searchTeam, searchPlayer } from 'store/search/searchService';
import { getParamsPageAndSearch } from 'lib/helpers/getParamsPageAndSearch';
import { Spinner } from '../../ui';
import cls from './SearchInput.module.css';
import smrtPlaceholder from '../../../images/smrt_placeholder.jpg';
import avatar from '../../../images/avatar.png'
// eslint-disable-next-line import/no-cycle
import { ThemeContext } from '../../App/App';

export const SearchInput = (props) => {
  const {
    loading,
    onChange,
    onChangeTypeSearch,
    placeholder = '',
    players = [],
    style = {},
    teams = [],
    type = 'search',
    typeSearch,
    value = '',
    ...otherProps
  } = props;
  const dispatch = useDispatch();
  const {
    nextPlayer,
    nextTeams,
    playersCount,
    teamsCount,
  } = useSelector(
    (state) => state.search,
  );
  const [isOpenDropdown, setIsOpendropdown] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t } = useTranslation('search');
  const l = useLexicon();
  // const { theme } = useContext(ThemeContext)

  useEffect(() => {
    document.addEventListener('click', toggleDropdown);
    return () => document.removeEventListener('click', toggleDropdown);
  }, []);

  function toggleDropdown(e) {
    setIsOpendropdown(e && e.target === inputRef.current);
  }

  const handleClickSearchMore = (searchFunction, url) => {
    const [pageValue, searchValue] = getParamsPageAndSearch(url);
    dispatch(searchFunction({ page: pageValue, search: searchValue }));
  };

  const renderDropdown = useCallback(() => {
    if (loading) {
      return <li className={`${cls.simpleListItem} `}><span className={cls.spinner}><Spinner size='small' /></span></li>;
    } if (!loading && value.length === 0) {
      return <li className={`${cls.simpleListItem} `}>{typeSearch === 'teams' ? l(4) : l(6)}</li>;
    } if (typeSearch === 'players' && !loading && players.length > 0) {
      return (
        <>
          {players.map((item) => (
            <Link
              to={`/player/${item.id}/`}
              className={`${cls.listItem} `}
              key={item.id}
            >
              <img
                width={55}
                height={55}
                // eslint-disable-next-line no-return-assign
                onError={(e) => e.target.src = avatar}
                src={item.nationality?.[0]?.flag ? item.nationality?.[0]?.flag : avatar}
                alt={item.nationality}
              />
              <span>{item.name} {item.surname}</span>
            </Link>
          ))}
          {(playersCount > 10 && nextPlayer) && <div onClick={() => handleClickSearchMore(searchPlayer, nextPlayer)} className={cls.more}>{l(310)}</div>}
        </>
      );
    } if (typeSearch === 'teams' && !loading && teams.length > 0) {
      return (
        <>
          {teams.map((item) => (
            <Link
              to={`/team/${item.id}/`}
              className={`${cls.listItem} `}
              key={item.id}
            >
              <img
                // eslint-disable-next-line no-return-assign
                onError={(e) => e.target.src = smrtPlaceholder}
                width={55}
                height={55}
                src={item.logo ? item.logo : smrtPlaceholder}
                alt={item.name}
              />
              <span>{item.name}</span>
            </Link>
          ))}
          {(teamsCount > 10 && nextTeams) && <div onClick={() => handleClickSearchMore(searchTeam, nextTeams)} className={cls.more}>{l(310)}</div>}
        </>
      );
    }
    return <li className={`${cls.listItem} `}>{t('no_results_text')}</li>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    players,
    teams, typeSearch,
    value,
    loading,
    t,
    navigate,
  ]);

  return (
    <div className={cls.inputContainer}>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...otherProps}
        ref={inputRef}
        className={`${cls.input} ${isOpenDropdown ? ` ${cls.focused}` : ''}`}
        style={style}
        type={type}
        placeholder={placeholder}
        value={value}
        onClick={toggleDropdown}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`${cls.dropdown} ${isOpenDropdown ? ` ${cls.open}` : ''}`}
      >
        <div className={cls.tabs}>
          <button
            type='button'
            onClick={() => onChangeTypeSearch('teams')}
            className={`${typeSearch === 'teams' ? `${cls.active}` : ''}`}
          >
            {l(3)}
          </button>
          <button
            type='button'
            onClick={() => onChangeTypeSearch('players')}
            className={`${typeSearch === 'players' ? `${cls.active}` : ''}`}
          >
            {l(5)}
          </button>
        </div>
        {renderDropdown()}
      </ul>
    </div>
  );
};
