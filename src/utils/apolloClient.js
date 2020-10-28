import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const APOLLO_URI = Constants.manifest.extra.apolloUri;

const createApolloClient = () => {
  return new ApolloClient({
    uri: APOLLO_URI,
  });
};

export default createApolloClient;
