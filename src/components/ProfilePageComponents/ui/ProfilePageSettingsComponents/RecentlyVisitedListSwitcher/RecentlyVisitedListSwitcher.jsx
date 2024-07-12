import React from 'react'
import { useTranslation } from 'react-i18next';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './RecentlyVisitedListSwitcher.module.css';

export const RecentlyVisitedListSwitcher = ({ handleToggle, isOn }) => {
  const { t } = useTranslation('profile');
  const l = useLexicon();
  return (
    <div className={cls.recentlyVisitedListSwitcher}>
      <b>{l(129)}</b>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className={cls.switch}>
        <input
          checked={isOn}
          onChange={handleToggle}
          className={cls.switchCheckbox}
          type='checkbox'
        />
        <div className={cls.switchButton}>
          <svg width='22' height='20' viewBox='0 0 22 25' xmlns='http://www.w3.org/2000/svg'>
            <path d='M11 1V24M21 1V24M1 1V24' stroke='#0F1521' strokeWidth='2' strokeLinecap='round' />
            <path d='M11 1V24M21 1V24M1 1V24' stroke='#0F1521' strokeWidth='2' strokeLinecap='round' />
            <path d='M11 1V24M21 1V24M1 1V24' stroke='#0F1521' strokeWidth='2' strokeLinecap='round' />
          </svg>
        </div>
        <div className={cls.switchLabels}>
          {
            isOn ? <span>{t('on')}</span> : <span>{t('off')}</span>
          }
        </div>
      </label>
    </div>

  )
}
