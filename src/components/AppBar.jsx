import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient } from '@apollo/react-hooks';

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
  const authStorage = useContext(AuthStorageContext);
  const { isAuthorized } = useIsAuthorized();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  const SignOutTab = <AppBarTab onPress={signOut}>Sign out</AppBarTab>;

  const SignInTab = (
    <Link to="/signin" component={AppBarTab}>
      Sign in
    </Link>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" component={AppBarTab}>
          Repositories
        </Link>
        {isAuthorized ? SignOutTab : SignInTab}
      </ScrollView>
    </View>
  );
};

export default AppBar;
