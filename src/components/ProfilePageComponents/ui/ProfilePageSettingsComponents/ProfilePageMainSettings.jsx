import React from 'react';
import { ThemeContext, themes } from 'contexts/ThemeContext';
import { ChangeEmailAddress } from './ChangeEmailAddress';
import { ContactManagerInfo } from './ContactManagerInfo';
import { ProfilePageChangeLanguage } from './ProfilePageChangeLanguage';
import cls from './ProfilePageContent.module.css';
import { ProfilePageThemeSwithcer } from './ProfilePageThemeSwithcer/ProfilePageThemeSwithcer';
import { RecentlyVisitedListSwitcher } from './RecentlyVisitedListSwitcher/RecentlyVisitedListSwitcher';
import { ProfilePageEmail } from './ProfilePageEmail';

export const ProfilePageMainSettings = ({ handleToggle, showVisitedList }) => (
  <div className={cls.profilePageMainSettings}>
    <ProfilePageChangeLanguage />
    <ProfilePageEmail />
    {/* раскомментировать, когда возможность изменения почты появится на бэкенде */}
    {/* <ChangeEmailAddress /> */}
    <RecentlyVisitedListSwitcher isOn={showVisitedList} handleToggle={handleToggle} />
    <ThemeContext.Consumer>
      {({ setTheme, theme }) => (
        <ProfilePageThemeSwithcer
          onChange={() => {
            if (theme === themes.light) setTheme(themes.dark)
            if (theme === themes.dark) setTheme(themes.light)
          }}
          value={theme === themes.dark}
        />
      )}
    </ThemeContext.Consumer>
    <ContactManagerInfo />
  </div>
)
