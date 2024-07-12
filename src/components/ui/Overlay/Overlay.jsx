import React from 'react';
import { Portal } from '../Portal/Portal';
import cls from './Overlay.module.css';

export const Overlay = ({ onClose, open }) => {
  if (!open) {
    return null;
  }
  return (
    <Portal>
      <div className={cls.container}>
        <div className={cls.overlay} onClick={onClose} />
      </div>
    </Portal>
  )
}
