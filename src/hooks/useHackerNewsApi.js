import { useState, useEffect } from 'react';
import { getRandomListNLength } from '../components/helpers';
import { GET_TOP_STORIES } from '../api';

export const useHackerNewsApi = () => {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await fetch(GET_TOP_STORIES);
        const allNews = await response.json();
        const randomTenNews = getRandomListNLength(10, allNews);
        setNews(randomTenNews);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { news, isLoading, isError };
};
