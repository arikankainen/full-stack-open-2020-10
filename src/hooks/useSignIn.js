import { useContext } from 'react';
import { useMutation, useApolloClient } from '@apollo/react-hooks';

import { AUTHORIZE } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(AUTHORIZE, {
    onError: error => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    if (data && data.authorize) {
      await authStorage.setAccessToken(data.authorize.accessToken);
      apolloClient.resetStore();
    }

    return result;
  };

  return [signIn, result];
};

export default useSignIn;
