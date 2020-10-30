import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/react-hooks';
import { useHistory } from 'react-router-native';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import useIsAuthorized from '../hooks/useIsAuthorized';
import { Link } from 'react-router-native';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
});

const AppBar = () => {
  const history = useHistory();
  const authStorage = useContext(AuthStorageContext);
  const { isAuthorized } = useIsAuthorized();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}>
          Repositories
        </Link>

        {isAuthorized ? (
          <>
            <Link to="/createreview" component={AppBarTab}>
              Create a review
            </Link>
            <AppBarTab onPress={signOut}>Sign out</AppBarTab>
          </>
        ) : (
          <Link to="/signin" component={AppBarTab}>
            Sign in
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
