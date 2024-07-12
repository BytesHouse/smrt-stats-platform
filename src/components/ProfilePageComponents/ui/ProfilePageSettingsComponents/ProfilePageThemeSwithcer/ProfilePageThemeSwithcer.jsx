/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useContext } from 'react'
import { useTranslation } from 'react-i18next';
import { StubContext } from 'components/App/App';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './ProfilePageThemeSwithcer.module.css';
import darkTheme from '../../../../../images/dark-theme.png';
import lightTheme from '../../../../../images/light-theme.png';

export const ProfilePageThemeSwithcer = ({ onChange, value }) => {
  const { setModalActive } = useContext(StubContext)
  const { t } = useTranslation('profile');
  const l = useLexicon();
  return (
    <div className={cls.profilePageThemeSwithcer}>
      <b>{l(130)}</b>
      {/* <div>
        <img src={darkTheme} alt='dark theme' />
        <img
          src={lightTheme}
          alt='light theme'
          onClick={() => setModalActive(true)}
        />
      </div> */}
      <input
        id='toggler'
        className={cls.toggler}
        type='checkbox'
        onClick={onChange}
        checked={value}
        // readOnly
      />
      <label className={cls.switch} htmlFor='toggler'><p>{value ? 'Dark mode' : 'Light mode' }</p></label>
      {/* <span className={cls.slider} /> */}
      {/* <span className={cls.wave} /> */}
    </div>
  )
}
