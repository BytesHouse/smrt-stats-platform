import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // eslint-disable-next-line consistent-return
  const checkUserToken = () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') {
      setIsLoggedIn(false);
      return navigate('/login');
    }
    setIsLoggedIn(true);
  }

  useEffect(() => {
    checkUserToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <>
      {
        isLoggedIn ? children : null
      }
    </>
  );
}
