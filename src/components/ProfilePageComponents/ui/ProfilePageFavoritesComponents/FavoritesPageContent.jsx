/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFavorites } from 'store/favorites/favoritesService';
import cls from './FavoritesPageContent.module.css';
import { FavoritesPageHeader } from './FavoritesPageHeader/FavoritesPageHeader';
import { Favorites } from './Favorites/Favorites';

export const FavoritesPageContent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavorites({ sort: '-created_at' }))
  }, [dispatch])
  return (
    <div className={cls.FavoritesPageContent}>
      <FavoritesPageHeader />
      <Favorites />
    </div>
  )
}

