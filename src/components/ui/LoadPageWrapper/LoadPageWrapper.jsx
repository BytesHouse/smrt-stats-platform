import React from 'react';
import Header from '../../Header/Header';
import { Spinner } from '../Spinner/Spinner';
import cls from './LoadPageWrapper.module.css';

export const LoadPageWrapper = () => (
  <>
    <Header />
    <div className={cls.spinnerContainer}>
      <Spinner />
    </div>
  </>
);
