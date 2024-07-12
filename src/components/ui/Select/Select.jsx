import {
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLexicon } from 'lib/hooks/useTranslates';
import { teamActions } from 'store/team/teamSlice';
import cls from './Select.module.css';

export const Select = ({ options, styles }) => {
  const selectRef = useRef();
  const [openDropdown, setOpenDropdown] = useState(false);
  // eslint-disable-next-line
  const [value] = useState('');
  const [, setSelected] = useState([]);
  const dispatch = useDispatch();
  const selectedMatches = useSelector((state) => state.team.selectedMatches);
  const l = useLexicon();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener(
      'click',
      handleClickOutside,
      true,
    );

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        true,
      );
    };
  }, []);

  const toggleOption = ({ id, selected: selectedOption }) => {
    setSelected((prevSelected) => (prevSelected.includes(id)
      ? prevSelected.filter((matchId) => matchId !== id)
      : [...prevSelected, id]));
    dispatch(teamActions.setSelectedMatches({ checked: !selectedOption, id }));
  };
  const toggleOpenDropdown = () => {
    setOpenDropdown((prev) => !prev);
  };

  let dispalyedValue
  switch (true) {
    case selectedMatches.length === 0:
      dispalyedValue = ' Select matches'
      break;
    case selectedMatches.length === 1:
      dispalyedValue = ' match selected'
      break;
    case selectedMatches.length > 1:
      dispalyedValue = ' matches selected'
      break;
    default:
      dispalyedValue = ' Select matches'
      break
  }

  return (
    <div ref={selectRef} className={cls.selectContainer} style={styles || {}}>
      <div
        style={openDropdown ? { borderRadius: '5px 5px 0 0' } : {}}
        title={value || l(16)}
        className={cls.selectBtn}
        onClick={toggleOpenDropdown}
      >
        <span>{selectedMatches.length > 0 && selectedMatches.length}{dispalyedValue}</span>
        {openDropdown ? (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M12 8l6 6H6z' />
          </svg>
        ) : (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
          >
            <path fill='none' d='M0 0h24v24H0z' />
            <path d='M12 16l-6-6h12z' />
          </svg>
        )}
      </div>
      {openDropdown && (
        <>
          {options?.length > 0 ? (
            <div className={cls.selectDropdown}>
              {options.map((option) => {
                const isSelected = selectedMatches.includes(option.id);
                return (
                  <div
                    style={
                      isSelected
                        ? { background: '#96c6e1', color: '#0F1521' }
                        : {}
                    }
                    key={option.id}
                    className={cls.dropdown__option}
                    onClick={() => toggleOption({ id: option.id, selected: isSelected })}
                  >
                    {/* <input type="checkbox" id={option.id}
                        checked={isSelected} onChange={(event) =>
                        checkBoxHandler(event, option.id)}
                        className={cls.dropdown__optionCheckbox}></input> */}
                    <span>{option.title}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={cls.selectDropdown}>
              <span>{l(25)}</span>
            </div>
          )}
        </>
      )}
    </div>
  );
};
