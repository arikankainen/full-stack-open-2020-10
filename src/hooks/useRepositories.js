import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { loading, data, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (loading || !data || !data.repositories) return;
    setRepositories(data.repositories);
  }, [data, loading]);

  return { repositories, loading, error, refetch };
};

export default useRepositories;
