import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  tabContainer: {
    padding: 15,
  },
  tab: {
    color: theme.colors.tabForeground,
    fontSize: theme.fontSizes.tab,
    fontWeight: theme.fontWeights.bold,
  },
});

const AppBarTab = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback {...props}>
      <View style={styles.tabContainer}>
        <Text style={styles.tab}>{children}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
