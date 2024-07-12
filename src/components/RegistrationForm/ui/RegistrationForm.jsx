import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import { regUser } from '../../../store/user/userService';
import { Input } from '../../ui';
import { CheckBox } from '../../ui/CheckBox/CheckBox';
import cls from './RegistrationForm.module.css';

export const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.errorRegistration);
  const [checked, setChecked] = useState(false);
  const { t } = useTranslation('auth');
  const l = useLexicon()

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const email = e?.target?.[0].value;
    const password1 = e?.target?.[1].value;
    const password2 = e?.target?.[2].value;
    dispatch(regUser({
      email,
      password1,
      password2,
    })).then(() => navigate('/'));
  };

  return (
    <form className={cls.form} onSubmit={handleSubmitForm}>
      <Input
        required
        name='email'
        placeholder={l(341)}
        type='email'
      />
      <Input
        required
        name='password1'
        placeholder={l(322)}
        type='password'
      />
      <Input
        required
        name='password1'
        placeholder={l(323)}
        type='password'
      />
      <CheckBox
        text={l(342)}
        checked={checked}
        onChange={(value) => setChecked(value)}
        style={{ marginTop: 20 }}
      />
      {error && <div className={cls.errorMsg}>{error}</div>}
      <button
        disabled={loading || !checked}
        type='submit'
        className={cls.formBtnSubmit}
      >
        {loading ? l(312) : l(343)}
      </button>
    </form>
  );
};
