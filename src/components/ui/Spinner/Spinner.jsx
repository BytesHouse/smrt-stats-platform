import React from 'react'
import cls from './Spinner.module.css';

// sizes large|medium|small|
export const Spinner = ({ size = 'large' }) => (
  <div className={`${cls.ldsRing} ${cls[size]}`}><div /><div /><div /><div /></div>
)
