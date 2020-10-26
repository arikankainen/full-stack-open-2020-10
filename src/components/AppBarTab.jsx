import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    color: theme.colors.tabForeground,
    fontSize: theme.fontSizes.tab,
    fontWeight: theme.fontWeights.bold,
    padding: 15,
  },
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link} component={TouchableWithoutFeedback}>
      <Text style={styles.tab}>{text}</Text>
    </Link>
  );
};

export default AppBarTab;
