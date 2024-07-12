// import { ThemeContext } from 'components/App/App';
// import { useContext } from 'react';
import cls from './LanguageSwitcher.module.css';

interface ButtonLanguageProps {
  fullLang: string,
  handleClick: (languageKey: string) => void,
  image: string,
  lang: string,
}

export const ButtonLanguage = ({
  fullLang,
  handleClick,
  image,
  lang,
}: ButtonLanguageProps) => {
  // const themeCtx = useContext(ThemeContext);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (lang === 'ar') return <></>;
  return (
    <div className={cls.buttonContainer}>
      <div>
        {lang === 'en' ? (
          <span
            role='img'
            className='fflag fflag-US ff-xl ff-round'
          />
        )
          : <img width={45} height={35} src={image} alt='flag' />}
      </div>
      <button
        type='button'
        className={[cls.button, cls.es].join(' ')}
        onClick={() => handleClick(lang)}
      >
        {/* @ts-ignore: Object is possibly 'null'. */}
        <span className={`${cls.span}`}>{fullLang}</span>
      </button>
    </div>
  )
}
