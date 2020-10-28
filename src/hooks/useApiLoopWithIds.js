import { useState, useEffect } from 'react';
import { getApiRequestLoop } from '../components/helpers';

export const useApiLoopWithIds = (api, ids) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const response = await getApiRequestLoop(api, ids);
        setData(response);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [api, ids]);

  return { data, isLoading, isError };
};
