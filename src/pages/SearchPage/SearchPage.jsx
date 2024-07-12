import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { ThemeContext } from 'contexts/ThemeContext';
import cls from './SearchPage.module.css';
// eslint-disable-next-line import/no-cycle
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { SearchInput } from '../../components/SearchInput';
import { useDebounce } from '../../lib/hooks/useDebounce';
import { searchPlayer, searchTeam } from '../../store/search/searchService';
import { searchActions } from '../../store/search/searchSlice';

export const SearchPage = () => {
  // const { theme } = useContext(ThemeContext)
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [typeSearch, setTypeSearch] = useState('teams');
  const l = useLexicon();
  const {
    loadingPlayers,
    loadingTeams,
    players,
    teams,
  } = useSelector(
    (state) => state.search,
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (debouncedSearchValue && typeSearch) {
      if (typeSearch === 'players') {
        dispatch(searchPlayer({ page: 1, search: debouncedSearchValue }));
      } else {
        dispatch(searchTeam({ page: 1, search: debouncedSearchValue }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, typeSearch]);
  const handleChangeValue = (value) => {
    if (value.length > 0) {
      typeSearch === 'players'
        ? dispatch(searchActions.setLoadingPlayers(true))
        : dispatch(searchActions.setLoadingTeams(true))
    } else {
      typeSearch === 'players'
        ? dispatch(searchActions.setLoadingPlayers(false))
        : dispatch(searchActions.setLoadingTeams(false))
    }

    setSearchValue(value);
  }

  return (
    <div className={`${cls.container} `}>
      {/* change language component */}
      <LanguageSwitcher />
      <div className={`${cls.logo} `} />
      <div className={cls.loginFormContainer}>
        <span>HELPING YOU MAKE THE SMARTEST CHOICE</span>
        <SearchInput
          typeSearch={typeSearch}
          onChangeTypeSearch={setTypeSearch}
          loading={loadingPlayers || loadingTeams}
          style={{
            height: 60,
            width: '100%',
          }}
          value={searchValue}
          onChange={handleChangeValue}
          players={players}
          teams={teams}
        />
      </div>
      <div className={cls.buttonContainer}>
        <Link className={`${cls.competitionsButton} `} to='/competitions'>
          <span>{l(1)}</span>
        </Link>
        <Link to='/profile'>
          <button
            type='button'
            className={`${cls.myProfileButton} `}
          >
            <span>{l(2)}</span>
          </button>
        </Link>
      </div>
    </div>
  );
};
