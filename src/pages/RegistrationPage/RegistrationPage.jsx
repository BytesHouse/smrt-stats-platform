import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
// eslint-disable-next-line import/no-cycle
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import cls from './RegistrationPage.module.css';
import { RegistrationForm } from '../../components/RegistrationForm';

export const RegistrationPage = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);
  const l = useLexicon();
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
        <RegistrationForm />
        <Link to='/login'>{l(345)}</Link>
      </div>
      <div className={cls.rectangles} />
      {/* arrow lines */}
    </div>
  );
};
