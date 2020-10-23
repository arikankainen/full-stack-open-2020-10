import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
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

const AppBarTab = ({ text, handlePress }) => {
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Text style={styles.tab}>{text}</Text>
    </TouchableWithoutFeedback>
  );
};

export default AppBarTab;
