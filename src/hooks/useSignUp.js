import { useMutation } from '@apollo/react-hooks';

import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER, {
    onError: error => {
      console.log(error.graphQLErrors[0].message);
    },
  });

  const signUp = async ({ username, password }) => {
    return await mutate({
      variables: { username, password },
    });
  };

  return [signUp, result];
};

export default useSignUp;
