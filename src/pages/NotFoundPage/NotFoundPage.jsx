import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import { LanguageSwitcher } from '../../components/LanguageSwitcher';
import { ArrowLine } from '../../components/ui';
import cls from './NotFoundPage.module.css';

export const NotFoundPage = () => (
  <div className={cls.container}>
    {/* change language component */}
    <LanguageSwitcher />

    <div className={cls.noFoundTextContainer}>
      <div className={cls.logo} />
      <h3>Page not found</h3>
      <Link to='/'>Go to home page</Link>
    </div>

    {/* arrow lines */}
    <ArrowLine
      style={{
        bottom: 147,
        color: '#08B839',
        left: '-80px',
        position: 'absolute',
        transform: 'rotate(270deg)',
        width: 300,
      }}
    />
    <ArrowLine
      style={{
        bottom: 72,
        color: '#08B839',
        left: '50px',
        position: 'absolute',
        transform: 'rotate(270deg)',
        width: 150,
      }}
    />
    <ArrowLine
      style={{
        color: '#FF0000',
        position: 'absolute',
        right: '-100px',
        top: 147,
        transform: 'rotate(90deg)',
        width: 300,
      }}
    />
  </div>
)
