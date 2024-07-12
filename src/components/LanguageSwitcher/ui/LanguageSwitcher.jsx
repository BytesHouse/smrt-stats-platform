/* eslint-disable max-len */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useOutsideClick } from 'hooks';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getTranslates } from 'store/languages/languagesService';
import { useLexicon } from 'lib/hooks/useTranslates';
import cls from './LanguageSwitcher.module.css';
// eslint-disable-next-line import/no-cycle
import { ThemeContext } from '../../App/App';
import { ButtonLanguage } from './ButtonLanguage';

export const LanguageSwitcher = ({ isProfile }) => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation();
  const themeCtx = useContext(ThemeContext)
  const [openSelector, setOpenSelector] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const l = useLexicon();
  const languages = useSelector((state) => state.lexicon.languages);
  const isLoading = useSelector((state) => state.lexicon.loagingLanguages)
  // необходима для конкатинации английского языка, так как оне не приходит с back
  const langWithEnglish = [{
    id: 0,
    name: 'English',
    short_name: 'en',
  }, ...languages]
  useEffect(() => {
    const setDefaultLanguageIfExist = () => {
      const language = localStorage.getItem('language');
      language && setSelectedLanguage(language);
    }

    setDefaultLanguageIfExist();
  }, [])
  const changeLanguage = (languageKey) => {
    i18n.changeLanguage(languageKey);
    localStorage.setItem('language', languageKey);
    setSelectedLanguage(languageKey);
    setOpenSelector(false);
    dispatch(getTranslates(languageKey) || 'en');
  };

  const dropdownRef = useRef(null)

  useOutsideClick({
    handleClick: () => setOpenSelector(false),
    ref: dropdownRef,
  })

  const text = langWithEnglish.find((item) => item.short_name === selectedLanguage);
  return (
    !isLoading && (
      <div ref={dropdownRef} className={`${isProfile ? cls.containerProfile : cls.container} ${themeCtx?.theme === 'light' ? cls.containerLight : ''}`}>
        {
          !openSelector ? (
            <div className={cls.buttonContainer} onClick={() => setOpenSelector(true)}>
              <div className={cls.buttonContainer}>
                <div>
                  {selectedLanguage === 'en' ? (
                    <span
                      role='img'
                      className='fflag fflag-US ff-xl ff-round'
                    />
                  ) : (
                    <img width={35} height={35} src={text.flag} alt='flag' />
                  )}
                </div>
                <div
                  className={[cls.button, cls.eng].join(' ')}
                >
                  <span className={`${cls.span} ${themeCtx?.theme === 'light' ? cls.spanLight : ''}`}>{text.name}</span>
                </div>
              </div>
              <svg width='19' height='16' viewBox='0 0 19 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12.0981 14.5C10.9434 16.5 8.05662 16.5 6.90192 14.5L1.27276 4.75C0.118059 2.75 1.56143 0.25 3.87084 0.25L15.1292 0.250001C17.4386 0.250002 18.8819 2.75 17.7272 4.75L12.0981 14.5Z' fill='white' />
              </svg>
            </div>
          ) : (
            <div className={isProfile ? cls.languageSwitcherDropDownProfile : cls.languageSwitcherDropDown}>
              {langWithEnglish.map((item) => <ButtonLanguage image={item.flag} key={item.short_name} handleClick={changeLanguage} lang={item.short_name} fullLang={item.name} />)}
            </div>
          )
        }
      </div>
    )
  );
};
