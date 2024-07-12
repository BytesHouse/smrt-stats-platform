import { useLexicon } from 'lib/hooks/useTranslates';
import { LanguageSwitcher } from 'components/LanguageSwitcher';
import cls from './ProfilePageContent.module.css'

export const ProfilePageChangeLanguage = () => {
  const l = useLexicon();
  return (
    <div className={cls.profilePageChangeLanguage}>
      <b>{l(126)}</b>
      <div>
        <LanguageSwitcher isProfile />
      </div>
    </div>
  )
}
