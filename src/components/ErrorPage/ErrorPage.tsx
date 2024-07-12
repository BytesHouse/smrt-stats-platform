import { useEffect, useState } from 'react';
import { BASE_URL } from 'config/api';
import cls from './ErrorPage.module.css';

export const ErrorServerBoundary = ({ children }: never) => {
  const [isLive, setIsLive] = useState(true);
  useEffect(() => {
    async function checkServerStatus() {
      fetch(`${BASE_URL}/platform/action/`, { method: 'HEAD' })
        .then((response) => {
          if (response.ok) {
            // Севрер жив
            setIsLive(true);
          } else {
            setIsLive(false)
          }
        })
        .catch((error) => {
          // Обработка ошибок подключения
          setIsLive(false)
        });
    }
    checkServerStatus()
  }, [])
  return (!isLive
    ? (
      <div className={cls.errorPageTextContainer}>
        <div className={cls.wrapper}>
          <div className={cls.logo} />
          <h3>
            We are currently working on adding cool new features to make your
            experience even better so the platform will be unavailable for a
            short period of time.
          </h3>
        </div>
      </div>
    )
    : children)
}

