import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';
import { repositorySort } from '../components/RepositorySortPicker';

const useRepositories = sort => {
  const [repositories, setRepositories] = useState();

  let variables;

  switch (sort) {
    case repositorySort.HIGHEST_RATED.value:
      variables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      };
      break;

    case repositorySort.LOWEST_RATED.value:
      variables = {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      };
      break;

    default:
      variables = {
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      };
      break;
  }

  const { loading, data, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (loading || !data || !data.repositories) return;
    setRepositories(data.repositories);
  }, [data, loading]);

  return { repositories, loading, error, refetch };
};

export default useRepositories;
