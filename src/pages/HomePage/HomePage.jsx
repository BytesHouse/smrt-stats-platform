import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../../components/ui';
// eslint-disable-next-line import/no-cycle
import { LoginPage } from '../LoginPage/LoginPage';
import { SearchPage } from '../SearchPage/SearchPage';
import cls from './HomePage.module.css';

export const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  const checkUserToken = () => {
    setLoading(true)
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
    setLoading(false);
  }

  useEffect(() => {
    checkUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  if (loading) {
    return <div className={cls.loadingContainer}><Spinner /></div>
  }

  if (isLoggedIn) {
    return <SearchPage />
  }

  return (
    <LoginPage />
  )
}
