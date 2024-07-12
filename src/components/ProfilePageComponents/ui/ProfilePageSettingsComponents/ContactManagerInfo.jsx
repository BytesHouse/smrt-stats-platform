import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './ProfilePageContent.module.css';
import managerAvatar from '../../../../images/avatar.png';

export const ContactManagerInfo = () => {
  const { t } = useTranslation('profile');
  const l = useLexicon();
  return (
    <div className={cls.contactManagerInfo}>
      <b>{l(131)}:</b>
      <div>
        <img src={managerAvatar} alt='manager avatar' />
        <div>
          {/* <span>Test Test</span> */}
          <span>{t('email')}: contact@smrtstats.com</span>
          {/* <span>{t("phone")}: +999999999</span> */}
        </div>
      </div>
    </div>
  )
}
