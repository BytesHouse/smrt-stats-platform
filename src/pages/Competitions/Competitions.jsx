/* eslint-disable max-len */
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useLexicon } from 'lib/hooks/useTranslates';
import { $api } from 'config/api';
import useCompetitions from 'lib/hooks/useCompetitions';
import cls from './Competitions.module.css';
import { userActions } from '../../store/user/userSlice';

import { Spinner } from '../../components/ui'
import CompetitionTab from '../../components/CompetitionComponents/CompetitionTab/CompetitionTab';
import Header from '../../components/Header/Header';

export const Competitions = () => {
  const [pageNum, setPageNum] = useState(1);
  const [inputValue, setInputValue] = useState('')

  const {
    error,
    hasNextPage,
    isError,
    isLoading,
    results,
  } = useCompetitions(pageNum, inputValue);
  const intObserver = useRef();
  const lastCompetitionRef = useCallback((competition) => {
    if (isLoading) return

    if (intObserver.current) intObserver.current.disconnect()

    intObserver.current = new IntersectionObserver((competitions) => {
      if (competitions[0].isIntersecting && hasNextPage) {
        if (!inputValue) return
        setPageNum((prev) => prev + 1);
      }
    })

    if (competition) intObserver.current.observe(competition)
  }, [isLoading, hasNextPage, inputValue])

  useEffect(() => {
    setPageNum(1)
  }, [inputValue])

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const l = useLexicon();

  const loading = useSelector((state) => state.season.loadingSeason)

  const logout = () => {
    localStorage.removeItem('token')
    dispatch(userActions.setToken(''));
    navigate('/');
  }
  const handleClickReset = () => {
    setInputValue('');
  }

  return (
    <section className={cls.competitions}>
      <Header showSearch={false}>
        <Search setPage={setPageNum} inputValue={inputValue} setInputValue={setInputValue} />
      </Header>
      <div className={cls.competitionsWrapper}>
        <div className={cls.competitionsContainer}>
          {
            isLoading && !results.length ? (
              <div
                className={cls.spinnWrap}
              >
                <Spinner size='medium' />
              </div>
            ) : (
              <>
                {
                  results.length > 0 ? results.map((item, i) => {
                    if (results.length === i + 1) {
                      return <CompetitionTab item={item} key={item.id + Math.random(i) * 10} ref={lastCompetitionRef} />
                    }
                    return <CompetitionTab item={item} key={item.id + Math.random(i) * 10} />
                  }) :
                    (
                      <div className={cls.noResult}>
                        <p>{l(314)}</p>
                        {/* <button onClick={handleClickReset} type='button'>{l457}</button> */}
                      </div>
                    )
                }
              </>
            )
          }
        </div>
      </div>
    </section>
  );
};

const Search = ({ setInputValue, setPage }) => {
  const l = useLexicon();
  const [timer, setTimer] = useState(null);

  const debounce = (func, delay) => {
    clearTimeout(timer);
    const newTimer = setTimeout(func, delay);
    setTimer(newTimer);
  };

  const handleInputChange = (event) => {
    setPage(1);
    setInputValue(event.target.value);
  };

  const debouncedInputChange = useCallback(
    (event) => {
      debounce(() => handleInputChange(event), 350);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [timer],
  );
  return (
    <input
      placeholder={l(349)}
      type='text'
      className={cls.searchInput}
      onChange={debouncedInputChange}
    />
  )
}

export const getCompetitionsPage = async (
  pageParam = 1,
  searchQuery,
  options = {},
) => {
  let response
  if (!searchQuery) {
    response = await $api.get('/platform/competition/?default=true&page_size=14')
  } else {
    response = await $api.get(`/platform/competition/?page=${pageParam}&search=${searchQuery}&page_size=10`, options)
  }
  return response.data;
}
