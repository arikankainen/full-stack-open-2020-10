import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { AUTHORIZED_USER } from '../graphql/queries';

const useIsAuthorized = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const { loading, data } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (loading || !data) return;

    if (data.authorizedUser) setIsAuthorized(true);
    else setIsAuthorized(false);
  }, [data, loading]);

  return { isAuthorized, loading };
};

export default useIsAuthorized;
