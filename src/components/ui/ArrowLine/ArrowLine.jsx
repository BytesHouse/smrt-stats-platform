import React from 'react';
import cls from './ArrowLine.module.css';

export const ArrowLine = (props) => {
  const { style } = props;

  return <div className={cls.arrow} style={style || {}} />;
};
