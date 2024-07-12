import React, { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import UserPathTracking from 'components/UserPathTracking/UserPathTracking';
import { ExitButton } from 'components/ui/icons/ExitButton';
import { userActions } from '../../store/user/userSlice';
import cls from './Header.module.css'

type THeader = {
  children?: ReactNode,
  showSearch?: boolean,
};

const Header = ({ children, showSearch = true }: THeader) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const l = useLexicon();
  const logout = () => {
    localStorage.removeItem('token');
    dispatch(userActions.setToken(''));
    navigate('/');
  };

  return (
    <header className={cls.header}>
      <Link className={cls.logo} to='/' />
      <UserPathTracking />
      {children}
      <div className={cls.buttonsContainer}>
        {showSearch ? (
          <Link to='/' target='_blank'>
            <button type='button' className={cls.searchButton}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                <path d='M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z' />
              </svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" /></svg> */}
            </button>
          </Link>
        ) : null}
        <Link className={cls.myProfileButton} to='/profile'>
          {l(2)}
        </Link>
        <button type='button' onClick={logout} className={cls.exitButton}>
          <ExitButton />
        </button>
      </div>
    </header>
  );
};

export default Header;
