import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = id => {
  const [repository, setRepository] = useState();

  const { loading, data, error, refetch } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (loading || !data || !data.repository) return;
    setRepository(data.repository);
  }, [data, loading]);

  return { repository, loading, error, refetch };
};

export default useRepository;
