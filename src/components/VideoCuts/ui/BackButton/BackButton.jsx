import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './BackButton.module.css';

export const BackButton = () => {
  const navigate = useNavigate();
  const l = useLexicon()
  return (
    <button
      type='button'
      className={cls.videoCutsBackBtn}
      onClick={() => navigate(-1)}
    >
      <p>{l(451)}</p>
    </button>
  )
}
