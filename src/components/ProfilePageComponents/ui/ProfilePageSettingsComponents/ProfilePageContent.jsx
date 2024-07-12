import React, { useEffect, useState } from 'react'
import cls from './ProfilePageContent.module.css';
import { ProfilePageMainSettings } from './ProfilePageMainSettings';
import { ProfilePageRecentlyVisitedList } from './ProfilePageRecentlyVisitedList';

export const ProfilePageContent = () => {
  const [showVisitedList, setShowVisitedList] = useState(false);

  useEffect(() => {
    const getInitalState = () => {
      const showList = localStorage.getItem('visited_list_show');
      if (showList) {
        setShowVisitedList(JSON.parse(showList));
      }
    }
    getInitalState();
  }, []);

  const handleToggleShowVisitedList = () => {
    localStorage.setItem('visited_list_show', `${!showVisitedList}`)
    setShowVisitedList((prev) => !prev);
  }

  return (
    <div className={cls.profilePageContent}>
      <ProfilePageMainSettings
        handleToggle={handleToggleShowVisitedList}
        showVisitedList={showVisitedList}
      />
      <ProfilePageRecentlyVisitedList show={showVisitedList} />
    </div>
  )
}
