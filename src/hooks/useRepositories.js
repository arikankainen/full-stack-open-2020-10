import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';
import { repositorySort } from '../components/RepositorySortPicker';

const useRepositories = ({ search, sort, first }) => {
  let variables;

  switch (sort) {
    case repositorySort.HIGHEST_RATED.value:
      variables = {
        first,
        searchKeyword: search,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'DESC',
      };
      break;

    case repositorySort.LOWEST_RATED.value:
      variables = {
        first,
        searchKeyword: search,
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC',
      };
      break;

    default:
      variables = {
        first,
        searchKeyword: search,
        orderBy: 'CREATED_AT',
        orderDirection: 'DESC',
      };
      break;
  }

  const { loading, data, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [...previousResult.repositories.edges, ...fetchMoreResult.repositories.edges],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data ? data.repositories : undefined,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;
