import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
// eslint-disable-next-line import/no-cycle
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import cls from './LoginPage.module.css';
import { LoginForm } from '../../components/LoginForm';

export const LoginPage = () => {
  const { t } = useTranslation('auth');
  const l = useLexicon();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return (
    <div className={cls.container}>
      {/* change language component */}
      <LanguageSwitcher />

      <div className={cls.loginFormContainer}>
        <div className={cls.logo} />
        <LoginForm />
        {/* <Link to='/registration'>{l(344)}</Link> */}
      </div>
      {/* <div className={cls.rectangles} /> */}
      {/* arrow lines */}
    </div>
  );
};
