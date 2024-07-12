import { useState, useEffect } from 'react';
import { getCompetitionsPage } from 'pages/Competitions/Competitions';

const useCompetitions = (pageNum = 1, searchQuery = '') => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [iseError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isDefault, setIsDefault] = useState(true)

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    const controller = new AbortController();
    const { signal } = controller;

    getCompetitionsPage(
      pageNum,
      searchQuery,
      isDefault,
      { signal },
    )
      .then((data) => {
        if (searchQuery === '') {
          setResults([...data.results])
          setHasNextPage(false)
        } else {
          setResults((prev) => [...prev, ...data.results])
          setHasNextPage(data.next)
        }
        setIsLoading(false)
      })
      .catch((e) => {
        setIsLoading(false)
        if (signal.aborted) return
        setIsError(true)
        setError({ message: e.message })
      })

    return () => controller.abort();
  }, [pageNum, searchQuery, isDefault]);

  useEffect(() => {
    if (searchQuery) {
      setResults([]);
    }
  }, [searchQuery])

  return {
    error,
    hasNextPage,
    isLoading,
    iseError,
    results,
  }
}

export default useCompetitions;
