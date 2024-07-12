/* eslint-disable max-len */
import { useMemo } from 'react'
import {
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './ProfilePageWrapper.module.css';
import logo from '../../../../images/newlogo.png';
import { userActions } from '../../../../store/user/userSlice';

export const ProfilePageWrapper = ({ children }) => {
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const location = useLocation();
  const l = useLexicon();
  const isActivePage = useMemo(() => {
    const path = location?.pathname;
    if (path?.includes('playlist')) {
      return 'playlist';
    } if (path?.includes('shared')) {
      return 'playlist_shared';
    }
    if (path?.includes('favorites')) {
      return 'favorites';
    }
    return 'settings';
  }, [location]);

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(userActions.setToken(''));
    navigate('/');
  };

  return (
    <section className={cls.profilePageContainer}>
      <div className={cls.profilePageContainerInside}>
        <header>
          <div className={cls.profilePageHeaderLeftContent}>
            <div
              className={`${cls.profilePageHeaderBtn} ${cls.logo}`}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt='smrt logo' />
            </div>
            {token && (
              <>
                <div
                  className={`${cls.profilePageHeaderBtn} ${isActivePage === 'playlist' ? cls.active : undefined}`}
                  onClick={() => navigate('/profile/playlist')}
                >
                  {l(124)}
                </div>
                <div
                  onClick={() => navigate('/profile/shared')}
                  className={`${cls.profilePageHeaderBtn} ${isActivePage === 'playlist_shared' ? cls.active : undefined}`}
                >
                  {l(125)}
                </div>
              </>
            )}

          </div>
          <div className={cls.profilePageHeaderRightContent}>
            {
              token && (
                <>
                  <Link to='/profile/favorites' className={`${cls.profilePageHeaderBtn} ${isActivePage === 'favorites' ? cls.active : undefined}`}>
                    {l(435)}
                  </Link>
                  <div className={`${cls.profilePageHeaderBtn} ${isActivePage === 'settings' ? cls.active : undefined}`} onClick={() => navigate('/profile')}>
                    {l(136)}
                  </div>
                  <div className={cls.profilePageHeaderExitBtn} onClick={logout}>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                      <path d='M4 18H6V20H18V4H6V6H4V3C4 2.44772 4.44772 2 5 2H19C19.5523 2 20 2.44772 20 3V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z' />
                    </svg>
                  </div>
                </>
              )
            }

          </div>
        </header>
        {children}
      </div>
    </section>
  )
}
