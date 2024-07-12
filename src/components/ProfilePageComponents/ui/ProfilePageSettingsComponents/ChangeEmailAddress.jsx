import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './ProfilePageContent.module.css'

export const ChangeEmailAddress = () => {
  const { t } = useTranslation('profile');
  const l = useLexicon();
  return (
    <div className={cls.changeEmailAddress}>
      <b>{l(128)}</b>
      <input type='email' />
    </div>
  )
}
