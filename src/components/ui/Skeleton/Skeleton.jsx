import React from 'react'
import cls from './Skeleton.module.css';

export const Skeleton = ({ height = 100, width = 100 }) => (
  <div style={{ height, width }} className={cls.skeleton} />
)
