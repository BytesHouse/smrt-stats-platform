import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { loginUser } from '../../../store/user/userService';
import { Input } from '../../ui';
import cls from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.errorLogin);
  const { t } = useTranslation('auth');
  const l = useLexicon()
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const email = e?.target?.[0].value;
    const password = e?.target?.[1].value;
    dispatch(loginUser({ email, password })).then(() => navigate('/'));
  };

  return (
    <form className={cls.form} onSubmit={handleSubmitForm}>
      <Input
        required
        name='email'
        placeholder='Email'
        type='email'
      />
      <Input
        required
        name='password'
        placeholder={l(322)}
        type='password'
      />

      {error && <div className={cls.errorMsg}>{error}</div>}
      <button
        disabled={loading}
        type='submit'
        className={cls.formBtnSubmit}
      >
        {loading ? l(312) : t('form_submit_btn_text_login')}
      </button>
    </form>
  );
};
